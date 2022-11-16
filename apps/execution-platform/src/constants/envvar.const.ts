// ENV VARS
declare var SECRET_AUTH_AUDIENCE: string;
declare var SECRET_AUTH_TENANT: string;

// SECRETS
declare var SECRET_AUTH_CLIENT_ID: string;
declare var SECRET_AUTH_CLIENT_SECRET: string;

// MAPPINGS

export const ENVVARS = {
  auth0: {
    audience: SECRET_AUTH_AUDIENCE,
    tenant: SECRET_AUTH_TENANT,
  },
};

export const SECRETS = {
  auth0: {
    clientId: SECRET_AUTH_CLIENT_ID,
    clientSecret: SECRET_AUTH_CLIENT_SECRET,
  },
};
