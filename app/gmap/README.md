
# MapId
- Customize your map style see [here](https://zenn.dev/mapbox_japan/articles/3c08f8e7b37f9a)

# Place widgets

Youtube video [Google Maps Place Autocomplete Widget](https://www.youtube.com/watch?v=c3MjU9E9buQ)


# Marker

React-wrapper documentation for [marker](https://visgl.github.io/react-google-maps/docs/api-reference/components/marker)
- Example can be found [here](https://github.com/visgl/react-google-maps/blob/main/examples/markers-and-infowindows/src/app.tsx)
    - ControlPanel in the src is just a wrapper to make the example more readable

## Marker Label 

- Check [here](https://developers.google.com/maps/documentation/javascript/examples/marker-labels) for the usage with `<Map>`

- Note that Marker (`<Marker>` for react-wrapper) will be deprecated in the future. Use `AdvancedMarker` instead.
    - Check the [document](https://visgl.github.io/react-google-maps/docs/api-reference/components/advanced-marker)
    - Basically you can render anything inside the marker.
        - You don't need to use <pin> e.g.
        ```TypeScript
        <AdvancedMarker
          position={{lat: 30, lng: 10}}
          title={'AdvancedMarker with custom html content.'}>
          <div
            style={{
              width: 16,
              height: 16,
              position: 'absolute',
              top: 0,
              left: 0,
              background: '#1dbe80',
              border: '2px solid #0e6443',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)'
            }}></div>
        </AdvancedMarker>
        ```