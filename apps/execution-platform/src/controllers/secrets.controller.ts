import { SECRET } from "../constants/admin.const";
import { FlethyError, ErrorType } from "../utils/error.utils";
import { ValidationUtils } from "../utils/validation.utils";
import type { KV } from "worktop/kv";
import { read, write } from "worktop/kv";

declare var DATA: KV.Namespace;

export interface AddSecretRequest {
  workspaceId: string;
  projectId?: string;
  secretKey: string;
  secretValue: string;
}

const enc = new TextEncoder();
const dec = new TextDecoder();

// https://github.com/diafygi/webcrypto-examples#aes-cbc---encrypt
// https://github.com/bradyjoslin/webcrypto-example/blob/master/script.js
export class SecretsController {
  public static async addSecret(request: AddSecretRequest) {
    const validation = ValidationUtils.validateAll([
      {
        value: request.workspaceId,
        parameter: "workspaceId",
        checks: { required: true, minStringLength: 1 },
      },
      {
        value: request.projectId,
        parameter: "projectId",
        checks: { minStringLength: 1 },
      },
      {
        value: request.secretKey,
        parameter: "secretKey",
        checks: { required: true, minStringLength: 1 },
      },
      {
        value: request.secretValue,
        parameter: "secretValue",
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

    const encryptedSecret = await SecretsController.encrypt(
      JSON.stringify(request),
      SECRET
    );

    const success = await write<string>(
      DATA,
      request.workspaceId,
      encryptedSecret
    );
    return success;
  }

  public static async getSecret(workspaceId: string) {
    try {
      const encryptedSecret = await read<string>(DATA, workspaceId, "text");
      console.log(`======================`);
      console.log(encryptedSecret);
      if (encryptedSecret) {
        const decrypted = await SecretsController.decrypt(
          encryptedSecret,
          SECRET
        );
        return JSON.parse(decrypted);
      }
    } catch (error) {
      console.log(error);
    }
    throw new FlethyError({
      type: ErrorType.NotFound,
      message: `Secret not found for workspaceId: ${workspaceId}`,
      log: {
        context: { origin: "secrets.controller.ts", method: "getSecret" },
        message: `Secret not found for workspaceId: ${workspaceId}`,
      },
    });
  }

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
