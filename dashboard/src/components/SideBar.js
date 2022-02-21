import React from "react";

import image from '../assets/images/user.svg'
import {Link,Route,Routes} from 'react-router-dom'
import Wrapper from './Wrapper'
import Users from "./Users";


function SideBar () {
    return (
       <div id="wrapper">
           {/* <!-- Sidebar --> */}
			<ul className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar">

				{/* <!-- Sidebar - Brand --> */}
				<a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
					<div className="sidebar-brand-icon">
						<p>VIINO</p>
					</div>
				</a>

				{/* <!-- Divider --> */}
				<hr className="sidebar-divider my-0"/>

				{/* <!-- Nav Item - Dashboard --> */}
				<li className="nav-item active">
					<a className="nav-link" href="/">
						<i className="fas fa-fw fa-tachometer-alt"></i>
						<span>Dashboard - VIINO</span></a>
				</li>

				{/* <!-- Divider --> */}
				<hr className="sidebar-divider"/>

				{/* <!-- Heading --> */}
				<div className="sidebar-heading">Actions</div>

				{/* <!-- Nav Item - Pages --> */}
				<li className="nav-item">
					<Link to="/" className="nav-link collapsed">
						<i className="fas fa-fw fa-folder"></i>
						<span>Paneles </span>
					</Link>
				</li>

				<li className="nav-item">
					<Link to="/users" className="nav-link collapsed">
						<i className="fas fa-fw fa-folder"></i>
						<span>Usuarios </span>
					</Link>
				</li>

				{/* <!-- Nav Item - Charts --> */}
				<li className="nav-item">
					<a className="nav-link" href="/">
						<i className="fas fa-fw fa-chart-area"></i>
						<span>Charts</span>
					</a>
				</li>

				{/* <!-- Nav Item - Tables --> */}
				<li className="nav-item">
					<a className="nav-link" href="/">
						<i className="fas fa-fw fa-table"></i>
						<span>Tables</span></a>
				</li>

				{/* <!-- Divider --> */}
				<hr className="sidebar-divider d-none d-md-block"/>
			</ul>
		{/* <!-- End of Sidebar --> */}
		
			<Routes>  
				<Route exact path='/' element={<Wrapper />}/>
				<Route exact path='/users' element={<Users/>}/>
			</Routes>
       </div>
    )
}

export default SideBar