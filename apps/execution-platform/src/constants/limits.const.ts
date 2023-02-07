export interface Limits {
  projects: {
    max: number;
    workflows: {
      max: number;
    };
    tokens: {
      max: number;
    };
    secrets: {
      max: number;
    };
    crons: {
      max: number;
    };
  };
}

export const PACKAGE_LIMITS = {
  base: {
    projects: {
      max: 1,
      workflows: {
        max: 10,
      },
      tokens: {
        max: 3,
      },
      secrets: {
        max: 10,
      },
      crons: {
        max: 1,
      },
    },
  } as Limits,
};
