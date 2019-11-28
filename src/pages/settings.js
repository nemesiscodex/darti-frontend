import React from "react";
import Dashboard from "../components/Dashboard";
import { withTranslation } from '../i18n'

function content() {
    return (
        <div >
        </div>
    )
}

function settings({t}) {
    return <Dashboard t={t} title={"Settings"} content={content()} menuSelected={"settings"} user={null} />
}

export default withTranslation('common')(settings);