/* ============================================================
   POD: Details & State
   OWNER: #7 Modal & Details Dev
   REVIEWER: #10 QA & Accessibility
   BRANCH: feature/modal-details
   The movie details popup: open, close, Escape, focus trap.
   The buttons inside the modal belong to watchlist.js (#8).
   ============================================================ */

const modal = document.getElementById('modal');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalClose = document.getElementById('modal-close');
const modalPoster = document.getElementById('modal-poster');
const modalTitle = document.getElementById('modal-title');
const modalMeta = document.getElementById('modal-meta');
const modalRating = document.getElementById('modal-rating');
const modalOverview = document.getElementById('modal-overview');
let lastFocused = null; // the element to give focus back to when the modal closes

function openModal(key) {
  // Remember what had focus, but only when the modal was closed before
  if (modal.classList.contains('hidden')) {
    lastFocused = document.activeElement;
  }

  selectedItem = findItem(key); // from watchlist.js (#8)
  modalPoster.innerHTML = makePoster(selectedItem); // from cards.js (#5)
  modalTitle.textContent = selectedItem.title;
  modalMeta.textContent = makeTypeText(selectedItem);
  modalRating.innerHTML = makeStars(selectedItem.vote); // from rating.js (#6)
  modalOverview.textContent = selectedItem.overview || 'No description available.';
  updateModalButtons(key); // from watchlist.js (#8)

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  modalClose.focus();
}

function closeModal() {
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  if (lastFocused) {
    lastFocused.focus();
  }
}

// Focus trap: Tab and Shift+Tab stay inside the modal while it is open
function trapFocus(event) {
  const buttons = modal.querySelectorAll('button:not(.hidden)');
  const first = buttons[0];
  const last = buttons[buttons.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);

document.addEventListener('keydown', (event) => {
  if (modal.classList.contains('hidden')) {
    return;
  }
  if (event.key === 'Escape') {
    closeModal();
  } else if (event.key === 'Tab') {
    trapFocus(event);
  }
});
