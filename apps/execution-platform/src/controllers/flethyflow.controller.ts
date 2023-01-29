import { FlowEngine } from "@flethy/flow";
import { FlowNode } from "@flethy/flow/dist/types/flow.types";
import { ENVVARS, SECRETS } from "../constants/envvar.const";
import { Workspace } from "./workspace.controller";

export interface OnboardUserRequest {
  userId: string;
  workspace: Workspace;
}

export interface ExternalNotificationRequest {
  message: string;
}

export class FlethyFlowController {
  public static async externalNotification(
    request: ExternalNotificationRequest
  ) {
    const flow: FlowNode[] = [
      {
        id: "slack",
        kind: "slack.incomingWebhooks.message",
        "auth:webhookid": "==>secrets==>WEBHOOK_ID",
        "body:text": "->context.message->string",
      },
    ];

    const engine = new FlowEngine({
      flow,
      input: {
        message: request.message,
      },
      env: {
        env: {},
        secrets: {
          WEBHOOK_ID: SECRETS.slack.webhookId,
        },
      },
    });

    await engine.start();
  }

  public static async onboardUser(request: OnboardUserRequest) {
    const flow: FlowNode[] = [
      {
        id: "token",
        config: {
          namespace: "token",
        },
        next: [
          {
            id: "updateAppMetadata",
          },
        ],
        kind: "auth0.auth.accesstoken",
        "body:audience": "==>env==>AUTH0_AUDIENCE",
        "body:grant_type": "client_credentials",
        "body:client_id": "==>secrets==>AUTH0_CLIENT_ID",
        "body:client_secret": "==>secrets==>AUTH0_CLIENT_SECRET",
        "subdomain:tenant": "==>env==>AUTH0_TENANT",
      },
      {
        id: "updateAppMetadata",
        config: {
          namespace: "updateAppMetadata",
        },
        kind: "auth0.users.update",
        "auth:Authorization": "->context.token.access_token->string",
        "param:id": "->context.userId->string",
        "subdomain:tenant": "==>env==>AUTH0_TENANT",
        "body:app_metadata": "->context.appMetadata->any",
      },
    ];

    const engine = new FlowEngine({
      flow,
      input: {
        userId: request.userId,
        appMetadata: {
          ws: [
            {
              id: request.workspace.id,
              r: request.workspace.r,
              p: [
                {
                  id: request.workspace.p[0].id,
                  r: request.workspace.p[0].r,
                },
              ],
            },
          ],
        },
      },
      env: {
        env: {
          AUTH0_AUDIENCE: ENVVARS.auth0.audience,
          AUTH0_TENANT: ENVVARS.auth0.tenant,
        },
        secrets: {
          AUTH0_CLIENT_ID: SECRETS.auth0.clientId,
          AUTH0_CLIENT_SECRET: SECRETS.auth0.clientSecret,
        },
      },
    });

    await engine.start();
  }
}
