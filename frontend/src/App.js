
import * as React from 'react';
import { useEffect, useState } from "react";
import {render} from 'react-dom';
import Map, {Marker, Popup} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Star, Room } from '@material-ui/icons';
import './App.css';
import axios from 'axios';
import {format} from 'timeago.js'

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX; // Set your mapbox token here

function App() {
  const currentUser = "Liyarui";
  console.log("App started");
  const [pins, setPins] = 	useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  useEffect(() => {
    const getPins = async () => {
      try {
        const response = await axios.get("http://localhost:8800/api/pins");
        console.log("Got pins");
        setPins(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
  };

  const handleAddClick = (e) => {
    console.log(e);
  }

  return (
    <Map
      initialViewState={{
        latitude: 46.8,
        longitude: 17.4,
        zoom: 4
      }}
      mapboxAccessToken={MAPBOX_TOKEN}
      style={{width: "100vw", height: "100vh"}}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      onDblClick={handleAddClick}
    >
      {pins.map(p =>(   
      <>   
        <Marker
          latitude={p.lat}
          longitude={p.long}
          onClick={()=>handleMarkerClick(p._id)}
        >
          <Room
            style={{ 
              color: currentUser === p.username ? "tomato" : "slateblue", 
              cursor:"pointer"
            }}
          />
        </Marker>
        {p._id === currentPlaceId && (
          <Popup 
          latitude={p.lat}
          longitude={p.long}
          closeButton={true}
          closeOnClick={false}
          onClose={()=>setCurrentPlaceId(null)}
          anchor="left">
          <div className='card'>
            <label>Place</label>
            <h4 className='place'>{p.title}</h4>
            <label>Review</label>
            <p className='description'>{p.description}</p>
            <label>Rating</label>
            <div className='stars'>
              <Star className='star'/>
              <Star className='star'/>
              <Star className='star'/>
              <Star className='star'/>
              <Star className='star'/>
            </div>
            <label>Information</label>
            <span className='username'>Created by <b>{p.username}</b></span>
            <span className='timestamp'>{format(p.createdAt)}</span>
          </div>
        </Popup>
        )}
      </>
      ))}
      {/* <Popup 
          latitude={}
          longitude={}
          closeButton={true}
          closeOnClick={false}
          onClose={()=>setCurrentPlaceId(null)}
          anchor="left">
        </Popup> */}
    </Map>
  );
}

render(<App />, document.body.appendChild(document.createElement('div')));

export default App;
