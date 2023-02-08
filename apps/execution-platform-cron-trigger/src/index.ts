import { CronsController } from "./controllers/crons.controller";
import { RouterPathUtils } from "./utils/router.utils";

export default {
  async scheduled(_event: any, env: any, _ctx: any) {
    const crons = await CronsController.getNextWorkflowsToExecute(env);
    const auth = env.SECRET_INTER_SERVICE_AUTH;

    if (crons.length > 0) {
      const promises: any[] = [];
      crons.forEach((cron) => {
        const route = new RouterPathUtils()
          .s2s()
          .w(cron.workspaceId)
          .p(cron.projectId)
          .wf(cron.workflowId)
          .i()
          .gen();
        const url = `http://localhost${route}`;
        const options = {
          method: "POST",
          headers: {
            Authorization: auth,
          },
          body: JSON.stringify({ payload: {} }),
        };
        promises.push(env.flethyep.fetch(url, options));
      });
      const route = new RouterPathUtils().s2s().c(false).custom("update").gen();
      const url = `http://localhost${route}`;
      const options = {
        method: "POST",
        headers: {
          Authorization: auth,
        },
      };
      promises.push(env.flethyep.fetch(url, options));

      await Promise.allSettled(promises);
      console.log(`Triggered ${crons.length} workflows`);
    }
    return new Response("All done", { status: 200 });
  },
};
