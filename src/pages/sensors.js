import React from "react";
import Dashboard from "../components/Dashboard";

function content() {
    return (
        <div >
        </div>
    )
}

function map() {
    return <Dashboard title={"Sensors"} content={content()} menuSelected={"sensors"} user={null} />
}

export default map;