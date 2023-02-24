import React from "react"

export default function Header() {
    return (
        <header className="header">
            <img 
                src="./level3.png" 
                className="header--image"
                alt="logo"
            />
            <h2 className="header--title">Meme Generator</h2>
            <h4 className="header--project">Level 3 Group Project</h4>
        </header>
    )
}