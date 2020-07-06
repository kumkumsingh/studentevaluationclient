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
                    <NavLink to="/profile" className="nav-item"><img className="nav-icon" src="/user.png" alt="profile"></img>Profile</NavLink> 
                    <NavLink to="/batch" activeClassName="active-navlink" className="nav-item"><img className="nav-icon" src="/team.png" alt="team"></img>Batches</NavLink>  
                    {/* <NavLink to="/login" className="nav-item"><img className="nav-icon" src="/login.png" alt="login"></img>Login</NavLink>   */}
                    <div className="nav-item logout" onClick={handleLogout}><img className="nav-icon" src="/logout.png" alt="logout"></img>Logout</div>       
                </div>
            </div>
        </nav>
    )
}
