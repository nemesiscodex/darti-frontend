import React from "react";
import Dashboard from "../components/Dashboard";

function content() {
    return (
        <div >
        </div>
    )
}

function map() {
    return <Dashboard title={"Map"} content={content()} menuSelected={"map"} user={null} />
}

export default map;