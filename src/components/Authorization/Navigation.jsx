import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navigation.css'
import AuthService from '../../service/AuthService'

export default function Navigation(props) {
    const handleLogout = () => {
       const service = new AuthService();
       service.logout()
       .then(() => {
           props.history.push("/login")
       })
    }
    return (
        <nav className="nav-bar">
            <div className="nav-top">
                <div className="nav-main">
                    <NavLink to="/profile" className="nav-item">Profile</NavLink> 
                    <NavLink to="/batch" activeClassName="active-navlink" className="nav-item"> Classes</NavLink>
                    <NavLink to="/student" className="nav-item">Students</NavLink>                
                    <NavLink to="/evaluation" className="nav-item">Evaluation</NavLink>      
                    <div className="nav-item" onClick={handleLogout}>Logout</div>       
                </div>
            </div>
        </nav>
    )
}
