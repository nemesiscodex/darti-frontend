import React from "react";
import Dashboard from "../components/Dashboard";

function content() {
    return (
        <div >
        </div>
    )
}

function map() {
    return <Dashboard title={"Download Data"} content={content()} menuSelected={"download"} user={null} />
}

export default map;