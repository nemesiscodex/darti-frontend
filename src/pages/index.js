import React from "react";
import Dashboard from "../components/Dashboard";

function content() {
    return (
        <div >
        </div>
    )
}

function index() {
    return <Dashboard title={"Home"} content={content()} menuSelected={"home"} user={null} />
}

export default index;