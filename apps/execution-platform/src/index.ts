import { Router } from "worktop";
import * as Cache from "worktop/cache";
import * as CORS from "worktop/cors";
import { FrontendRoute } from "./routes/frontend.route";
import { ServiceRoute } from "./routes/service.route";
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
ServiceRoute.addRoutes(API);

API.add("GET", "/alive", (req, res) => {
  fetch("https://webhook.site/80370a44-bf66-49f5-bdb8-195d4c0cdd10");
  res.end("OK"); // Node.js-like `res.end`
});

Cache.listen(API.run);
