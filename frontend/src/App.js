
import * as React from 'react';
import {render} from 'react-dom';
import Map, {Marker, Popup} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Star } from '@material-ui/icons';
import "./App.css";

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
      <Marker
        latitude={46.8}
        longitude={17.4}
        color="red"
      >
      </Marker>
      <Popup 
        latitude={46.8}
        longitude={17.4} 
        anchor="left">
        <div className='card'>
          <label>Place</label>
          <h4 className='place'><b>Berlin Wall</b></h4>
          <label>Review</label>
          <p className='description'>Beautiful place. I loved visiting.</p>
          <label>Rating</label>
          <div className='stars'>
            <Star className='star'/>
            <Star className='star'/>
            <Star className='star'/>
            <Star className='star'/>
            <Star className='star'/>
          </div>
          <label>Information</label>
          <span className='username'>Created by <b>William</b></span>
          <span className='timestamp'>1 hour ago</span>
        </div>
      </Popup>
    </Map>
  );
}

render(<App />, document.body.appendChild(document.createElement('div')));

export default App;
