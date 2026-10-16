/* ============================================================
   POD: Details & State
   OWNER: #8 Watchlist State Dev
   REVIEWER: #9 Persistence Dev
   BRANCH: feature/watchlist-tabs
   Tabs, tab counts, add / remove / move, and no duplicates.
   Saving to LocalStorage is #9's job (saveWatchlist in storage.js).
   ============================================================ */

const tabDiscover = document.getElementById('tab-discover');
const tabWant = document.getElementById('tab-want');
const tabCompleted = document.getElementById('tab-completed');
const btnWant = document.getElementById('btn-want');
const btnCompleted = document.getElementById('btn-completed');
const btnRemove = document.getElementById('btn-remove');

// ----- Looking things up -----
// Returns 'want', 'completed' or '' (not saved)
function getStatus(key) {
  const found = watchlist.find((item) => item.key === key);
  if (found) {
    return found.status;
  }
  return '';
}

// Look for a title in the watchlist first, then in the Discover results
function findItem(key) {
  const saved = watchlist.find((item) => item.key === key);
  if (saved) {
    return saved;
  }
  return discoverItems.find((item) => item.key === key);
}

function countByStatus(status) {
  return watchlist.filter((item) => item.status === status).length;
}

// ----- Tabs -----
function updateTabs() {
  const baseClasses = '-mb-px border-b-2 py-3 text-sm font-semibold ';
  const activeClasses = 'border-orange-600 text-white';
  const inactiveClasses = 'border-transparent text-neutral-400 hover:text-white';

  tabDiscover.className = baseClasses + (currentView === 'discover' ? activeClasses : inactiveClasses);
  tabWant.className = baseClasses + (currentView === 'want' ? activeClasses : inactiveClasses);
  tabCompleted.className = baseClasses + (currentView === 'completed' ? activeClasses : inactiveClasses);

  const wantCount = countByStatus('want');
  const completedCount = countByStatus('completed');
  document.getElementById('count-want').textContent = wantCount > 0 ? wantCount : '';
  document.getElementById('count-completed').textContent = completedCount > 0 ? completedCount : '';
}

function showView(view) {
  currentView = view;
  hideMessage();
  showPage();
  if (view === 'discover' && discoverItems.length === 0) {
    loadResults('');
  }
}

tabDiscover.addEventListener('click', () => showView('discover'));
tabWant.addEventListener('click', () => showView('want'));
tabCompleted.addEventListener('click', () => showView('completed'));

// ----- Modal buttons -----
// Show only the buttons that make sense for where the title is saved.
// classList.toggle('hidden', true) hides a button, and false shows it.
function updateModalButtons(key) {
  const status = getStatus(key);
  btnWant.textContent = status === 'completed' ? 'Move to Want to Watch' : 'Add to Want to Watch';
  btnWant.classList.toggle('hidden', status === 'want');
  btnCompleted.classList.toggle('hidden', status === 'completed');
  btnRemove.classList.toggle('hidden', status === '');
}

// ----- Add, move and remove -----
function changeStatus(newStatus) {
  // Duplicate prevention: a title is only pushed if it is not already saved
  const alreadySaved = getStatus(selectedItem.key) !== '';
  selectedItem.status = newStatus;
  if (!alreadySaved) {
    watchlist.push(selectedItem);
  }
  saveWatchlist(); // from storage.js (#9)
  showPage();
  openModal(selectedItem.key); // refresh the buttons
}

function removeFromList() {
  watchlist = watchlist.filter((item) => item.key !== selectedItem.key);
  saveWatchlist(); // from storage.js (#9)
  showPage();
  closeModal();
}

btnWant.addEventListener('click', () => changeStatus('want'));
btnCompleted.addEventListener('click', () => changeStatus('completed'));
btnRemove.addEventListener('click', removeFromList);
