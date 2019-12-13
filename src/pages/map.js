import React from 'react';
import Dashboard from '../components/dashboard/Dashboard';
import { withTranslation } from '../i18n';

function content() {
  return (
    <div />
  );
}

function map({ t }) {
  return <Dashboard t={t} title="Map" content={content()} menuSelected="map" user={null} />;
}

map.getInitialProps = async function () {
  return {
    namespacesRequired: ['common'],
  };
};


export default withTranslation('common')(map);
