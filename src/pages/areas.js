import React from 'react';
import Dashboard from '../components/dashboard/Dashboard';
import { withTranslation } from '../i18n';

function content() {
  return (
    <div />
  );
}

function areas({ t }) {
  return <Dashboard t={t} title="Areas" content={content()} menuSelected="areas" user={null} />;
}

areas.getInitialProps = async function () {
  return {
    namespacesRequired: ['common'],
  };
};


export default withTranslation('common')(areas);
