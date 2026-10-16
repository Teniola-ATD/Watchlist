/* ============================================================
   POD: Details & State
   OWNER: #9 Persistence Dev
   REVIEWER: #8 Watchlist State Dev
   BRANCH: feature/local-storage
   Saves and loads the watchlist (key: watchlist.v1).
   ============================================================ */

function loadWatchlist() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      watchlist = JSON.parse(saved);
    }
  } catch (error) {
    // The saved data is broken or storage is blocked, so start with an empty list
    watchlist = [];
  }
}

function saveWatchlist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
  } catch (error) {
    console.log('Could not save the watchlist', error);
  }
}

// Secondary task: when another browser tab changes the list, update this tab too
window.addEventListener('storage', (event) => {
  if (event.key === STORAGE_KEY) {
    loadWatchlist();
    showPage();
  }
});
