import React from 'react'
import "./Navbar.css"

const Navbar = () => {
  return (
    <div>
        <nav className='navbar'>
            <img src= "/website-logo.png" alt = "Navbar" class = "logo"/>
            <p>Providence Canyon State Park Interactive Map</p>
            <p>Dom Fernando Andy Velez</p>
        </nav>
    </div>
  )
}

export default Navbar