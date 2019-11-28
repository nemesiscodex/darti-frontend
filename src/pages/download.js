import React from "react";
import Dashboard from "../components/Dashboard";
import { withTranslation } from '../i18n'

function content() {
    return (
        <div >
        </div>
    )
}

function download({t}) {
    return <Dashboard t={t} title={"Download Data"} content={content()} menuSelected={"download"} user={null} />
}

export default withTranslation('common')(download);