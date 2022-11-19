import type { KV } from "worktop/kv";
import { read, write } from "worktop/kv";
import { ENVVARS } from "../constants/envvar.const";
import {
  FlethyMetaDates,
  FlethyMetaUser,
  FlethyProject,
  FlethyRequest,
} from "../types/general.type";
import { ErrorType, FlethyError } from "../utils/error.utils";
import { KVUtils } from "../utils/kv.utils";
import { ValidationUtils } from "../utils/validation.utils";

declare var SECRETS: KV.Namespace;

export interface FlethySecrets {
  secrets?: string;
}

export interface FlethySecretsMetadata
  extends FlethyMetaDates,
    FlethyMetaUser,
    FlethyProject {
  keys: string[];
}

export interface FlethySecretValues extends FlethySecrets {
  values: FlethySecretsValues;
}

export interface FlethySecretsValues {
  [key: string]: string;
}

// REQUESTS

export interface AddSecretRequest extends FlethyRequest {
  key: string;
  value: string;
}

export interface GetSecretsRequest extends FlethyRequest {}

export interface DeleteSecretRequest extends FlethyRequest {
  key: string;
}

const enc = new TextEncoder();
const dec = new TextDecoder();

// https://github.com/diafygi/webcrypto-examples#aes-cbc---encrypt
// https://github.com/bradyjoslin/webcrypto-example/blob/master/script.js
export class SecretsController {
  public static async put(request: AddSecretRequest) {
    const validation = ValidationUtils.validateAll([
      {
        value: request.projectId,
        parameter: "projectId",
        checks: { minStringLength: 1 },
      },
      {
        value: request.key,
        parameter: "key",
        checks: { required: true, minStringLength: 1 },
      },
      {
        value: request.value,
        parameter: "value",
        checks: { required: true, minStringLength: 1 },
      },
    ]);
    if (!validation.valid) {
      throw new FlethyError({
        type: ErrorType.BadRequest,
        message: validation.message,
        log: {
          context: { origin: "secrets.controller.ts", method: "addSecret" },
          message: `Validation error: ${validation.message}`,
        },
      });
    }

    const currentSecrets = await SecretsController.get({
      workspaceId: request.workspaceId,
      projectId: request.projectId,
      userId: request.userId,
    });

    const updatedSecrets: FlethySecrets = {};
    let updatedSecretsMetadata: FlethySecretsMetadata = {
      projectId: request.projectId,
      createdAt: Date.now(),
      createdBy: request.userId,
      keys: [],
    };

    let secretValues: FlethySecretsValues = {};

    if (currentSecrets?.secrets && currentSecrets?.metadata) {
      updatedSecretsMetadata = currentSecrets.metadata;
      updatedSecretsMetadata.updatedAt = Date.now();
      updatedSecretsMetadata.updatedBy = request.userId;
      if (
        currentSecrets.secrets.values &&
        Object.keys(currentSecrets.secrets.values).length > 0
      ) {
        secretValues = currentSecrets.secrets.values;
      }
    }

    secretValues[request.key] = request.value;
    updatedSecretsMetadata.keys = Object.keys(secretValues);

    const encryptedSecrets = await SecretsController.encrypt(
      JSON.stringify(secretValues),
      ENVVARS.config.stage
    );

    updatedSecrets.secrets = encryptedSecrets;

    const success = await write<FlethySecrets, FlethySecretsMetadata>(
      SECRETS,
      KVUtils.secretsForProject(request.projectId),
      updatedSecrets,
      { metadata: updatedSecretsMetadata }
    );
    return success;
  }

  public static async get(
    request: GetSecretsRequest
  ): Promise<
    { secrets: FlethySecretValues; metadata: FlethySecretsMetadata } | undefined
  > {
    try {
      const encryptedSecrets = await read<FlethySecrets, FlethySecretsMetadata>(
        SECRETS,
        KVUtils.secretsForProject(request.projectId),
        { metadata: true, type: "json" }
      );
      if (encryptedSecrets?.value && encryptedSecrets?.metadata) {
        const secretValues: FlethySecretValues = {
          values: {},
        };
        const secretMetadata: FlethySecretsMetadata = encryptedSecrets.metadata;
        if (encryptedSecrets.value.secrets) {
          const decrypted = await SecretsController.decrypt(
            encryptedSecrets.value.secrets,
            ENVVARS.config.stage
          );
          secretValues.values = JSON.parse(decrypted);
        }
        return { secrets: secretValues, metadata: secretMetadata };
      }
      return undefined;
    } catch (error) {
      throw new FlethyError({
        type: ErrorType.Internal,
        message: `Failed to get Secrets for project ${request.projectId}`,
        log: {
          context: { origin: "secrets.controller.ts", method: "get" },
          message: `Failed to get Secrets for project ${request.projectId}`,
        },
      });
    }
  }

  public static async delete(request: DeleteSecretRequest): Promise<boolean> {
    const currentSecrets = await SecretsController.get(request);
    if (currentSecrets?.secrets && currentSecrets?.metadata) {
      const updatedSecretsMetadata = currentSecrets.metadata;
      if (
        currentSecrets.secrets.values &&
        currentSecrets.secrets.values[request.key]
      ) {
        delete currentSecrets.secrets.values[request.key];
        updatedSecretsMetadata.keys = currentSecrets.metadata.keys.filter(
          (key) => key !== request.key
        );
        const encryptedUpdatedSecrets = await SecretsController.encrypt(
          JSON.stringify(currentSecrets.secrets.values),
          ENVVARS.config.stage
        );

        const updatedSecrets: FlethySecrets = {
          secrets: encryptedUpdatedSecrets,
        };
        updatedSecretsMetadata.updatedAt = Date.now();
        updatedSecretsMetadata.updatedBy = request.userId;

        const success = await write<FlethySecrets, FlethySecretsMetadata>(
          SECRETS,
          KVUtils.secretsForProject(request.projectId),
          updatedSecrets,
          { metadata: updatedSecretsMetadata }
        );
        return success;
      }
    }
    throw new FlethyError({
      type: ErrorType.NotFound,
      message: `No secrets with key ${request.key} configured for project ${request.projectId}`,
      log: {
        context: { origin: "secrets.controller.ts", method: "delete" },
        message: `No secrets with key ${request.key} configured for project ${request.projectId}`,
      },
    });
  }

  // HELPER FUNCTIONS

  private static getPasswordKey(password: string) {
    return crypto.subtle.importKey(
      "raw",
      enc.encode(password),
      "PBKDF2",
      false,
      ["deriveKey"]
    );
  }

  private static async deriveKey(
    passwordKey: CryptoKey,
    salt: Uint8Array,
    keyUsage: KeyUsage[]
  ) {
    return crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      passwordKey,
      { name: "AES-GCM", length: 256 },
      false,
      keyUsage
    );
  }

  private static buff_to_base64(buff: any) {
    return btoa(String.fromCharCode.apply(null, buff));
  }

  private static base64_to_buf(b64: any) {
    return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
  }

  private static async encrypt(secretData: string, password: string) {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const passwordKey = await SecretsController.getPasswordKey(password);
    const aesKey = await SecretsController.deriveKey(passwordKey, salt, [
      "encrypt",
    ]);
    const encryptedContent = await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      aesKey,
      enc.encode(secretData)
    );

    const encryptedContentArr = new Uint8Array(encryptedContent);
    let buff = new Uint8Array(
      salt.byteLength + iv.byteLength + encryptedContentArr.byteLength
    );
    buff.set(salt, 0);
    buff.set(iv, salt.byteLength);
    buff.set(encryptedContentArr, salt.byteLength + iv.byteLength);
    const base64Buff = SecretsController.buff_to_base64(buff);
    return base64Buff;
  }

  private static async decrypt(encryptedData: string, password: string) {
    const encryptedDataBuff = SecretsController.base64_to_buf(encryptedData);
    const salt = encryptedDataBuff.slice(0, 16);
    const iv = encryptedDataBuff.slice(16, 16 + 12);
    const data = encryptedDataBuff.slice(16 + 12);
    const passwordKey = await SecretsController.getPasswordKey(password);
    const aesKey = await SecretsController.deriveKey(passwordKey, salt, [
      "decrypt",
    ]);
    const decryptedContent = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      aesKey,
      data
    );
    return dec.decode(decryptedContent);
  }
}
