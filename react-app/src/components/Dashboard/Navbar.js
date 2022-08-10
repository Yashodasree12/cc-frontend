import React from 'react';
import {Nav, NavLink, NavMenu, NavBtn, NavBtnLink} from "./NavbarElements";

function Navbar() {
    const logout =() => {
        localStorage.setItem("authenticated", false);
    }
    return (
        <Nav id="id1">

            <NavMenu>
                <NavBtn><NavBtnLink to="/login" onClick={logout}>LogOut</NavBtnLink></NavBtn>
            </NavMenu>

        </Nav>
    )
}

export default Navbar;