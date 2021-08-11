# Protocol Designer SPA
## Development

Clone project

```
$ git clone https://gitlab.com/enginzyme-public/Protocol-Designer-SPA.git
```

Install dependencies

```
$ make install
```

Set correct values for the environment variables in the `.env.development` file.

Run local dev server

```
$ make run
```

Run tests

```
$ make test-unit
```


Visit in browser: http://localhost:8081/

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
tobi@enginzyme.com
