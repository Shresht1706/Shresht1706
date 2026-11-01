# Shresht's personal website

Plain HTML, CSS and JavaScript. No build step, no dependencies.

```
index.html      page structure
css/style.css   design
js/main.js      YOUR CONTENT lives at the top of this file
js/bg.js        animated network background
images/         your photos
```

## Add your photos
Drop files into `images/` using these names (or edit the `PHOTOS` list in `js/main.js`):
`portrait.jpg`, `karate.jpg`, `football.jpg`, `mun.jpg`, `guitar.jpg`, `pc-build.jpg`, `teardown.jpg`, `animals.jpg`, `roadtrip.jpg`, `cooking.jpg`.
Tips: crop to about 1200 px wide and compress at squoosh.app. Missing photos show a placeholder, so the site never looks broken.

## Preview locally
Open `index.html`, or run `python3 -m http.server` in this folder and visit http://localhost:8000.

## Publish free on GitHub Pages
1. Create a repo named `yourusername.github.io`.
2. `git init && git add . && git commit -m "site" && git branch -M main`
3. `git remote add origin https://github.com/yourusername/yourusername.github.io.git && git push -u origin main`
4. Repo Settings → Pages → Source: `main` branch, `/ (root)`.

Cloudflare Pages and Netlify also work: connect the repo, leave the build command empty, publish directory `/`.

## Before going live
Add your real LinkedIn, GitHub and paper links in `LINKS` (js/main.js). Keep phone numbers and home addresses off the site.
