
import * as React from 'react';
import {render} from 'react-dom';
import Map, {Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX; // Set your mapbox token here

function App() {
  return (
    <Map
      initialViewState={{
        latitude: 46.8,
        longitude: 17.4,
        zoom: 4
      }}
      style={{width: "100vw", height: "100vh"}}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      <Marker longitude={17.4} latitude={46.8} color="red" />
    </Map>
  );
}

render(<App />, document.body.appendChild(document.createElement('div')));

export default App;
