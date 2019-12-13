import React from 'react';
import Dashboard from '../components/dashboard/Dashboard';
import { withTranslation } from '../i18n';

function content() {
  return (
    <div />
  );
}

function download({ t }) {
  return <Dashboard t={t} title="Download Data" content={content()} menuSelected="download" user={null} />;
}

download.getInitialProps = async function () {
  return {
    namespacesRequired: ['common'],
  };
};


export default withTranslation('common')(download);
