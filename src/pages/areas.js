import React from "react";
import Dashboard from "../components/Dashboard";

function content() {
    return (
        <div >
        </div>
    )
}

function areas() {
    return <Dashboard title={"Areas"} content={content()} menuSelected={"areas"} user={null} />
}

export default areas;