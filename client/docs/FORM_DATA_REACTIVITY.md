# Form Data Reactivity

## Motivation

> More often than not, the users of this web app will come across the following scenairo:
>
> They setup a protocol on the web app, only to realize that they need to make changes to some property of the protocol. However, a number of other properties might be dependent on that property - so they will also have to be updated if a change is made to the their parent property.
>
> Fortunately, the Über user will have realized this and made corresponding changes to all properties (a list that can be arbritrarily long depending on the complexity of the protocol) that have the changed property as a parent dependency.
>
> However, we aren't all Über users all the time.
>
> Hence, provision has to be made for when the user doesn't realize that they also have to effect corresponding changes to properties affected by their change.
>
> Changes in dependencies have to be propagated automatically.

## Strategy

> I found it useful to think of these dependency relationships between properties in the protocol object as relationships between "sources" and "sinks".
>
> Following this reasoning, the dependency relationships can be viewed as a one-to-many mapping between "sources" and "sinks".
>
> This mapping can then be used to look up (in constant time) which "sinks" need to be updated when there is a change to their "source".
>
> In the current protocol schema the following properties can be classified as these "sources":
>
> - Deck slots
> - Liquid classes
> - Sequences
>
> Further, the following properties can be classified as these "sinks":
>
> - Deck pipettes and tipracks
> - The "slot" property of sequence locations
> - Select properties of the transfer steps (eg. "slot", "liquid class", and "sequence")

## Implementation

> Following this train of thought, the dependency relationships for a protocol can be implemented in code as an `array of objects` (each of which represent a one-to-one mapping between a source and a sink).
> The following code snippet describes the structure of this object:
>
> ```
> {
>     sink: null,				// The parent category of the sink property (eg. simple transfer step)
>     sink_hash: null,			// The unique identifier of the parent object containing the sink property
>     sink_ppty: null,			//The specific property of within the parent category that corresponds to the sink property (eg. slot)
>     source: null,				// The parent category of the source property (eg. sequence)
>     source_hash: null,		// The unique identifier of the parent object containing the source property
>     atype: null,				// The store action to be dispatched to propagate a change in the source property to the sink property
> }
> ```
>
> For full functionality, an Vue action is created for each category of sink properties.
>
> This enables them to be updated when a change is made to their source properties.
>
> So, it is logical to include a reference to this action in the dependency object. As this enables the dependency object to become the single source of truth for all data required to propagate a change between a source and a sink property.
>
> Currently, this array of dependency objects is generated each time the user views a protocol in the protocol editor.
>
> Further, when it is updated with new entries when new properties (that happen to be sinks eg. the sequence in a sequence transfer step) are added to the protocol.
>
> Subsequently, when the user makes a change to a property (that happens to be a source eg. a deck slot):
>
> - Some logic goes through the dependency array in search of objects that have the property registered as a source
> - Then it dispatches the referenced actions within these objects with payload containing the change to be propagated.
