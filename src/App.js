import React, { useState, useEffect} from "react";
import ReactMapGL, {Marker, Popup} from "react-map-gl"
import canyonData from "./data/canyonData.json"
import Navbar from "./components/Navbar.js"
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


const notes = [
    {title: "notes-chem-weathering", url: "http://domfernando319.github.io/eas2600-project/notesImages/notes-chem-weathering.png"},
    {title: "notes-erosion", url: "http://domfernando319.github.io/eas2600-project//notesImages/notes-erosion.png"},
    {title: "notes-geoprovinces", url: "http://domfernando319.github.io/eas2600-project//notesImages/notes-geoprovinces.png"},
    {title: "notes-masswasting", url: "http://domfernando319.github.io/eas2600-project//notesImages/notes-masswasting.png"},
    {title: "notes-unconformity", url: "http://domfernando319.github.io/eas2600-project//notesImages/notes-unconformity.png"},
    {title: "notes-watertable", url: "http://domfernando319.github.io/eas2600-project//notesImages/notes-watertable.jpg"},
    {title: "Amber Edington 2022", url: "http://domfernando319.github.io/eas2600-project//sliderImages/amberedington2022.jpg"},
    {title: "Canyon", url: "http://domfernando319.github.io/eas2600-project//sliderImages/canyon.jpg"},
    {title: "Danstily Gualong 2022", url: "http://domfernando319.github.io/eas2600-project//sliderImages/danstilygualong2022.jpg"},
    {title: "Richard Blackburn 2016", url: "http://domfernando319.github.io/eas2600-project//sliderImages/richardblackburn2016.jpg"},
    {title: "Soil Horizons", url: "http://domfernando319.github.io/eas2600-project//sliderImages/soilhorizons.jpg"},
    {title: "Tammy Alvarez 2022", url: "http://domfernando319.github.io/eas2600-project//sliderImages/tammyalvarez2022.jpg"},
    {title: "Unconformity", url: "http://domfernando319.github.io/eas2600-project//sliderImages/unconformity.jpg"},
    {title: "Wesley Johnson 2019", url: "http://domfernando319.github.io/eas2600-project//sliderImages/wesleyjohnson2019.jpg"}
]


const containerStyles = {
    width: '500px',
    height: '300px',
    margin: '0 auto'

}

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
                    <img src = "https://upload.wikimedia.org/wikipedia/commons/1/19/Font_Awesome_5_solid_hiking.svg" alt = "Hiker Icon" width={"15px"}/>
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
        <div style = {containerStyles}>
            <ImageSlider slides = {notes} className = "slider"/>
        </div>
    </div>
  )
}

