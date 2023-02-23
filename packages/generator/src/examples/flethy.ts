import Flethy from '@flethy/connectors/src/configs/flethy.config'

const addOrUpdateWorkflow: Flethy.AddOrUpdateWorkflow = {
  kind: 'flethy.workflows.addOrUpdate',
  'auth:Authorization': process.env.FLETHY_API_TOKEN,
  'param:workspaceId': process.env.FLETHY_WORKSPACE_ID,
  'param:projectId': process.env.FLETHY_PROJECT_ID,
  'body:name': 'My Workflow',
  'body:workflow': [],
}

const listWorkflows: Flethy.ListWorkflows = {
  kind: 'flethy.workflows.list',
  'auth:Authorization': process.env.FLETHY_API_TOKEN,
  'param:workspaceId': process.env.FLETHY_WORKSPACE_ID,
  'param:projectId': process.env.FLETHY_PROJECT_ID,
}

const configs = {
  addOrUpdateWorkflow,
  listWorkflows,
}

export default { configs }
