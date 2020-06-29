import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navigation.css'

export default function Navigation() {
    return (
        <nav className="nav-bar">
            <div className="nav-top">
                <div className="nav-main">
                    <NavLink to="/batch" activeClassName="active-navlink" className="nav-item"> Classes</NavLink>
                    <NavLink to="/student" className="nav-item">Students</NavLink>                
                    <NavLink to="/evaluation" className="nav-item">Evaluation</NavLink>             
                </div>
            </div>
        </nav>
    )
}
