import { NetlifyIntegrationUI } from "@netlify/sdk";

const integrationUI = new NetlifyIntegrationUI("LambdaTest Integration");

const surface = integrationUI.addSurface("integrations-settings");
const route = surface.addRoute("/");

route.addText({
    value: "Configure your LambdaTest integration",
});
route.addLink({
    href: "https://accounts.lambdatest.com/register",
    text: "Don't have a LambdaTest account yet? Sign up for free here",
});

route.addForm(
    {
      title: "Configuration",
      id: "configuration-form",
      onSubmit: async (surfaceState) => {
        const { integrationContext, fetch, picker } = surfaceState;
        const { siteId, accountId } = integrationContext;
  
        const username = picker.getFormInputValue("configuration-form", "username");
        const token = picker.getFormInputValue("configuration-form", "token");
        const project = picker.getFormInputValue("configuration-form", "project");

        const linkResponse = await fetch('lambdatest-user-auth', {
            method: "POST",
            body: JSON.stringify({ siteId, accountId, username, token, project })
        }); //https://sdk.netlify.com/integration-ui/call-api-handlers/
      },
    },
    (card) => {
        card.addInputText({
            id: "username",
            label: "Username",
        });
        card.addInputPassword({
            id: "token",
            label: "Access Key",
        });
        card.addInputPassword({
            id: "project",
            label: "SmartUI Project Name",
        });
        card.addLink({
            href: "https://smartui.lambdatest.com/",
            text: "You can find the above details here",
        });
    }
);

route.addLink({
    href: "https://lambdatest.com/support/docs/netlify-integration-with-lambdatest/",
    text: "Having trouble? Check out our documentation here",
});

export { integrationUI };