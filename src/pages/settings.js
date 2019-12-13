import React from 'react';
import Dashboard from '../components/dashboard/Dashboard';
import { withTranslation } from '../i18n';

function content() {
  return (
    <div />
  );
}

function settings({ t }) {
  return <Dashboard t={t} title="Settings" content={content()} menuSelected="settings" user={null} />;
}

settings.getInitialProps = async function () {
  return {
    namespacesRequired: ['common'],
  };
};


export default withTranslation('common')(settings);
