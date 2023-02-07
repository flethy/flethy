export interface FlethyWorkspace {
  workspaceId: string;
}

export interface FlethyProject {
  projectId: string;
}

export interface FlethyMetaDates {
  createdAt: number;
  updatedAt?: number;
}

export interface FlethyMetaUser {
  createdBy: string;
  updatedBy?: string;
}

export interface FlethyRequest extends FlethyWorkspace, FlethyProject {
  userId: string;
}
