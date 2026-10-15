/* ============================================================
   POD: Discovery
   OWNER: #4 Search UI Dev
   REVIEWER: #3 API & Search Lead
   BRANCH: feature/search-debounce
   Search box (debounce), AbortController, and the loading,
   empty and error messages.
   ============================================================ */

const searchInput = document.getElementById('search');
const message = document.getElementById('message');
let searchTimer;
let searchController = null;

// ----- Messages (also used by watchlist.js for empty tabs) -----
function showMessage(text) {
  message.textContent = text;
  message.classList.remove('hidden');
}

function hideMessage() {
  message.classList.add('hidden');
}

// ----- Load titles: popular when query is '', search results otherwise -----
async function loadResults(query) {
  // Cancel the previous request so an old answer can never replace a new one
  if (searchController) {
    searchController.abort();
  }
  searchController = new AbortController();
  const signal = searchController.signal;

  showMessage('Loading...');
  try {
    if (query === '') {
      discoverItems = await getPopular(signal);
      discoverTitle = 'Popular this week';
    } else {
      discoverItems = await searchTitles(query, signal);
      discoverTitle = 'Results for "' + query + '"';
    }

    if (discoverItems.length === 0) {
      showMessage('No titles found. Try a different search.');
    } else {
      hideMessage();
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      return; // a newer request replaced this one, so do nothing
    }
    discoverItems = [];
    if (API_KEY === 'YOUR_TMDB_API_KEY') {
      showMessage('Add your TMDB API key in js/config.js to load titles.');
    } else {
      showMessage('Could not load titles. Check your internet connection and API key.');
    }
  }
  showPage(); // from app.js (#1)
}

// ----- Debounce: every keystroke restarts the timer -----
searchInput.addEventListener('input', () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(runSearch, SEARCH_DELAY);
});

function runSearch() {
  currentView = 'discover';
  showPage();
  loadResults(searchInput.value.trim());
}
