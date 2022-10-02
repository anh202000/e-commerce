import React from "react";
import NavBar from "./NavBar";
import Notify from "./Notify";
import Modal from "./Modal";

function Layout({ children }) {
    return (
        <div>
            <div className="container">
                <NavBar />
            </div>

            <p class="line-hight"></p>
            
            <div className="container">
                <Notify />
                <Modal />
                {children}
            </div>
        </div>
    );
}

export default Layout;
