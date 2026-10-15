/* ============================================================
   POD: Core & Integration
   OWNER: #1 Tech Lead / Integration
   REVIEWER: #2 Product / UX / Design
   BRANCH: feature/repo-setup
   Joins every pod together. Loads last.
   ============================================================ */

const pageTitle = document.getElementById('view-title');

// Draws the page for the current tab
function showPage() {
  updateTabs(); // watchlist.js (#8)
  let items = [];

  if (currentView === 'discover') {
    items = discoverItems;
    pageTitle.textContent = discoverTitle;
  } else {
    items = watchlist.filter((item) => item.status === currentView);
    pageTitle.textContent = currentView === 'want' ? 'Want to Watch' : 'Completed';
    if (items.length === 0) {
      showMessage('Nothing here yet. Open a title in Discover to add it.'); // search.js (#4)
    } else {
      hideMessage();
    }
  }

  renderGrid(items); // cards.js (#5)
}

// ===== START THE APP =====
loadWatchlist(); // storage.js (#9)
showPage();
loadResults(''); // search.js (#4): load popular titles
