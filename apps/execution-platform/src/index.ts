import { Router } from "worktop";
import * as Cache from "worktop/cache";
import { SECRET } from "./constants/admin.const";
import { AuthController, TokenScope } from "./controllers/auth.controller";
import { SecretsController } from "./controllers/secrets.controller";
import { AuthRoute } from "./routes/auth.route";
import { FrontendRoute } from "./routes/frontend.route";
import { Version1 } from "./routes/v1.route";
import { ErrorMiddleware } from "./utils/error.utils";
import { PermissionUtils } from "./utils/permission.utils";
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

API.add("GET", "/token", async (req, res) =>
  AuthRoute.createTokenRoute(req, res)
);

FrontendRoute.addRoutes(API);
Version1.addRoutes(API);

// API.add("GET", "/hmac", async (req, res) => {
//   if (typeof crypto !== "undefined") {
//     const enc = new TextEncoder();

//     const thisAlgorithm = { name: "HMAC", hash: "SHA-256" };

//     const importKey = await crypto.subtle.importKey(
//       "raw",
//       enc.encode("keykeykey"),
//       thisAlgorithm,
//       false,
//       ["sign", "verify"]
//     );
//     const signature = await crypto.subtle.sign(
//       thisAlgorithm.name,
//       importKey,
//       enc.encode("basebasebase")
//     );
//     const digest = btoa(String.fromCharCode(...new Uint8Array(signature)));
//     res.send(200, { success: true, digest });
//   } else {
//     res.send(500, { success: false });
//   }
// });

API.add("GET", "/token/:token", async (req, res) => {
  const { token } = req.params;
  try {
    await AuthController.verifyToken(
      {
        projectId: "1234",
        workspaceId: "456",
        scopes: [TokenScope.WORKFLOW_CREATE, TokenScope.WORKFLOW_READ],
        token,
      },
      SECRET
    );

    res.send(200, { success: true });
  } catch (error: any) {
    const response = ErrorMiddleware.handle(error);
    res.send(response.status, response.data);
  }
});

API.add("GET", "/alive", (req, res) => {
  res.end("OK"); // Node.js-like `res.end`
});

Cache.listen(API.run);
