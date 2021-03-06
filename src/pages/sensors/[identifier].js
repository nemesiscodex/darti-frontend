import React from 'react';
import Dashboard from '../../components/dashboard/Dashboard';
import { withTranslation } from '../../i18n';

function content(t, sensorData) {
  return (<></>);
}

function newSensor({ t, sensorsData }) {
  return <Dashboard t={t} title={t('Sensors')} content={content(t, sensorsData)} menuSelected="sensors" user={null} />;
}

export default withTranslation('common')(newSensor);
