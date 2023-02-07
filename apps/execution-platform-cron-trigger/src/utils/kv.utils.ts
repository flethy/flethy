import { KV } from "worktop/kv";

export interface KVNamespaces {
  data: KV.Namespace;
}

export class KVUtils {
  public static getKV(env: any): KVNamespaces {
    return {
      data: env.DATA,
    };
  }

  public static getCronKey(): string {
    return "crons";
  }
}
