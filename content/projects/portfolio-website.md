---
title: Portfolio Website
description: >-
  A personal portfolio and blog built on an Astro theme, then reshaped with a
  custom colour scheme, a real dark mode switch, and content written from
  scratch.
# url: https://calon-raja-ngoding.github.io
# sourceUrl: https://github.com/Calon-raja-ngoding/webPortofolio
status: Active
startDate: 2026-10-25
tags:
  - astro
  - tailwindcss
  - portfolio
previewImage: '../assets/projects/portfolio-preview.png'
---

## Overview

This is the site you are reading right now. It has a landing page and four
sections: **Projects**, **Blog**, **Skills & Tools**, and **About**. Everything is
static — Astro renders every page at build time, so there is no database and no
server that needs to stay awake.

The goal was never to build the most advanced portfolio. It was to have one address
I could hand to someone instead of scattering links across chat apps, and to learn
how a real site is put together along the way.

## Background

Building everything from scratch sounded appealing until I thought about how long
the menu, footer, dark mode, and search would take. That work has been done well by
other people already. So I started from an open-source theme and spent my time on
the parts that are actually mine: the content, the colours, and the layout
decisions.

## Tech Stack

| Layer    | What I used                                    |
| -------- | ---------------------------------------------- |
| Framework | Astro (static site generation)                |
| Styling  | Tailwind CSS v4 with a custom colour scheme    |
| Content  | Astro content collections (Markdown and JSON)  |
| Icons    | Tabler and Simple Icons via Iconify            |
| Search   | Pagefind, indexed at build time                |
| Hosting  | GitHub Pages                                   |

## Running It Locally

```bash
pnpm install
pnpm dev      # http://localhost:4321
pnpm build    # static output in dist/
```

> The site is still being filled in. Photos and the About page are next, then the
> `locale` switch from Indonesian to English.
