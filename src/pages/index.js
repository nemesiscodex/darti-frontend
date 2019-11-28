import React from "react";
import Dashboard from "../components/Dashboard";
import { withTranslation } from '../i18n'

function content() {
    return (
        <div >
        </div>
    )
}

function index({t}) {
    return <Dashboard t={t} title={t("Home")} content={content()} menuSelected={"home"} user={null} />
}

export default withTranslation('common')(index);