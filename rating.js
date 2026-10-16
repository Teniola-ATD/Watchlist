/* ============================================================
   POD: Discovery
   OWNER: #6 Rating & Overlay Dev
   REVIEWER: #5 Cards & Grid Dev
   BRANCH: feature/rating-overlay
   Star ratings and the hover overlay on cards.
   ============================================================ */

// The API rating is out of 10, so we divide by 2 to get 5 stars.
// &#9733; is the HTML code for a star, so no special keyboard symbol is needed.
function makeStars(vote) {
  vote = Number.isFinite(Number(vote)) ? Number(vote) : 0;
  const filled = Math.round(vote / 2);
  let html = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= filled) {
      html += '<span class="text-orange-600">&#9733;</span>';
    } else {
      html += '<span class="text-neutral-700">&#9733;</span>';
    }
  }
  html += ' <span class="text-xs text-neutral-400">' + (vote / 2).toFixed(1) + '</span>';
  return html;
}

// Dark layer that fades in over the poster when the card is hovered or focused
function makeOverlay(item) {
  const text = item.overview || 'No description available.';
  return `
    <div class="absolute inset-0 flex flex-col justify-end bg-black/85 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
      <p class="line-clamp-6 text-xs text-neutral-200">${text}</p>
      <p class="mt-2 text-xs font-semibold text-orange-500">Click for details</p>
    </div>`;
}
