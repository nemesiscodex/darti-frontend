import React from 'react';
import Dashboard from '../components/dashboard/Dashboard';
import { withTranslation } from '../i18n';

function content() {
  return (
    <div />
  );
}

function index({ t }) {
  return <Dashboard t={t} title={t('Home')} content={content()} menuSelected="home" user={null} />;
}

index.getInitialProps = async function () {
  return {
    namespacesRequired: ['common'],
  };
};


export default withTranslation('common')(index);
