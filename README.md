# personal-page

Kristen K. Arguello's personal site — About, Projects (live from GitHub), Awards, and Publications.

## Enable GitHub Pages

1. Push this repo to GitHub (`git push -u origin main`).
2. On GitHub: **Settings → Pages**.
3. Under "Build and deployment" → Source: **Deploy from a branch**.
4. Branch: **main**, folder: **/ (root)**. Save.
5. Your site will be live at:
   `https://kristenarguello.github.io/personal-page/`

   (It can take a minute or two after the first push.)

## Still to fill in (placeholders)

- **About Me** section (`index.html`, `<section id="about">`) — currently a dashed placeholder box.

## Editing the project list

Project cards are pulled live from the GitHub API (description + primary language), so you don't need to update descriptions by hand. To add/remove/rename repos shown, edit the `REPOS` array at the top of `js/main.js`.

## Structure

```
index.html       — page content/structure
css/style.css     — all styling (edit CSS variables at the top for theme tweaks)
js/main.js        — mobile nav toggle + live GitHub project cards
```

No build step, no dependencies — just static files.
