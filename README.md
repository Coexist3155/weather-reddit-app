# Weather & Reddit PWA

A combined Progressive Web App that lets you choose between two apps — **YrWeather** and **RedditLight** — all within one installable PWA container.

## Apps included

| App | Description |
|-----|-------------|
| ☀️ **YrWeather** | Live weather forecasts (hourly + 10-day) powered by MET Norway / Yr.no. No API key required. |
| 🤖 **RedditLight** | Fast, mobile-friendly Reddit reader. Browse any subreddit. |

## Structure

```
index.html          ← Launcher / home screen
manifest.json       ← Combined PWA manifest
sw.js               ← Combined service worker (caches all assets)
icons/              ← PWA icons
weather/            ← YrWeather app
  index.html
  app.js
  style.css
  icons/
reddit/             ← RedditLight app
  index.html
  icon-192.png
  icon-512.png
```

## Usage

Open `index.html` (or deploy to any static host / GitHub Pages). You can install it as a PWA from the browser. Tap a card on the home screen to open an app; tap **Back** to return to the launcher.