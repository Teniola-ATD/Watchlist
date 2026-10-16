# 8th Watch — reconstructed project

A responsive movie and TV watchlist website built with HTML, CSS, and plain JavaScript.

## Features
- Discover trending movies and TV shows
- Search titles
- View posters, ratings, release years, and descriptions
- Open a details dialog
- Save titles to **Want to Watch** or **Completed**
- Remove saved titles
- Keep the watchlist in browser LocalStorage
- Responsive two-column mobile grid and wider desktop grid

## Important: file layout
All files are in the same folder. The script references in `index.html` intentionally point to the root folder; do not change them to `js/...` unless you move all JavaScript files into a `js` folder.

- `index.html` — page structure
- `styles.css` — font and focus styling
- `config.js` — TMDB API settings
- `state.js` — shared app state
- `storage.js` — local watchlist persistence
- `api.js` — TMDB requests and result mapping
- `rating.js` — stars and poster overlay
- `cards.js` — poster cards and grid
- `search.js` — search, loading, empty, and error states
- `modal.js` — title details dialog
- `watchlist.js` — tabs and watchlist actions
- `app.js` — app startup and rendering

## Run the site
1. Open `config.js`.
2. Replace `YOUR_TMDB_API_KEY` with your own TMDB API key.
3. Open the project folder in a local development server. In VS Code, use **Live Server**. In SPCK Editor, use its preview/server feature.
4. Open `index.html` through that local server. Do not open it as a `file://` URL.
5. Refresh after saving changes.

Example in `config.js`:
```js
const API_KEY = 'PASTE_YOUR_TMDB_API_KEY_HERE';
```

Keep your API key private. Do not commit a real key to a public GitHub repository.

## Troubleshooting
- **Blank grid:** open browser developer tools and inspect Console and Network for missing files or API errors.
- **API key message:** add a valid TMDB API key to `config.js`.
- **Poster not loading:** check internet access and the Network panel; some titles do not have a poster.
- **Mobile not responding:** make sure the local preview has refreshed and all script files are being served from the same folder.
- **Watchlist disappears:** LocalStorage is browser/device-specific; it does not sync between devices.

## Branch integration note
This ZIP is a single, integrated version. If you are merging individual feature branches, keep the script load order in `index.html`: `config.js`, `state.js`, `storage.js`, `api.js`, `rating.js`, `cards.js`, `search.js`, `modal.js`, `watchlist.js`, then `app.js`.
