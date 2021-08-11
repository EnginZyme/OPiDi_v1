# Opentrons Protocol Generator

The Opentrons Protocol Generator is designed first and foremost to parametrize the generation
of Opentrons protocol files. The python files are created from a set of instructions in a JSON file
following a very specific schema.

It is built with support for Opentrons API v2 and uses heavily the native 
[OT-2 API V2](https://docs.opentrons.com/v2/#)

## Design Considerations

The generator was built as part of a custom protocol designer webapp from which users can define
an instructions file and then generate, fetch, simulate and download the protocol.

Protocol python files are then uploaded to the robot using the [Opentrons App](https://https://opentrons.com/ot-app/).

To change the robot configuration and execution from an instructions file, the file contents are converted
to a python dictionary upon protocol generation.  The rest of the file is composed of handlers that 
define pipettes, labware, tip change behavior, liquid steps and custom defined steps (external 
hardware integration, slack notifications, etc.)

![High Level System Design](./docs/files/OPG_High_Level_Architecture.jpg)

### Generator / Transpiler

Since the app is designed to upload a single python file  every handler is appended to the protocol by a main transpiler script.

The `opentrons_generator.py` transpiles the instructions JSON file and a bunch of static transpiler templates is a static file that contains the code the robot will run through when a protocol is begun. 
* Main Transpiler
* Opentrons Protocols Helper
* Opentrons Robot Handler
* External Modules

The schemas of the instructions JSON file are outlined for each attribute  in `protocol_generator/schemas`.

The main transpiler `opentrons_transpiler.py`  and the robot handler `opentrons_robot_handler.py` files rely on the Opentrons Python package. For more information on the general setup
and functions available read through the [OT-2 API V2](https://docs.opentrons.com/v2/#).

After initialising the required classes and Opentrons protocol context, the loop begins with a pre-protocol "flight check"
whose purpose is to run a few basic tests to mitigate the risk the protocol will crash half way in, for example testing
external modules like the [BioShake 3000T](https://www.qinstruments.com/automation/bioshake-3000-t/). Next it iterates through all the steps in
the instructions file deck configuration and list of steps read by the robot handler classes . 

The `opentrons_protocol_helpers` classes manage additional protocol functionality. For example, if at any point an
exception is encountered, it will be caught and sent via Slack to a debugging channel.
If all goes well, the protocol will finish with a post-protocol "cleanup" step to ensure a graceful completion and log 
the experiment using an AWS service Cloudwatch instance. In the event of a failure log will include an error message.
Webhooks for slack channels and AWS cloudwatch instances must be set as environment variables. 

* SLACK_LOG_WEBHOOK: webhook of a slack channel to post in depth protocol activity.
* SLACK_MESSAGE_WEBHOOK: webhook of a slack channel to post messages as steps in the instructions file.
* CLOUD_WATCH_EP:  url of the AWS Cloudwatch instance

For more detailed information on the transpiler, check the documentation for each class.

### Command Line Interface 

The generator can be used directly from the CLI `opentrons_cli.py` 

```
$ python opentrons_cli.py --input <<ROBOT_INSTRUCTIONS_JSON_FILE>> --output <<PYTHON_ROBOT_PROTOCOL>>
```

and protocols can be simulated with `opentrons_simulate.py`, a CLI that imports the `simulate` module from the Opentrons
python package

```
$ python opentrons_simulate.py --input <<PYTHON_ROBOT_PROTOCOL>>
```

The simulation output is the same as the one obtained when uploading a protocol to the  [Opentrons App](https://opentrons.com/ot-app/)

Of course you can just use the CLI provided by the Opentrons Python package
  - By calling `opentrons_simulate` one can through the command line simulate any protocol.
    - `usage: opentrons_simulate [-h] [-l {debug,info,warning,error,none}] [-L CUSTOM_LABWARE_PATH] [-D [CUSTOM_DATA_PATH]] [-s CUSTOM_HARDWARE_SIMULATOR_FILE] [-d CUSTOM_DATA_FILE] [-v] [-o {runlog,nothing}] PROTOCOL`

    
## Generator server

To use the generator as the backend of a custom protocol designer, a flask server can be launched from `app.py` exposing
 REST API endpoints:  


| Endpoint  | Type  |  Input |  Output |
|---| ---  | --- | --- |
| `api/1/generator/generate/`  |  POST  |  { protocol: json_instructions -> obj } |  {"protocol": protocol -> str } |
| `api/1/generator/simulate/`  |  POST  |  { protocol: json_instructions -> obj } |  {"simulation": simulation -> str } |

To run the flask app use the following command:

    make run

To test the flask app use the following command:

    make test

### A note on Custom Labware

Opentrons have a set of native labware and accompanying [Labware Library](https://labware.opentrons.com/) containing the
JSON based definitions for each piece of labware. However, there are situations where one wishes to add their own custom 
labware to the deck or to copy and rename the native labwares to match exactly those available in a particular lab.
One example of this is the use of labware mounted on a [BioShake 3000T](https://www.qinstruments.com/automation/bioshake-3000-t/).
This repo contains a set of basic custom labware definitions that must be provided as input to the simulation scripts and
also in the Opentrons app when uploading protocol to the robots.
These definitions can be used as examples to creare new ones


## Contributing

Clone the repo and install all package dependencies in a virtual environment:

    pipenv install

It can be useful to also have the Opentrons App installed for the simulation and testing packages on a physical Opentrons. The App Image can be found at:
    https://opentrons.com/ot-app/

Documentation has been generated using [Doxygen](https://www.doxygen.nl/download.html) and can be run:
    doxygen Doxyfile


Repo has been Formatted according to google style guide using [YAPF](https://github.com/google/yapf)
     yapf . --style google -i -r
And spell-checked using [pyspelling](https://facelessuser.github.io/pyspelling/)
    pyspelling