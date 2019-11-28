import React from "react";
import Dashboard from "../components/Dashboard";
import { withTranslation } from '../i18n'

function content() {
    return (
        <div >
        </div>
    )
}

function users({t}) {
    return <Dashboard t={t} title={"Users"} content={content()} menuSelected={"users"} user={null} />
}

export default withTranslation('common')(users);