// ENV VARS
declare var ENV_STAGE: string;

// SECRETS
declare var SECRET_INTER_SERVICE_AUTH: string;

// MAPPINGS

export const ENVVARS = {
  config: {
    stage: ENV_STAGE,
  },
};

export const SECRETS = {
  config: {
    interServiceAuth: SECRET_INTER_SERVICE_AUTH,
  },
};
