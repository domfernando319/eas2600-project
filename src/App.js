import React, { useState, useEffect} from "react";
import ReactMapGL, {Marker, Popup} from "react-map-gl"
import canyonData from "./data/canyonData.json"
import Navbar from "./components/Navbar.js"
import Foot from "./components/Foot";
import "./App.css"
//import { Link, NavLink } from "react-router-dom";
import ImageSlider from "./components/ImageSlider";

export default function App() {
const [viewport, setViewport] = useState({
  latitude: 32.062497,
  longitude: -84.92,
  width: "100%",
  height: "55vh",
  zoom: 14.6
});

const [selectedFeature, setSelectedFeature] = useState(null); 
const slides = [
    {},
    {},
    {},
    {}
]

useEffect(() => {
    const listener = e => {
        if (e.key === "Escape") {
            setSelectedFeature(null);
        }
    };
    window.addEventListener("keydown", listener);

    return () => {
        window.removeEventListener("keydown", listener);
    }
}, [])
return (
    <div className="gradient_bg">
        <Navbar className = "nav"/>
        <div></div>
        <div className = "map-window">
            <ReactMapGL 
            {...viewport}
            mapboxApiAccessToken = {process.env.REACT_APP_MAPBOX_TOKEN}
            mapStyle = "mapbox://styles/mapbox/outdoors-v11" // "mapbox://styles/mapbox/satellite-v9"
            onViewportChange = {viewport => {
                setViewport(viewport);
            }}
            >
            {canyonData.features.map(feature => (
                <Marker
                    key = {feature.properties.id} 
                    latitude = {feature.geometry.coordinates[0]} 
                    longitude = {feature.geometry.coordinates[1]}>
                    <button className = "marker-btn" onClick = {(e) => {
                        e.preventDefault();
                        setSelectedFeature(feature);
                    }}>
                    <img src = "/hiker.png" alt = "Hiker Icon" width={"15px"}/>
                    </button>   
                </Marker>
            ))}
            {selectedFeature ? (
                <Popup 
                    className="popup"
                    closeOnClick = {false}
                    closeOnMove = {true}
                    latitude = {selectedFeature.geometry.coordinates[0]} 
                    longitude = {selectedFeature.geometry.coordinates[1]}
                    onClose={() => {
                        setSelectedFeature(null);
                    }}
                    >
                    <img src={require(`${selectedFeature.properties.media}`)} alt="Popup Image" className="popup-image"/>                        
                    <div>
                        <h1>{selectedFeature.properties.name}</h1>
                        <ul>
                            {
                                selectedFeature.properties.description.map(fact => (
                                    <li>{fact}</li>
                                )
                                )
                            }
                        </ul>
                            <button onClick={() => {
                                window.open(selectedFeature.properties.addResource)
                            }}>Read more</button>                        
                    </div>
                </Popup>
            ) : null }
            </ReactMapGL> 
        </div>
        <Foot/>
        <ImageSlider slides = {slides}/>
    </div>
  )
}

