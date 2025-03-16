/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	DB: D1Database;
  }
  
  export default {
	async fetch(request: Request, env: Env): Promise<Response> {
	  const url = new URL(request.url);
  
	  if (request.method === "POST" && url.pathname === "/sync") {
		try {
		  const body = await request.json() as { id: string, url: string, scroll: number, timestamp: number, windowId: string };
		  await env.DB.prepare(
			"INSERT INTO tabs (id, url, scroll_position, timestamp, window_id) VALUES (?, ?, ?, ?, ?)"
		  )
			.bind(body.id, body.url, body.scroll, body.timestamp, body.windowId)
			.run();
  
		  return new Response(JSON.stringify({ success: true }), { status: 200 });
		} catch (error) {
		  return new Response(JSON.stringify({ error: "Failed to insert data" }), {
			status: 500,
		  });
		}
	  }
  
	  if (request.method === "GET" && url.pathname === "/load") {
		try {
		  const { results } = await env.DB.prepare("SELECT * FROM tabs").all();
		  return new Response(JSON.stringify(results), { status: 200 });
		} catch (error) {
		  return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
			status: 500,
		  });
		}
	  }
  
	  return new Response("Invalid request", { status: 400 });
	},
  };
