import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import L from "leaflet";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import {
  Card,
  Button,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

var myIcon = L.icon({
  iconUrl:
    "https://cdn3.iconfinder.com/data/icons/iconic-1/32/map_pin_fill-512.png",
  iconSize: [35, 51],
  iconAnchor: [12.5, 41],
  popupAnchor: [5, -45]
});

class App extends Component {
  state = {
    location: {
      lat: 51.505,
      lng: -0.09
    },
    haveUsersLocation: false,
    zoom: 2,
    userMessage: {
      name: "",
      message: ""
    }
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          haveUsersLocation: true,
          zoom: 13
        });
      },
      () => {
        /* needed to be fixed from chrome accesscontrolorigin*/

        console.log("uh oh");
        fetch("https://ipapi.co/json")
          .then(res => res.json())
          .then(location => {
            console.log(location);
            this.setState({
              location: {
                lat: location.latitude,
                lng: location.longitude
              },
              haveUsersLocation: true,
              zoom: 13
            });
          });
      }
    );
  }

  formSubmitted = event => {
    event.preventDefault();
    console.log(this.state.userMessage);
  };

  valueChanged = event => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      userMessage: {
        ...prevState.userMessage,
        [name]: value
      }
    }));
  };

  render() {
    const position = [this.state.location.lat, this.state.location.lng];

    return (
      <div className="map">
        <Map className="map" center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {this.state.haveUsersLocation ? (
            <Marker position={position} icon={myIcon}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          ) : (
            ""
          )}
        </Map>
        <Card body className="message-form">
          <CardTitle> GuestMaps by React</CardTitle>
          <CardText>Leave a message with your location</CardText>
          <Form onSubmit={this.formSubmitted}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                onChange={this.valueChanged}
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="message">Message</Label>
              <Input
                onChange={this.valueChanged}
                type="textarea"
                name="message"
                id="message"
                placeholder="Leave your message"
              />
            </FormGroup>
            <Button color="secondary" disabled={!this.state.haveUsersLocation}>
              Send
            </Button>
          </Form>
        </Card>
      </div>
    );
  }
}

export default App;
