/* ============================================================
   POD: Core & Integration
   OWNER: #1 Tech Lead / Integration
   REVIEWER: #11 DevOps / Docs / Release
   BRANCH: feature/repo-setup
   Data shared by all pods. Change these names only after talking to #1.
   ============================================================ */

let currentView = 'discover'; // 'discover', 'want' or 'completed'
let discoverTitle = 'Popular this week';
let discoverItems = []; // titles shown on the Discover tab
let watchlist = []; // titles the user saved
let selectedItem = null; // the title open in the modal
