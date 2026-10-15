# 8th Watch

A movie and TV watchlist tracker. Search titles, see star ratings, open details, and save titles to **Want to Watch** or **Completed**. The list is kept in LocalStorage.

Built with HTML, Tailwind CSS v4 and plain JavaScript. There is no backend.

## Run it

1. Open `js/config.js` and paste your TMDB API key into `API_KEY`. Do not commit your real key.
2. Open the folder with a local server (for example the VS Code Live Server extension).

## Who owns what

| Pod | Person | File | Branch |
|-----|--------|------|--------|
| Core & Integration | #1 Tech Lead | `js/state.js`, `js/app.js`, `index.html` layout | `feature/repo-setup` |
| Core & Integration | #2 Product / UX | `styles.css` | `feature/design-tokens` |
| Discovery | #3 API & Search Lead | `js/api.js` | `feature/api-fetch-wrapper` |
| Discovery | #4 Search UI Dev | `js/search.js` | `feature/search-debounce` |
| Discovery | #5 Cards & Grid Dev | `js/cards.js` | `feature/card-grid` |
| Discovery | #6 Rating & Overlay Dev | `js/rating.js` | `feature/rating-overlay` |
| Details & State | #7 Modal & Details Dev | `js/modal.js` | `feature/modal-details` |
| Details & State | #8 Watchlist State Dev | `js/watchlist.js` | `feature/watchlist-tabs` |
| Details & State | #9 Persistence Dev | `js/storage.js` | `feature/local-storage` |
| Quality & Release | #10 QA & Accessibility | test pass (checklist below) | `feature/qa-pass` |
| Quality & Release | #11 DevOps / Docs | `js/config.js`, `README.md` | `feature/env-key-config`, `feature/readme-deploy` |

Every file starts with a comment block showing its pod, owner, reviewer and branch. In `index.html`, each section is marked with `POD:` comments. Only edit the sections that belong to your pod.

## Git workflow

- `main` is protected and deployable. `develop` is the integration branch.
- Never push straight to `main`. Open a pull request into `develop`, with one reviewer from another pod.
- Merge to `develop` daily. Code freeze on Day 8. Deploy from `main` on Day 9.

```bash
git checkout develop
git pull
git checkout -b feature/search-debounce   # use your own branch name
# ...edit only your own file...
git add js/search.js
git commit -m "Add debounced search"
git push -u origin feature/search-debounce
# then open a pull request into develop
```

Suggested merge order, because later files use functions from earlier ones:
`repo-setup` (#1) then `design-tokens` (#2), `env-key-config` (#11), `local-storage` (#9), `api-fetch-wrapper` (#3), `rating-overlay` (#6), `card-grid` (#5), `search-debounce` (#4), `modal-details` (#7), `watchlist-tabs` (#8).

## QA checklist (#10)

- [ ] Search waits about 400ms and cancels older requests
- [ ] Responsive grid of cards on mobile and desktop
- [ ] Stars match the API rating
- [ ] Clicking a card opens the modal; Escape, the backdrop and Close all close it
- [ ] Tab key stays inside the modal while it is open
- [ ] Add, move and remove work, with no duplicates
- [ ] Tab counts update
- [ ] The watchlist is still there after a refresh
- [ ] Loading, empty and error messages appear
- [ ] Works with the wrong or missing API key (shows the error message)
