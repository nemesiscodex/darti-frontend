import React from "react";
import Dashboard from "../components/Dashboard";

function content() {
    return (
        <div >
        </div>
    )
}

function logout() {
    return <Dashboard title={"Log out"} content={content()} menuSelected={"logout"} user={null} />
}

export default logout;