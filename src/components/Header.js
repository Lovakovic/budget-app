import React from 'react';
import { NavLink } from 'react-router-dom';

export default () => (
    <header>
        <h1>Budget app</h1>
        <nav>
            <ul>
                <li><NavLink to="/" end={true}>Dashboard</NavLink></li>
                <li> <NavLink to="/create" >Create expense</NavLink></li>
                <li><NavLink to="/help" >Help</NavLink></li>
            </ul>
        </nav>
    </header>
);