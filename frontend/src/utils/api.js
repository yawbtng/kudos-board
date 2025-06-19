const BASE_URL = import.meta.env.VITE_BASE_URL
console.log(BASE_URL)


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
  if (title)     params.append('title', title);
  if (category)  params.append('category', category);
  if (recent)    params.append('recent', 'true');

  return request(`/boards?${params.toString()}`);
}

/** POST /boards/new_board */
export async function createBoard({ title, category, author }) {
  return request('/boards/new_board', {
    method: 'POST',
    body: JSON.stringify({ title, category, author })
  });
}

/** DELETE /boards/:id */
export async function deleteBoard(boardId) {
  return request(`/boards/${boardId}`, { method: 'DELETE' });
}

/* ──────────────── CARD ENDPOINTS ──────────────── */

/** GET /cards */
export async function getAllCards(boardId) {
  return request(`/all_cards`);
}


/** GET /boards/:id/cards */
export async function getCards(boardId) {
  return request(`/boards/${boardId}/cards`);
}

/** POST /boards/:id/new_card */
export async function createCard(boardId, new_card) {
  return request(`/boards/${boardId}/cards`, {
    method: 'POST',
    body: JSON.stringify(data) // { title, description, gif_url, owner }
  });
}

/** PATCH /cards/:id/like   (+1 like) */
export async function likeCard(cardId) {
  return request(`/cards/${cardId}/like`, {
    method: 'PATCH',
    body: JSON.stringify({}) // empty body = +1
  });
}

/** DELETE /cards/:id */
export async function deleteCard(cardId) {
  return request(`/cards/${cardId}`, { method: 'DELETE' });
}


