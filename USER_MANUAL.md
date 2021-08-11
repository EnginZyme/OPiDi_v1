# Manual: Opentrons Protocol Designer

You can create, view, and edit Opentrons protocols with this app.

## Step 1: Open the Opentrons Protocol Designer App

1. On your computer, open the EnginZyme [automation portal](http://lab.enginzyme.com/).
2. Find the Protocol Designer app.
3. Click the “Open” button.
4. Sign in with your EnginZyme Google account.

## Step 2: Get Started

### Create a new protocol

[Image: client/public/assets/image (17).png]
1. In the app homepage, click on the “Create New” button you see on the side panel to the left to show the “Create New Protocol” form.
2. Next, fill in the name and description of the protocol to be created in the form.
3. Finally, click on the “Create New” button in the form to create a the protocol. 

**Note**: the referenced “Create New” button will be disabled if either of the name or description fields is empty.

### View existing protocols

[Image: client/public/assets/image (18).png]
1. In the app homepage, click on the “Explore” button you see on the side panel to the left to show the “Protocols” panel.
2. To view your protocols, click on the “My Protocols” tab by the left of the “Protocols” panel.
3. To view protocols shared by other users, click on the “Shared Protocols” tab by the left of the “Protocols” panel.
4. To filter the protocol list in search of a protocol, type your keywords into the search bar on the top of the “Protocols” panel.
5. You can click on any protocol card listed to edit it in the protocol editor.

### Update a protocol’s metadata

[Image: client/public/assets/image (19).png]
1. In the protocol editor, click on the “Meta Data” button on the side panel to the left to show the “Protocol Meta-Data” form.
2. You can update the “Name” and “Description” fields in the “Protocol Meta-Data” form.
3. You can share a protocol (or not) with other users via the “Share Status” dropdown.

**Note**: The steps above require that you save the protocol to persist the change(s) you make.

1. You can promote a protocol from being “In Development” to “Verified” via the appropriately name button at the top of the “Protocol Meta-Data” form.

**Note**: Step 4 is irreversible and restricts you from saving further changes to the protocol or deleting the protocol. All you can do afterwards is clone the protocol.

### Setup a protocol’s robot deck

[Image: client/public/assets/image (20).png][Image: client/public/assets/image (21).png]
1. In the protocol editor, click on the “Deck” button on the side panel to the left to show the “Deck Setup” view.
2. You can set the robot manufacturer via the “Device Type” dropdown (only Opentrons for now 🙂).
3. In the “Deck Layout” subsection, you can click on slots to add, remove, or edit labware.
4. In the “Pipettes” subsection, you can select the pipette type for the left and right pipettes.
5. Further, in the “Pipettes” subsection, you can select the slot indices where tip racks for the left and right pipettes are set.

**Note**: The steps above require that you save the protocol to persist the change(s) you make.

### Manage a protocol’s location sequences

[Image: client/public/assets/image (22).png]
1. In the protocol editor, click on the “Sequences” button on the side panel to the left to show the “Sequences” view.
2. To create a location sequence, you have to click on the “Add Sequence” button in the location sequences page.
3. To edit the data of a location sequence, you have to click on it and edit the corresponding “Location Sequence” form.
4. You have the option to copy and/or delete previously created location sequences with the buttons displaying the corresponding icons in the location sequences page.
5. To create a location within a location sequence, you have to click on the “Add location” button for the location sequence in context.
6. To edit a location within a location sequence, you have to click on it and edit the corresponding “Location” form.
7. You also have the option to copy and/or delete previously created locations with the buttons displaying the corresponding icons in the location sequences page.

### Manage a protocol’s liquid classes

[Image: client/public/assets/image (23).png]
1. In the protocol editor, click on the “Config” button on the side panel to the left to show the “Config.” view.
2. Next, you have to click on the “Liquid Classes” tab button on the left to view the liquid classes page.
3. To create a liquid class, you have to click on the “Add New” button in the liquid classes page.
4. To edit the data of a liquid class, you have to click on it and edit the corresponding form to the right.
5. You have the option to copy and/or delete previously created liquid classes with the buttons displaying the corresponding icons in the liquid classes page.

**NB**: The “Default” liquid class is available in all newly protocols by default. When you need to make a change to this liquid class, its best to create a new liquid class and make the changes there instead.

### Download the current labware definition folder

[Image: client/public/assets/image (24).png]
1. In the protocol editor, click on the “Config” button on the side panel to the left to show the “Config.” view.
2. Next, you have to click on the “Labwares” tab button to the left to view the labwares page.
3. To download the current labware definition folder, you have to click on the “Get Labwares” button in this page.

### Manage a protocol’s steps

[Image: client/public/assets/image (25).png]
1. In the protocol editor, click on the “Steps” button on the side panel to the left to show the “Steps” view.
2. You can create a new protocol step by clicking on the “Add Step” button.
3. To edit the data of a protocol step, you have to click on it and edit the corresponding form to the right.
4. You have the option to copy and/or delete previously created protocol steps with with the buttons displaying the corresponding icons in the steps page.
5. You can change the ordering of the protocol steps by dragging them around.

**NB**: The ordering of the protocol steps matters to the execution of the protocol on the robot.

### Simulate a protocol

[Image: client/public/assets/image (26).png]
1. In the protocol editor, click on the “Generate” button on the side panel to the left to show the “Generate” view.
2. You can simulate the current protocol by clicking on the “Preview Steps” button.
3. When complete, the status of the protocol simulation will be indicated via a pop-up at the top-right side of the page.
4. If successful, you should be able to see information on the protocol simulation listed in the same page.

### Generate the Opentrons robot file for a protocol

[Image: client/public/assets/image (27).png]
1. In the protocol editor, click on the “Generate” button on the side panel to the left to show the “Generate” view.
2. You are required to simulate the open protocol before carrying on with the next step. Otherwise, you get an error message.
3. You can generate and download the Opentrons robot file for the open protocol by clicking on the “Get Robot Protocol” button in the page.
4. When complete, the status of the robot protocol file generation will be indicated via a pop-up at the top-right side of the page.

### Save changes made to a protocol

[Image: client/public/assets/image (28).png]
1. To save changes made to a protocol in the protocol editor, you have to click on the save button (displays the file icon) on the side panel to the left.
2. Next, you have to confirm your action in the dialog that pops up.

### Clone a protocol

[Image: client/public/assets/image (29).png]
1. To delete a protocol open in the protocol editor, you have to click on the clone button (displays the copy icon) on the side panel to the left.
2. Next, you have confirm your action in the dialog that pops up.

### Delete a protocol

[Image: client/public/assets/image (30).png]
1. To delete a protocol open in the protocol editor, you have to click on the delete button (displays the delete icon) on the side panel to the left.
2. Next, you have confirm your action in the dialog that pops up.

### Export a protocol

[Image: client/public/assets/image (31).png]
1. In the protocol editor, click on the “Generate” button on the side panel to the left to show the “Generate” view.
2. You can export the file for the open protocol by clicking on the “Get Protocol Design File” button in the page.

**NB**: You are able to import this file later into the app.

### Load an exported protocol

[Image: client/public/assets/image (32).png]
1. In the app homepage, you are able to click on the “Import” button on the side panel to the left to import a previously exported protocol.

### Sign out of the app

[Image: client/public/assets/image (33).png]
1. On the left side panel, where you have your Google account avatar displayed, you can click on that avatar to view the sign-out form.
2. To sign-out, you have to click on the “Sign Out” button in this form.

