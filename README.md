---
languages:
- javascript
- html
products:
- azure-active-directory
- microsoft-identity-platform
---

# Vanilla JavaScript Single-page Application secured with MSAL.js

## Contents

| File/folder       | Description                                |
|-------------------|--------------------------------------------|
| `app`             | Contains the main application files        |
| `app/authConfig.js` | Contains configuration parameters for Azure AD B2C. |
| `app/authRedirect.js` | Contains the main authentication logic. |
| `app/index.html`  | Contains the main Login page. |
| `app/ui.js`       | Contains UI logic for dynamic elements in `index.html`. |
| `app/UserIsAuth.html` | The page that users interact with when they are authenticated. |
| `app/azure-pipelines.yml` | Contains the script for Azure Pipelines. |
| `Components`      | Contains various components used in the application. |
| `Components/bootstrap` | Contains Bootstrap dependency. |
| `Components/gridjs` | Contains Grid.js dependency. |
| `Components/apiCall.js` | Contains the logic for making calls to the backend. |
| `Components/SubmitListener.js` | Contains the logic for submitting the form. |
| `.gitignore`      | Define what to ignore at commit time.      |
| `package.json`    | Package manifest for npm.                  |
| `server.js`     | Implements a simple Node server to serve `index.html`.  |

## Prerequisites

[Node](https://nodejs.org/en/) must be installed to run this sample locally but not required to be run on azure cloud.

## Setup

1. [Register a new application](https://docs.microsoft.com/azure/active-directory/develop/scenario-spa-app-registration) in the [Azure Portal](https://portal.azure.com). Ensure that the application is enabled for the [authorization code flow with PKCE](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-auth-code-flow). This will require that you redirect URI configured in the portal is of type `SPA`.
2. Open the `app/authConfig.js` file and provide the required configuration values.
3. On the command line, navigate to the root of the repository, and run `npm install` to install the project dependencies via npm.

## Permissions

The application requires the following permissions:

- email
- openid
- offline_access
- profile
- User.Read

These permissions are related to the Graph API and are necessary for the application to function correctly.

## Importing the Logic App

To import the Logic App, follow these steps:

1. Navigate to the Azure portal.
2. In the left-hand menu, click on "Logic Apps".
3. Click on the "+ Add" button to create a new Logic App.
4. In the "Create Logic App" pane, fill in the necessary details such as the name, subscription, resource group, location, and log analytics.
5. Click on the "Review + create" button, review your settings, and then click on the "Create" button to create the Logic App.
6. Once the Logic App is created, navigate to it and click on the "Logic App Designer".
7. In the Logic App Designer, you can import your Logic App by clicking on the "Code view" and pasting the JSON definition of your Logic App.

In the first activity of the Logic App, there will be a link provided called "HTTP Request" (or something similar). This link should be pasted in the `apiUrl` constant in the `Components/apiCall.js` file,surrounded by double quotes (" ").

Alternatively, you can import an existing Logic App by following the steps in this [CloudFronts article](https://www.cloudfronts.com/azure/logic-app/how-to-import-an-already-existing-logic-app-template-in-azure-logic-app/).

## Importing the Static Web App

To import the Static Web App, follow these steps:

1. Navigate to the Azure portal.
2. In the left-hand menu, click on "Static Web Apps".
3. Click on the "+ Add" button to create a new Static Web App.
4. In the "Create Static Web App" pane, fill in the necessary details such as the name, subscription, resource group, and location.
5. For the "Source", select "Code" and then fill in the details of your repository such as the organization, repository, and branch.
6. Click on the "Review + create" button, review your settings, and then click on the "Create" button to create the Static Web App.
7. Once the Static Web App is created, it will automatically set up a GitHub Action in your repository to deploy your application.

## Azure DevOps Integration with Pipelines

To integrate Azure DevOps with Pipelines, follow these steps:

1. Navigate to your Azure DevOps project.
2. Click on "Pipelines" in the left-hand menu.
3. Click on the "New pipeline" button.
4. Choose where your code is located (e.g., Azure Repos Git, GitHub, etc.).
5. Select the repository that contains your project.
6. Choose the appropriate pipeline configuration for your project. If you have a `azure-pipelines.yml` file in your repository, Azure DevOps will use that. This file is located in the `app` folder of the repository. Otherwise, you can choose one of the predefined configurations or use the assistant to create a new one.
7. Review your pipeline configuration and click on the "Run" button to create and run your pipeline.

Remember to include the necessary steps in your pipeline to install dependencies, build your project, and deploy it to Azure. If you're using a script for this process, you can include a script step in your pipeline to run it.

## Additional Notes

The documentation provided above is a general guide. Referring to official Azure documentation is also preferred.
