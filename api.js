/* ============================================================
   POD: Discovery
   OWNER: #3 API & Search Lead
   REVIEWER: #4 Search UI Dev
   BRANCH: feature/api-fetch-wrapper
   Talks to TMDB. These functions return a list of simple items
   or throw an error. Showing the results is #4's job (search.js).
   ============================================================ */

// Turn the API object into a simple object that we control
function makeItem(apiItem) {
  const date = apiItem.release_date || apiItem.first_air_date || '';
  return {
    key: apiItem.media_type + '-' + apiItem.id,
    type: apiItem.media_type, // 'movie' or 'tv'
    title: apiItem.title || apiItem.name,
    poster: apiItem.poster_path,
    vote: apiItem.vote_average,
    year: date.slice(0, 4),
    overview: apiItem.overview,
  };
}

// The signal lets search.js cancel this request (AbortController)
async function fetchTitles(path, extra, signal) {
  const response = await fetch(API_URL + path + '?api_key=' + API_KEY + extra, { signal: signal });
  if (!response.ok) {
    throw new Error('The API answered with status ' + response.status);
  }
  const data = await response.json();

  // keep movies and TV shows only (search can also return people)
  return data.results
    .filter((apiItem) => apiItem.media_type === 'movie' || apiItem.media_type === 'tv')
    .map(makeItem);
}

// Secondary task: remember the popular titles so we only ask the API once
let popularCache = null;

async function getPopular(signal) {
  if (popularCache === null) {
    popularCache = await fetchTitles('/trending/all/week', '', signal);
  }
  return popularCache;
}

function searchTitles(query, signal) {
  return fetchTitles('/search/multi', '&query=' + encodeURIComponent(query), signal);
}
