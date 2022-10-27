import { Router } from "worktop";
import * as Cache from "worktop/cache";
// https://www.npmjs.com/package/worktop

const API = new Router();

export interface Env {
  // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
  // MY_KV_NAMESPACE: KVNamespace;
  //
  // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
  // MY_DURABLE_OBJECT: DurableObjectNamespace;
  //
  // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
  // MY_BUCKET: R2Bucket;
}

API.add("GET", "/messages/:id", async (req, res) => {
  // Pre-parsed `req.params` object
  const key = `messages::${req.params.id}`;

  // Assumes JSON (can override)
  const message = { text: "Hello from flethy with worktop", key };

  // Alter response headers directly
  res.setHeader("Cache-Control", "public, max-age=60");

  // Smart `res.send()` helper
  // ~> automatically stringifies JSON objects
  // ~> auto-sets `Content-Type` & `Content-Length` headers
  res.send(200, message);
});

API.add("GET", "/alive", (req, res) => {
  res.end("OK"); // Node.js-like `res.end`
});

Cache.listen(API.run);

// export default {
// 	async fetch(
// 		request: Request,
// 		env: Env,
// 		ctx: ExecutionContext
// 	): Promise<Response> {
// 		return new Response("Hello World!");
// 	},
// };
