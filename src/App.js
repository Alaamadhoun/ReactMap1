import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import L from "leaflet";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

var myIcon = L.icon({
  iconUrl:
    "https://cdn3.iconfinder.com/data/icons/iconic-1/32/map_pin_fill-512.png",
  iconSize: [35, 51],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76]
});

class App extends Component {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13
  };
  render() {
    const position = [this.state.lat, this.state.lng];

    return (
      <Map className="map" center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={myIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    );
  }
}

export default App;
