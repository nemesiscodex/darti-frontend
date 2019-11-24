import React from "react";
import Dashboard from "../components/Dashboard";

function content() {
    return (
        <div >
        </div>
    )
}

function map() {
    return <Dashboard title={"Charts"} content={content()} menuSelected={"charts"} user={null} />
}

export default map;