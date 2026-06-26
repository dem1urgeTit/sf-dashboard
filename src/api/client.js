const BASE_URL = "http://localhost:8084";

function getToken() {
  return localStorage.getItem("accessToken");
}

async function request(path, options = {}) {
  const token = getToken();

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const data = await res.json();

  if (!res.ok) {
    const message =
      data?.errors?.[0]?.message || "Ошибка запроса";
    throw new Error(message);
  }

  return data.result;
}

// Auth
export async function login(login, password) {
  const form = new FormData();
  form.append("login", login);
  form.append("password", password);

  const res = await fetch(`${BASE_URL}/api/user/login`, {
    method: "POST",
    body: form,
  });

  const data = await res.json();

  if (!res.ok) {
    const message = data?.errors?.[0]?.message || "Неверный логин или пароль";
    throw new Error(message);
  }

  return data.result; // { accessToken, user }
}

// Draft invoices
export function getDrafts(limit = 50, offset = 0) {
  return request(`/api/draft/all?limit=${limit}&offset=${offset}`);
}

export function getDraft(id) {
  return request(`/api/draft/${id}`);
}

export function confirmDraft(id) {
  return request(`/api/draft/confirm/${id}`, { method: "POST" });
}

export function declineDraft(id, error) {
  return request(`/api/draft/decline/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ error }),
  });
}
