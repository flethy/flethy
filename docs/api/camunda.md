# Camunda

## Links

* URL: [https://camunda.com](https://camunda.com)
* Documentation: [https://docs.camunda.io/](https://docs.camunda.io/)
* Tags: web2
* Category: automation
* Type: workflows

## API

### console

#### token

##### OAuth Token

* Description: Get OAuth Token for Camunda Platform
* Docs: [https://docs.camunda.io/docs/apis-clients/console-api-reference/](https://docs.camunda.io/docs/apis-clients/console-api-reference/)

#### getClusters

##### Authentication

* Authorization: header:bearer

##### Get Clusters of Organization

* Description: A list of all your Camunda Cloud clusters.
* Docs: [https://console.cloud.camunda.io/customer-api/openapi/docs/#/default/GetClusters](https://console.cloud.camunda.io/customer-api/openapi/docs/#/default/GetClusters)

#### getClustersParameters

##### Authentication

* Authorization: header:bearer

##### Get Create Cluster Parameters

* Description: Gets all possible options to create a Camunda Cloud cluster.
* Docs: [https://console.cloud.camunda.io/customer-api/openapi/docs/#/default/GetParameters](https://console.cloud.camunda.io/customer-api/openapi/docs/#/default/GetParameters)

#### deleteCluster

##### Authentication

* Authorization: header:bearer

##### Delete Cluster

* Description: Irreversibly deletes a cluster identified by the given clusterUuid.
* Docs: [https://console.cloud.camunda.io/customer-api/openapi/docs/#/default/DeleteCluster](https://console.cloud.camunda.io/customer-api/openapi/docs/#/default/DeleteCluster)

#### createCluster

##### Authentication

* Authorization: header:bearer

##### Create Cluster

* Description: Create a new Cluster.
* Docs: [https://console.cloud.camunda.io/customer-api/openapi/docs/#/default/CreateCluster](https://console.cloud.camunda.io/customer-api/openapi/docs/#/default/CreateCluster)

#### getClients

##### Authentication

* Authorization: header:bearer

##### Get Cluster Clients

* Description: A list of all the clients currently configured for your Camunda Cloud cluster.
* Docs: [https://console.cloud.camunda.io/customer-api/openapi/docs/#/default/GetClients](https://console.cloud.camunda.io/customer-api/openapi/docs/#/default/GetClients)

#### createClient

##### Authentication

* Authorization: header:bearer

##### Create Cluster Client

* Description: Create a new Cluster Client
* Docs: [https://console.cloud.camunda.io/customer-api/openapi/docs/#/default/CreateClient](https://console.cloud.camunda.io/customer-api/openapi/docs/#/default/CreateClient)

#### getClient

##### Authentication

* Authorization: header:bearer

##### Get Cluster Client

* Description: The connection parameters needed to use the client with your Camunda Cloud cluster.
* Docs: [https://console.cloud.camunda.io/customer-api/openapi/docs/#/default/GetClient](https://console.cloud.camunda.io/customer-api/openapi/docs/#/default/GetClient)

#### deleteClient

##### Authentication

* Authorization: header:bearer

##### Delete Cluster Client

* Description: Irreversibly deletes a cluster client.
* Docs: [https://console.cloud.camunda.io/customer-api/openapi/docs/#/default/DeleteClient](https://console.cloud.camunda.io/customer-api/openapi/docs/#/default/DeleteClient)
