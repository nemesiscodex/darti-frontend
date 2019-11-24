import React from "react";
import Dashboard from "../components/Dashboard";

function content() {
    return (
        <div >
        </div>
    )
}

function settings() {
    return <Dashboard title={"Settings"} content={content()} menuSelected={"settings"} user={null} />
}

export default settings;