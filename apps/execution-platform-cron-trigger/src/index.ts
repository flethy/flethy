export default {
  async scheduled(event: any, env: any, ctx: any) {
    console.log(`cron: trigger - ${event.cron}`);
    try {
      const response = await env.flethyep.fetch("http://localhost/alive");
      if (!response.ok) {
        console.log(`error: ${response.status}`);
      }
    } catch (error) {
      console.log(`error: ${error}`);
    }
    console.log(`called other worker`);
    return new Response("All done", { status: 200 });
  },
};
