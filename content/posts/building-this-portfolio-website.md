---
title: Building This Portfolio Website
description: The story behind this site — starting from someone else’s theme, changing the colours, and the small problems that kept me stuck for hours.
publishedDate: 2026-10-29
tags:
  - astro
  - portfolio
---

I didn't build this website from scratch. I started with an Astro theme called
Nordlys, then changed it piece by piece until it felt like mine.

This post records what I did — and above all **what kept me stuck**, because that's
the part that taught me the most.

## Starting from someone else's theme

First decision: use a theme, don't build from zero.

The reason is simple. If I had started from a blank page, I would have spent weeks
just setting up the menu, footer, and dark mode — when what I actually wanted was
to learn how to write content and understand how Astro works.

The theme already came with a layout, navigation, a blog, a gallery, and a projects
page. All I had to do was fill it in. But there was a trade-off: I had to **read
someone else's code** before I could change it. That turned out to be good practice
in itself.

## Changing the identity

I replaced every placeholder. Most of it turned out to live in a single file,
`src/theme.config.ts`:

```ts title="src/theme.config.ts"
export default defineThemeConfig({
  site: 'https://calon-raja-ngoding.github.io',
  title: 'BangBoksss',
  author: 'BangBoksss',
  locale: 'id',
  mode: 'dark',
  colorScheme: 'scheme-custom'
})
```

One thing I only noticed later: `site` **has to** match the real address of the
website. If it's wrong, the sitemap and RSS feed point to an address that doesn't
exist. I had filled it in with a different name than my GitHub username, and only
caught it after checking the `<head>` tags on the page.

## Choosing colours

The theme came with several built-in colour schemes, but none of them quite fit.
So I made my own.

The hard part wasn't picking the colours — it was making sure **the text stays
readable**. A colour that looks lovely on white can be completely invisible on a
dark background. A real example: the Next.js logo is almost black (`#1A1A1A`), so I
swapped it for a light grey that still shows up against a dark background.

## Filling in the Skills & Tools page

This page took the longest, because I decided to be **honest**.

The theme originally offered 28 items — Vue, Angular, Django, Spring, MongoDB, and
so on. I don't have a real grip on most of them. So I dropped them, and kept only
what I have actually used.

| What I wrote      | What I avoided       |
| ----------------- | -------------------- |
| "I'm still learning" | "Advanced"        |
| Things I've used  | Things I've only heard of |
| A few, but true   | Many, but empty      |

The final count is 21 items. Fewer than before, but every one of them I can stand
behind if someone asks.

## Small things that kept me stuck

This is the part I most wanted to record.

### Icon names aren't always what you'd expect

I wanted to show the Java logo. It turns out the icon is not called `java` — it's
`openjdk`. Same story with Vue, which has to be written `vuedotjs`, and Next.js,
which has to be `nextdotjs`.

What makes it painful: **if you get the name wrong, there is no error message at
all.** The page still opens normally, just with an empty space where the icon should
be. I was confused for a long time because I didn't know where to look for the
mistake.

### Colour changes sometimes don't show up

At one point I changed the theme colour, but the browser kept showing the old one.
I checked the code over and over — it was already correct.

The problem wasn't the code. The dev server was holding on to an old copy of the CSS
file, so the browser kept receiving the old version. The fix was simple: stop the
server, start it again. Done.

The lesson I took from it:

> If the code is already correct but the result doesn't change, don't rush to change
> the code again. First make sure what you're looking at is actually the latest
> version.

### One class can break alignment

The logo in the header was off by a few pixels compared to the menu next to it. I
assumed it was a sizing problem; it was actually a **vertical alignment** problem.
Adding `items-center` in the right place fixed it immediately.

## What I learned

- Reading other people's code is a skill of its own, not just reading documentation
- Errors that don't show up are more troublesome than errors that do
- Better a few things, honestly, than a full list that's empty
- Check the result in the browser, don't just trust the code

## What's next

This website isn't finished. The projects page still holds a placeholder, and the
photo gallery still uses stock images. But for now it's good enough — I would rather
have something people can actually open than something "perfect" that never ships.
