import React from "react";
import Dashboard from "../components/Dashboard";

function content() {
    return (
        <div >
        </div>
    )
}

function users() {
    return <Dashboard title={"Users"} content={content()} menuSelected={"users"} user={null} />
}

export default users;