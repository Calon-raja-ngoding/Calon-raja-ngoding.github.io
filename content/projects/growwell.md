---
title: GrowWell
description: >-
  A Flutter app for monitoring child growth and spotting stunting early, backed
  by Supabase and a machine learning model trained on anthropometric data.
status: In Progress
startDate: 2026-09-01
tags:
  - flutter
  - dart
  - supabase
  - postgresql
  - python
  - machine-learning
previewImage: '../assets/projects/growwell-preview.png'
---

## Overview

GrowWell is an Android app for parents and Posyandu health workers. A parent
records their child's height and weight, and the app turns that measurement into
something readable: a growth status, a nutrition category, and a recommendation
on what to do next.

Stunting is hard to notice from a single measurement. A child who is short for
their age looks fine in a photo — what matters is the trend over time, compared
against the WHO growth reference. So the app keeps every measurement instead of
overwriting the last one, attaches Z-scores and a category to each record, and
maps that category to a set of intervention suggestions.

There are two shells, and which one opens depends on the user's role:

```
main.dart
├── HomeShell  (orang_tua, kader)      ├── Beranda
│                                      ├── Daftar Anak
│                                      ├── Chatbot
│                                      └── Profil
└── AdminShell (admin)                 ├── Dashboard
                                       ├── Users / Data Anak
                                       ├── Pengukuran / Imunisasi
                                       ├── Prediksi / Notifikasi
                                       └── Model ML / Rekomendasi
```

Each shell is a single `Scaffold` with an `IndexedStack` or drawer, so switching
tabs keeps the scroll position and does not re-fetch data. Every database call
lives in a service class (`AuthService`, `UserService`, `AnakService`,
`AdminService`) — no widget talks to Supabase directly.

The data path is longer than it looks, because Supabase Auth and the application
tables are separate:

```
auth.users (email)
  → users.email        → user_id
  → orang_tua.user_id  → orang_tua_id
  → anak.orang_tua_id  → anak_id
  → pengukuran_antropometri (latest row for that child)
```

`AnakService` walks that chain and merges the newest measurement into the child
model, so a screen can show the name, age, and last recorded height in one
object. Age is computed from the birth date in months, which matters because
every Z-score lookup is indexed by age in months, not by birthday.

## Background

The dataset has 4.7 MB of anthropometric records with six columns: sex, age in
months, height, weight, and two labels (`Stunting` and `Wasting`). The classes are
imbalanced, so the training pipeline applies **SMOTE** to the training split
before fitting anything — otherwise a model can score well by always predicting
the majority class.

I trained and compared two models:

| Model   | Settings                            | Test accuracy | Precision (macro) | Recall (macro) | F1 (macro) |
| ------- | ----------------------------------- | ------------- | ----------------- | -------------- | ---------- |
| SVM     | `C=1000`, `gamma=0.1`, `rbf` kernel | **99.5%**     | —                 | —              | —          |
| XGBoost | tuned, early stopping               | 92.94%        | 0.9321            | 0.9294         | 0.9285     |

The SVM numbers come from a grid search whose best cross-validation accuracy was
98.86%. The gap between the two is worth being honest about: SVM does very well on
this feature set but gives no per-feature explanation, while XGBoost can. That is
why the schema includes a `faktor_kontribusi_prediksi` table — it exists to store
SHAP-style contributions so a prediction can be explained to a parent, not just
displayed as a label.

The database has sixteen tables, grouped by concern:

| Group        | Tables                                                                  |
| ------------ | ----------------------------------------------------------------------- |
| Accounts     | `roles`, `users`, `orang_tua`                                           |
| Child        | `anak`, `riwayat_imunisasi_anak`, `imunisasi`                           |
| Pregnancy    | `riwayat_kehamilan`, `penyakit_kehamilan`, `riwayat_kehamilan_penyakit` |
| Measurements | `pengukuran_antropometri`                                               |
| Prediction   | `prediksi`, `prediksi_input`, `faktor_kontribusi_prediksi`               |
| Content      | `model_ml`, `rekomendasi_intervensi`, `prediksi_rekomendasi`             |

Two design choices I would keep in any rewrite: raw height and weight are stored
separately from the derived Z-scores, so the scores can be recomputed if the
reference tables change; and predictions are their own table, pointing at one
measurement and one model version, with an `is_offline_prediction` flag and a
`synced_at` timestamp for phones that upload later.

The UI follows a set of 430-pixel-wide design comps. Instead of eyeballing the
colours, I sampled the PNGs pixel by pixel and put the results in
`theme/app_theme.dart` as tokens — `#15422E` for the dark green, `#CCE7C3` for
the card green, `#DEE6FF` for the banner blue. Because the tokens are
centralised, a colour change is one line, and a golden test renders the Beranda
screen at two heights to catch layout drift.

## Tech Stack

| Layer     | What I used                                     |
| --------- | ----------------------------------------------- |
| App       | Flutter (Dart 3.13), Material 3                 |
| Backend   | Supabase — Auth, Postgres, Storage              |
| ML        | Python, scikit-learn, XGBoost, imbalanced-learn |
| Chatbot   | n8n workflow reached over HTTPS                 |
| Config    | `flutter_dotenv` for Supabase keys              |
| Testing   | `flutter_test`, golden tests, `flutter analyze` |

## Running It Locally

```bash
flutter pub get
flutter run                  # needs an Android device or emulator
flutter build apk --debug
flutter analyze
flutter test
flutter test --update-goldens
```

The app reads `SUPABASE_URL` and `SUPABASE_ANON_KEY` from a `.env` file next to
`pubspec.yaml`.

> This project is still in progress. The session does not restore yet (a
> returning user lands on the login screen), the admin service queries a few
> tables whose names differ from the checked-in schema, and the prediction
> screens render empty states because inference is not wired up. The app builds
> and the parent-facing flow works; the admin and ML halves are next.
