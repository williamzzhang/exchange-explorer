
import * as React from 'react';
import { useEffect, useState } from "react";
import {render} from 'react-dom';
import Map, {Marker, Popup, NavigationControl, ScaleControl, AttributionControl, GeolocateControl} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Star, Room } from '@material-ui/icons';
import './App.css';
import axios from 'axios';
import {format} from 'timeago.js'

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX; // Set your mapbox token here

function App() {
  
  const currentUsername = "William";
  console.log("App started");
  const [pins, setPins] = 	useState([]);
  // const [showPopup, setShowPopup] = useState(null);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDesc] = useState(null);
  const [rating, setRating] = useState(0);
  const [viewState, setViewState] = useState({
      latitude: 47,
      longitude: 17,
      zoom: 4,
  });
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

  const handleMarkerClick = (id, lat, long, viewState) => {
    setCurrentPlaceId(id);
    setViewState({ ...viewState, latitude: lat, longitude: long });
  };

  const handleAddClick = (e) => {
    // console.log(e);

    const longitude  = e.lngLat.lng;
    const latitude  = e.lngLat.lat;

    setNewPlace({
      lat: latitude,
      long: longitude,
    });
  };

  const handleGeoLocate = (e) => {
    console.log(e);

    const longitude  = e.coords.longitude;
    const latitude  = e.coords.latitude;

    console.log(latitude)
    console.log(longitude)

    // setShowPopup({
      
    //   lat: latitude,
    //   long: longitude,
    // });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newPin = {
      username: currentUsername,
      title,
      description,
      rating,
      lat:newPlace.lat,
      long:newPlace.long,
    }

    try {
      const res = await axios.post("http://localhost:8800/api/pins", newPin);
      setPins([...pins, res.data])
      setNewPlace(null)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Map
      // {...viewState}
      initialViewState={viewState}
      mapboxAccessToken={MAPBOX_TOKEN}
      style={{width: "100vw", height: "100vh"}}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      onDblClick={handleAddClick}
    >
      <AttributionControl 
        customAttribution="Built by William Zhang"
        position='bottom-right' 
      />
      <NavigationControl position='bottom-right'/>
      <ScaleControl position='bottom-left'/>
      <GeolocateControl 
        onGeolocate={handleGeoLocate}
        position='bottom-right'
        // onError={}
      />


      {pins.map(p =>(   
      <>   
        <Marker
          latitude={p.lat}
          longitude={p.long}
          offsetLeft={-3.5 * viewState.zoom}
          offsetTop={-7 * viewState.zoom}
        >
          <Room
            style={{ 
              fontSize: 7 * viewState.zoom,
              color: 
                currentUsername === p.username ? "crimson" : "darkcyan", 
              cursor:"pointer"
            }}
            onClick={()=>handleMarkerClick(p._id, p.lat, p.long, viewState)}
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
              {Array(p.rating).fill(<Star className='star'/>)}
            </div>
            <label>Information</label>
            <span className='username'>Created by <b>{p.username}</b></span>
            <span className='timestamp'>{format(p.createdAt)}</span>
          </div>
        </Popup>
        )}
      </>
      ))}
      {newPlace && (      
        <Popup 
          latitude={newPlace.lat}
          longitude={newPlace.long}
          closeButton={true}
          closeOnClick={false}
          onClose={()=>setNewPlace(null)}
          anchor="left"
        >
          <div>
            <form onSubmit={handleSubmit}>
              <label>Title</label>
              <input 
                placeholder='Enter a title' 
                onChange={(e) => setTitle(e.target.value)}
                />
              <label>Review</label>
              <textarea 
                placeholder='Say something about this place'
                onChange={(e) => setDesc(e.target.value)}
              />
              <label>Rating</label>
              <select onChange={(e) => setRating(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button className= "submitButton" type="submit">Add Pin</button>
            </form>
          </div>
        </Popup>
      )}
      <button className='button logout'>Log out</button>
      <div className='buttons'>
        <button className='button login'>Login</button>
        <button className='button register'>Register</button>
      </div>
      {/* {showPopup && (
        <Popup 
          longitude={showPopup.long} 
          latitude={showPopup.long}
          anchor="top"
          onClose={() => setShowPopup(null)}>
          You are here
        </Popup>)} */}
    </Map>
  );
}

render(<App />, document.body.appendChild(document.createElement('div')));

export default App;
