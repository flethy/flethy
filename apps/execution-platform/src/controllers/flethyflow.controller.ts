import { FlowEngine } from "@flethy/flow";
import {
  FlowDecisionModel,
  FlowNode,
} from "@flethy/flow/dist/types/flow.types";
import { ENVVARS, SECRETS } from "../constants/envvar.const";
import { Workspace } from "./workspace.controller";

export interface OnboardUserRequest {
  userId: string;
  workspace: Workspace;
}

export interface ExternalNotificationRequest {
  message: string;
}

export interface AnalyticsRequest {
  userId: string;
  workspaceId: string;
  projectId: string;
  event: string;
}

export enum AnalyticsEvent {
  USER_ONBOARD = "user:onboard",
  SECRET_CREATE = "secret:create",
  SECRET_DELETE = "secret:delete",
  TOKEN_CREATE = "token:create",
  TOKEN_DELETE = "token:delete",
  INSTANCE_CREATE = "instance:create",
  WORKSPACE_CREATE = "workspace:create",
  WORKSPACE_DELETE = "workspace:delete",
  WORKFLOW_PUT = "workflow:put",
  WORKFLOW_DELETE = "workflow:delete",
  CRON_CREATE = "cron:create",
  CRON_DELETE = "cron:delete",
}

export interface EventRequest {
  userId: string;
  email?: string;
  workspaceId: string;
  projectId: string;
  event: string;
}

export class FlethyFlowController {
  public static async sendEvent(request: EventRequest) {
    if (ENVVARS.config.stage !== "prod") {
      return;
    }

    const decisions: FlowDecisionModel[] = [
      {
        id: "event-to-channel",
        model: [
          {
            input: "user:onboard",
            outputs: [
              {
                key: "chat",
                value: true,
              },
            ],
          },
        ],
      },
    ];

    const flow: FlowNode[] = [
      {
        id: "start",
        kind: "none",
        next: [
          {
            id: "slack",
            condition: {
              filter: "context.event",
              toDecisionModel: {
                id: "event-to-channel",
                targetKey: "chat",
              },
            },
          },
          {
            id: "mixpanel",
          },
        ],
      },
      {
        id: "mixpanel",
        kind: "mixpanel.events.track",
        "auth:token": "==>secrets==>MIXPANEL_TOKEN",
        baseId: "api-eu",
        "body:body": [
          {
            properties: {
              distinct_id: "->context.userId->string",
              time: Date.now(),
              workspaceId: "->context.workspaceId->string",
              projectId: "->context.projectId->string",
            },
            event: "->context.event->string",
          },
        ],
      },
      {
        id: "slack",
        kind: "slack.incomingWebhooks.message",
        "auth:webhookid": "==>secrets==>WEBHOOK_ID",
        "body:text": "->context.event & ' ' & context.userId->string",
      },
    ];

    const engine = new FlowEngine({
      flow,
      input: {
        userId: request.userId,
        email: request.email,
        event: request.event,
        workspaceId: request.workspaceId,
        projectId: request.projectId,
      },
      env: {
        env: {},
        secrets: {
          MIXPANEL_TOKEN: SECRETS.mixpanel.projectToken,
          WEBHOOK_ID: SECRETS.slack.webhookId,
        },
      },
      decisions,
    });

    await engine.start();
  }

  // Deprecated: use sendEvent
  public static async analytics(request: AnalyticsRequest) {
    if (ENVVARS.config.stage !== "prod") {
      return;
    }
    const flow: FlowNode[] = [
      {
        id: "mixpanel",
        kind: "mixpanel.events.track",
        "auth:token": "==>secrets==>MIXPANEL_TOKEN",
        baseId: "api-eu",
        "body:body": [
          {
            properties: {
              distinct_id: "->context.userId->string",
              time: Date.now(),
              workspaceId: "->context.workspaceId->string",
              projectId: "->context.projectId->string",
            },
            event: "->context.event->string",
          },
        ],
      },
    ];

    const engine = new FlowEngine({
      flow,
      input: {
        userId: request.userId,
        event: request.event,
        workspaceId: request.workspaceId,
        projectId: request.projectId,
      },
      env: {
        env: {},
        secrets: {
          MIXPANEL_TOKEN: SECRETS.mixpanel.projectToken,
        },
      },
    });

    await engine.start();
  }

  // Deprecated: use sendEvent
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
