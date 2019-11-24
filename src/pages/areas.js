import React from "react";
import Dashboard from "../components/Dashboard";

function content() {
    return (
        <div >
        </div>
    )
}

function map() {
    return <Dashboard title={"Areas"} content={content()} menuSelected={"areas"} user={null} />
}

export default map;