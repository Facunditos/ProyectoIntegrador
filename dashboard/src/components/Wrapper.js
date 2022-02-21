import React from "react";
import MainContent from "./MainContent";
import Footer from "./Footer";
function Wrapper () {
    return (
        <div id="content-wrapper" className="d-flex flex-column">
            <MainContent/>
            <Footer/>
        </div>
    )
}

export default Wrapper