/* ============================================================
   POD: Discovery
   OWNER: #5 Cards & Grid Dev
   REVIEWER: #6 Rating & Overlay Dev
   BRANCH: feature/card-grid
   Builds the movie cards and puts them in the CSS Grid.
   Uses makeStars and makeOverlay from rating.js (#6).
   ============================================================ */

const grid = document.getElementById('grid');

function makePoster(item) {
  if (item.poster) {
    return '<img src="' + IMAGE_URL + item.poster + '" alt="Poster" class="h-full w-full object-cover" />';
  }
  return '<div class="flex h-full w-full items-center justify-center p-4 text-center text-sm text-neutral-500">' + item.title + '</div>';
}

// Example result: "Movie, 2024" or "TV show, 2021"
function makeTypeText(item) {
  let text = 'Movie';
  if (item.type === 'tv') {
    text = 'TV show';
  }
  if (item.year) {
    text = text + ', ' + item.year;
  }
  return text;
}

function makeCard(item) {
  let badge = '';
  const status = getStatus(item.key); // from watchlist.js (#8)
  if (status === 'want') {
    badge = '<span class="absolute left-2 top-2 rounded bg-orange-600 px-2 py-0.5 text-xs font-semibold text-black">Want to Watch</span>';
  } else if (status === 'completed') {
    badge = '<span class="absolute left-2 top-2 rounded bg-orange-600 px-2 py-0.5 text-xs font-semibold text-black">Completed</span>';
  }

  return `
    <button class="card group block w-full text-left" data-key="${item.key}">
      <div class="relative aspect-[2/3] overflow-hidden rounded-md bg-neutral-900 ring-1 ring-neutral-800 group-hover:ring-2 group-hover:ring-orange-600">
        ${makePoster(item)}
        ${makeOverlay(item)}
        ${badge}
      </div>
      <h3 class="mt-3 truncate text-sm font-semibold">${item.title}</h3>
      <p class="mb-1 text-xs text-neutral-400">${makeTypeText(item)}</p>
      <div>${makeStars(item.vote)}</div>
    </button>`;
}

function renderGrid(items) {
  grid.innerHTML = items.map(makeCard).join('');

  // The cards were just created, so we add a click listener to each one
  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    card.addEventListener('click', () => openModal(card.dataset.key)); // openModal is in modal.js (#7)
  });
}
