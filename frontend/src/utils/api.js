const BASE_URL = import.meta.env.VITE_BASE_URL
console.log(BASE_URL)

// API helper functions
async function request(path, options = {}) {
  const res = await fetch(BASE_URL + path, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  if (!res.ok) {
    const { error } = await safeJson(res);
    throw new Error(error || `Request failed: ${res.status}`);
  }
  return res.json();
}

async function safeJson(res) {
  const type = res.headers.get('content-type') || '';
  return type.includes('application/json') ? res.json() : {};
}

// BOARD ROUTES
/** GET /boards     (filters: ?title=&category=&recent) */
export async function getBoards({ title, category, recent } = {}) {
  const params = new URLSearchParams();
  if (title) {
    params.append('title', title);
  }

  if (category) {
    params.append('category', category);
  }

  if (recent) {
    params.append('recent', 'true');
  }

  return request(`/boards?${params.toString()}`);
}

/** GET /boards/:id  → return a single board */
export async function getBoard(boardId) {
  if (!boardId && boardId !== 0)
    throw new Error('getBoard requires a boardId');

  return request(`/boards/${boardId}`);
}


/** POST /boards/new_board */
export async function createBoard({ title, category, author }) {
  return request('/boards/new_board', {
    method: 'POST',
    body: JSON.stringify({ title, category, author })
  });
}

// utils/api.js
export async function setBoardPin(boardId, pinned) {
  return request(`/boards/${boardId}/pin`, {
    method: 'PATCH',
    body: JSON.stringify({ pinned })
  });
}

/** DELETE /boards/:id */
export async function deleteBoard(boardId) {
  return request(`/boards/${boardId}`, { method: 'DELETE' });
}

/* ──────────────── CARD ENDPOINTS ──────────────── */

/** GET /cards */
export async function getAllCards() {
  return request(`/all_cards`);
}


/** GET /boards/:id/cards */
export async function getCards(boardId) {
  return request(`/boards/${boardId}/cards`);
}

/** POST /boards/:id/new_card */
export async function createCard(boardId, data) {
  return request(`/boards/${boardId}/new_card`, {
    method: 'POST',
    body: JSON.stringify(data) // { title, description, gif_url, owner }
  });
}

/** PATCH /cards/:id/like   (+1 like) */
export async function likeCard(cardId) {
  return request(`/cards/${cardId}/like`, {
    method: 'PATCH',
    body: JSON.stringify({})
  });
}

/** DELETE /cards/:id */
export async function deleteCard(cardId) {
  return request(`/cards/${cardId}`, { method: 'DELETE' });
}


// GIPHY API
const GIPHY_KEY = import.meta.env.VITE_GIPHY_KEY;
export async function searchGifs(query, limit = 6) {
  if (!query.trim()) return [];

  const qs = new URLSearchParams({
    api_key: GIPHY_KEY,
    q: query,
    limit,
    rating: 'g',
    lang: 'en',
    bundle: 'messaging_non_clips'
  });

  const res = await fetch(`https://api.giphy.com/v1/gifs/search?${qs}`);
  if (!res.ok) throw new Error('Giphy search failed');

  const json = await res.json();
  return json.data.map((g) => ({
    id: g.id,
    url: g.images.fixed_height_small.url
  }));
}