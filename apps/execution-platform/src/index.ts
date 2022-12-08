import { Router } from "worktop";
import * as Cache from "worktop/cache";
import * as CORS from "worktop/cors";
import { FrontendRoute } from "./routes/frontend.route";
import { Version1 } from "./routes/v1.route";
// https://www.npmjs.com/package/worktop

const API = new Router();
API.prepare = CORS.preflight({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  headers: ["Cache-Control", "Content-Type", "Authorization"],
  credentials: true,
});

FrontendRoute.addRoutes(API);
Version1.addRoutes(API);

API.add("GET", "/alive", (req, res) => {
  res.end("OK"); // Node.js-like `res.end`
});

Cache.listen(API.run);
