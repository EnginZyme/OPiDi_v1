(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{362:function(e,t,o){"use strict";o.r(t);var n=o(40),r=Object(n.a)({},(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[o("h1",{attrs:{id:"guide"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#guide"}},[e._v("#")]),e._v(" Guide")]),e._v(" "),o("h2",{attrs:{id:"introduction"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#introduction"}},[e._v("#")]),e._v(" Introduction")]),e._v(" "),o("blockquote",[o("p",[e._v("This project is about a web app that can be used to easily create, use, and share unambiguously specified laboratory protocols which are reproducible, flexible, configurable, and consistent.")]),e._v(" "),o("p",[e._v("These protocols are currently used to specify robot operations on the Opentrons platform. In the future, it can also be used for specifying robot operations on other manufacturers' platform (eg. Flowbot, Hamilton).")]),e._v(" "),o("p",[e._v("Google is used as the identity provider for the authentication layer of this web app. As a result users will first have to sign in via their EnginZyme email addresses before they gain access to it.")]),e._v(" "),o("p",[e._v("The workflow in the app consists of creating, importing, or viewing an existing protocol. Either of these actions require that you follow up with the following steps:")]),e._v(" "),o("ul",[o("li",[e._v("Setup the robot deck with labware, pipette, and tiprack choices")]),e._v(" "),o("li",[e._v("Optionally create location sequences to be used in sequence transfer steps")]),e._v(" "),o("li",[e._v("Specify the desired robot operations in steps")]),e._v(" "),o("li",[e._v("Export the underlying protocol object")]),e._v(" "),o("li",[e._v("Simulate the protocol to generate text output with which you may verify that the protocol will run correctly on the robot.")]),e._v(" "),o("li",[e._v("Generate the corresponding robot specific protocol file (a Python file in the case of the Opentrons bot) to be run on the hardware.")])]),e._v(" "),o("p",[e._v('The user is enabled to mark a protocol as being "verified" upon actual verification via a test-run. The user is also enabled to share their protocol within a shared space provided by the web app.\nFurther, the user can save changes made to a protocol, clone that protocol, or delete it entirely.')]),e._v(" "),o("p",[e._v("The development version of this web app is accessible "),o("a",{attrs:{href:"http://protocol-designer-spa-test.s3-website.eu-north-1.amazonaws.com/",target:"_blank",rel:"noopener noreferrer"}},[e._v("here"),o("OutboundLink")],1)]),e._v(" "),o("p",[e._v("The production version of this web app is accessible "),o("a",{attrs:{href:"http://protocol-designer-spa.s3-website.eu-north-1.amazonaws.com/",target:"_blank",rel:"noopener noreferrer"}},[e._v("here"),o("OutboundLink")],1)])]),e._v(" "),o("h2",{attrs:{id:"architectural-overview"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#architectural-overview"}},[e._v("#")]),e._v(" Architectural Overview")]),e._v(" "),o("p",[o("img",{attrs:{src:"public/assets/opd_architecture.png",alt:"opd_architecture.png"}})]),e._v(" "),o("blockquote",[o("p",[e._v("The web app depends on the "),o("a",{attrs:{href:"https://gitlab.com/enginzyme/protocol-objects-api",target:"_blank",rel:"noopener noreferrer"}},[e._v("protocol objects API"),o("OutboundLink")],1),e._v(" (hosted in an AWS EC2 instance managed by an AWS ElasticBeanstalk instance) for persistence and CRUD operations on created protocols and protocol dependencies such as labware, and pipette data. The protocol objects API sits a-top a protocol objects DB (provisioned as an AWS RDS instance).")]),e._v(" "),o("p",[e._v("The web app also depends on the "),o("a",{attrs:{href:"https://gitlab.com/enginzyme/opentrons-protocol-generator",target:"_blank",rel:"noopener noreferrer"}},[e._v("Opentrons protocol generator service"),o("OutboundLink")],1),e._v(" to either simulate protocol specifications sent from the web app, or to generate the Opentrons robot specific equivalent of the protocol.")]),e._v(" "),o("p",[e._v("For our purposes, some user activity is logged and tracked on "),o("a",{attrs:{href:"https://eu-north-1.console.aws.amazon.com/cloudwatch/home?region=eu-north-1#logsV2:log-groups/log-group/ProtocolDesignerSPA-test/log-events/UserActivity",target:"_blank",rel:"noopener noreferrer"}},[e._v("AWS CloudWatch"),o("OutboundLink")],1),e._v(". Such activity include:")]),e._v(" "),o("ul",[o("li",[e._v("Creating a protocol")]),e._v(" "),o("li",[e._v("Cloning a protocol")]),e._v(" "),o("li",[e._v("Deleting a protocol")]),e._v(" "),o("li",[e._v("Simulating a protocol")]),e._v(" "),o("li",[e._v("Generating the corresponding robot platform specific protocol file.")])])]),e._v(" "),o("h2",{attrs:{id:"development"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#development"}},[e._v("#")]),e._v(" Development")]),e._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",{pre:!0,attrs:{class:"language-text"}},[o("code",[e._v("# Clone project\n$ git clone https://gitlab.com/enginzyme/Protocol-Designer-SPA.git\n\n# Install dependencies\n$ npm install\n\n# Run local dev server\n$ npm run serve\n")])])]),o("p",[e._v("Visit in browser: "),o("a",{attrs:{href:"http://localhost:8081/",target:"_blank",rel:"noopener noreferrer"}},[e._v("http://localhost:8081"),o("OutboundLink")],1)]),e._v(" "),o("h2",{attrs:{id:"distribution"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#distribution"}},[e._v("#")]),e._v(" Distribution")]),e._v(" "),o("p",[e._v("Follow the guide "),o("a",{attrs:{href:"https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-windows.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("here"),o("OutboundLink")],1),e._v(" to download the AWS CLI tool.")]),e._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",{pre:!0,attrs:{class:"language-text"}},[o("code",[e._v("# Setup AWS CLI\n$ aws configure\nAWS Access Key ID [None]: <your-access-key>\nAWS Secret Access Key [None]: <your-access-key>\nDefault region name [None]: eu-north-1\nDefault output format [None]: json\n\n# Build/deploy development web app\n$ git checkout develop\n$ git pull\n$ npm run build\n$ npm run deploy\n\n# Build/deploy production web app\n$ git checkout master\n$ git pull\n$ npm run build\n$ npm run deploy-prod\n")])])]),o("h2",{attrs:{id:"directory-structure"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#directory-structure"}},[e._v("#")]),e._v(" Directory Structure")]),e._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",{pre:!0,attrs:{class:"language-text"}},[o("code",[e._v("│   .gitignore                                    // gitignore\n│   babel.config.js                               // babel-loader config\n│   genDocs.cmd                                   // script to generate docs\n│   package.json                                  // package.json\n│\n├───docs                                          // contains a replica of the project structure but for documentation\n│\n├───public                                        // Webpack root directory\n│\n└───src                                           // source code\n    │   App.vue                                   // entry view\n    │   globalStyles.css                          // global styles\n    │   main.js                                   // entry for loading components, initialization\n    │   urls.js                                   // URLs for remote APIs\n    │\n    ├───assets                                    // static image resources\n    │\n    ├───components                                // global public components\n    │   ├───base                                  // components with basic logic\n    │   │\n    │   ├───forms                                 // components that accept user input\n    │   │\n    │   ├───layout                                // components that are static across views\n    │   │\n    │   └───views                                 // components that represent bounded contexts for this project\n    │\n    ├───pages                                     // pages\n    │\n    ├───router                                    // router\n    │\n    ├───schemas                                   // versions of the protocol object schemas\n    │\n    ├───store                                     // global status management\n    │   │   index.js                              // main entry point\n    │   │\n    │   ├───defaultData                           // contains intial states of store modules\n    │   │\n    │   └───modules                               // store modules\n    │\n    ├───types                                     // action and mutation types used in the store\n    │\n    └───utils                                     // global public functions\n")])])]),o("h2",{attrs:{id:"maintainer-s"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#maintainer-s"}},[e._v("#")]),e._v(" Maintainer(s)")]),e._v(" "),o("blockquote",[o("p",[e._v("tobi@enginzyme.com")])])])}),[],!1,null,null,null);t.default=r.exports}}]);