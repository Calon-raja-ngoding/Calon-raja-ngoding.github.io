---
title: CoffeSpot
description: >-
  A multi-role cafe discovery site built with Laravel. Visitors browse and
  search cafes, owners register their own shop, and admins moderate everything
  from one dashboard.
status: Course Project
startDate: 2026-05-06
endDate: 2026-06-27
tags:
  - laravel
  - php
  - mysql
  - tailwindcss
  - blade
  - javascript
previewImage: '../assets/projects/coffeespot-preview.jpeg'
---

## Overview

CoffeSpot is a cafe discovery web application I built for a project-based
learning course. It answers a simple question — *"where should I get coffee
today?"* — and then adds the parts that make it a real product: owners can list
their own cafe, users can review and favourite places, and an admin keeps the
list clean.

It is not a demo with fake buttons. Every screen talks to a MySQL database, and
each role sees a different part of the app.

| Role  | What they can do                                                                 |
| ----- | -------------------------------------------------------------------------------- |
| Guest | Browse the homepage, search and sort cafes, open a cafe detail page               |
| User  | Everything above, plus write reviews, report bad reviews, and save favourites     |
| Owner | Register **one** cafe, upload photos, set weekly opening hours, reply to reviews  |
| Admin | Approve or delete cafes, delete users, and review reported comments               |

The listing page supports four sort modes: highest rating, most favourited,
newest, and nearest. The last one is the interesting part. Instead of calling an
external maps API, it computes the great-circle distance inside the SQL query:

```php
$query->selectRaw(
    "(6371 * acos(cos(radians(?)) * cos(radians(latitude))
      * cos(radians(longitude) - radians(?))
      + sin(radians(?)) * sin(radians(latitude)))) AS distance",
    [$lat, $lng, $lat]
)->having('distance', '<=', 30)
  ->orderBy('distance');
```

That returns cafes within 30 km, nearest first, using only the coordinates the
owner already saved.

## Background

Cafe lists usually live in scattered social media posts. There is no single place
where you can compare opening hours, see photos, read reviews, and know which
places are actually still open. CoffeSpot puts all of that behind one search box,
with three separate roles doing three separate jobs.

Two decisions shaped most of the code:

**Permissions belong in one place.** Role checks happen in two spots only — a
`role:` middleware on the route group, and small helpers on the `User` model
(`isAdmin()`, `isOwner()`, `isUser()`). Keeping the rules in one method means the
Blade templates and the controllers never disagree about who is allowed to see
what.

**Boring form fields should fill themselves.** When a cafe is created, the slug
is generated from the name, with a counter appended if it already exists — so two
cafes called "Kopi Senja" get `kopi-senja` and `kopi-senja-1`. Coordinates are
pulled straight out of the Google Maps embed the owner pastes:

```php
if (preg_match('/!3d(-?[0-9.]+)/', $cafe->maps_embed, $m)) {
    $cafe->latitude = (float) $m[1];
}
```

Because of that, the "nearby" sort works even when an owner never touched the
coordinate fields.

Password reset also got its own path. The usual Laravel flow needs a working
mail server and a clickable link, which was fragile on a campus network, so the
app sends a six-digit OTP instead. The code lives in a `password_otps` table with
a ten-minute expiry rather than in the session, so it survives a page refresh.

Approval matters too: a newly registered cafe is invisible to the public until an
admin approves it, and the detail page returns 404 for unapproved cafes unless
you are the owner or an admin.

## Tech Stack

| Layer        | What I used                                     |
| ------------ | ----------------------------------------------- |
| Framework    | Laravel 10 with Eloquent and Blade              |
| Auth         | Laravel Breeze, plus a custom OTP reset flow    |
| Styling      | Tailwind CSS 3 with Alpine.js for small toggles |
| Build        | Vite                                            |
| Database     | MySQL                                           |
| Mail         | SMTP, with approval and deletion notifications  |
| Localisation | `lang/id.json` and a locale-switch route        |

The whole interface can be switched between Indonesian and English from the
navbar. Every label goes through `__()`, and a middleware stores the chosen
locale in the session.

## Running It Locally

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
npm install && npm run dev
php artisan serve
```

Uploaded photos go to `storage/app/public`, so `php artisan storage:link` is
needed once.

> The SQL dump in the repo is an older snapshot — it is missing the `latitude`,
> `longitude`, and `is_approved` columns that the app now relies on. The
> migrations are the source of truth, so run `php artisan migrate` rather than
> importing the dump.
