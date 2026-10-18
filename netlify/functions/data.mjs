import { getStore } from "@netlify/blobs";

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });

export default async (req) => {
  const store = getStore("torneio");

  if (req.method === "GET") {
    const data = await store.get("data", { type: "json" });
    return json(data ?? null);
  }

  if (req.method === "POST") {
    const expected = process.env.ADMIN_PASSWORD;
    const given = req.headers.get("x-admin-password");
    if (!expected || given !== expected) {
      await new Promise((r) => setTimeout(r, 800));
      return json({ error: "unauthorized" }, 401);
    }
    const url = new URL(req.url);
    if (url.searchParams.get("check")) return json({ ok: true });

    let body;
    try {
      const text = await req.text();
      if (text.length > 100000) return json({ error: "too large" }, 413);
      body = JSON.parse(text);
    } catch {
      return json({ error: "invalid json" }, 400);
    }
    if (!body || !Array.isArray(body.items) || !Array.isArray(body.days) || !body.series) {
      return json({ error: "invalid data" }, 400);
    }
    await store.setJSON("data", body);
    return json({ ok: true });
  }

  return json({ error: "method not allowed" }, 405);
};

export const config = { path: "/api/data" };
