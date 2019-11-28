import React from "react";
import Dashboard from "../components/Dashboard";
import { withTranslation } from '../i18n'

function content() {
    return (
        <div >
        </div>
    )
}

function map({t}) {
    return <Dashboard t={t} title={"Map"} content={content()} menuSelected={"map"} user={null} />
}

export default withTranslation('common')(map);