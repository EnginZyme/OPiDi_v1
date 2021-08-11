# Guide

## Introduction

> This project is about a web app that can be used to easily create, use, and share unambiguously specified laboratory protocols which are reproducible, flexible, configurable, and consistent.
>
> These protocols are currently used to specify robot operations on the Opentrons platform. In the future, it can also be used for specifying robot operations on other manufacturers' platform (eg. Flowbot, Hamilton).
>
> Google is used as the identity provider for the authentication layer of this web app. As a result users will first have to sign in via their EnginZyme email addresses before they gain access to it.
>
> The workflow in the app consists of creating, importing, or viewing an existing protocol. Either of these actions require that you follow up with the following steps:
>
> - Setup the robot deck with labware, pipette, and tiprack choices
> - Optionally create location sequences to be used in sequence transfer steps
> - Specify the desired robot operations in steps
> - Export the underlying protocol object
> - Simulate the protocol to generate text output with which you may verify that the protocol will run correctly on the robot.
> - Generate the corresponding robot specific protocol file (a Python file in the case of the Opentrons bot) to be run on the hardware.
>
> The user is enabled to mark a protocol as being "verified" upon actual verification via a test-run. The user is also enabled to share their protocol within a shared space provided by the web app.
> Further, the user can save changes made to a protocol, clone that protocol, or delete it entirely.
>
> The development version of this web app is accessible [here](http://protocol-designer-spa-test.s3-website.eu-north-1.amazonaws.com/)
>
> The production version of this web app is accessible [here](http://protocol-designer-spa.s3-website.eu-north-1.amazonaws.com/)

## Architectural Overview

![opd_architecture.png](public/assets/opd_architecture.png)

> The web app depends on the [protocol objects API](https://gitlab.com/enginzyme-public/protocol-objects-api) (hosted in an AWS EC2 instance managed by an AWS ElasticBeanstalk instance) for persistence and CRUD operations on created protocols and protocol dependencies such as labware, and pipette data. The protocol objects API sits a-top a protocol objects DB (provisioned as an AWS RDS instance).
>
> The web app also depends on the [Opentrons protocol generator service](https://gitlab.com/enginzyme-public/opentrons-protocol-generator) to either simulate protocol specifications sent from the web app, or to generate the Opentrons robot specific equivalent of the protocol.
>
> For our purposes, some user activity is logged and tracked on [AWS CloudWatch](https://eu-north-1.console.aws.amazon.com/cloudwatch/home?region=eu-north-1#logsV2:log-groups/log-group/ProtocolDesignerSPA-test/log-events/UserActivity). Such activity include:
>
> - Creating a protocol
> - Cloning a protocol
> - Deleting a protocol
> - Simulating a protocol
> - Generating the corresponding robot platform specific protocol file.

## Development

```
# Clone project
$ git clone https://gitlab.com/enginzyme-public/Protocol-Designer-SPA.git

# Install dependencies
$ npm install

# Run local dev server
$ npm run serve
```

Visit in browser: [http://localhost:8081](http://localhost:8081/)

## Distribution

Follow the guide [here](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-windows.html) to download the AWS CLI tool.

```
# Setup AWS CLI
$ aws configure
AWS Access Key ID [None]: <your-access-key>
AWS Secret Access Key [None]: <your-access-key>
Default region name [None]: eu-north-1
Default output format [None]: json

# Build/deploy development web app
$ git checkout develop
$ git pull
$ npm run build
$ npm run deploy

# Build/deploy production web app
$ git checkout master
$ git pull
$ npm run build
$ npm run deploy-prod
```

## Directory Structure

```
│   .gitignore                                    // gitignore
│   babel.config.js                               // babel-loader config
│   genDocs.cmd                                   // script to generate docs
│   package.json                                  // package.json
│
├───docs                                          // contains a replica of the project structure but for documentation
│
├───public                                        // Webpack root directory
│
└───src                                           // source code
    │   App.vue                                   // entry view
    │   globalStyles.css                          // global styles
    │   main.js                                   // entry for loading components, initialization
    │   urls.js                                   // URLs for remote APIs
    │
    ├───assets                                    // static image resources
    │
    ├───components                                // global public components
    │   ├───base                                  // components with basic logic
    │   │
    │   ├───forms                                 // components that accept user input
    │   │
    │   ├───layout                                // components that are static across views
    │   │
    │   └───views                                 // components that represent bounded contexts for this project
    │
    ├───pages                                     // pages
    │
    ├───router                                    // router
    │
    ├───schemas                                   // versions of the protocol object schemas
    │
    ├───store                                     // global status management
    │   │   index.js                              // main entry point
    │   │
    │   ├───defaultData                           // contains intial states of store modules
    │   │
    │   └───modules                               // store modules
    │
    ├───types                                     // action and mutation types used in the store
    │
    └───utils                                     // global public functions
```

## Maintainer(s)
> tobi@enginzyme.com
