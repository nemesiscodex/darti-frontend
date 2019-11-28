import React from "react";
import Dashboard from "../components/Dashboard";
import { withTranslation } from '../i18n'

function content() {
    return (
        <div >
        </div>
    )
}

function sensors({t}) {
    return <Dashboard t={t} title={"Sensors"} content={content()} menuSelected={"sensors"} user={null} />
}

export default withTranslation('common')(sensors);