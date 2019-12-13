import React from 'react';
import Dashboard from '../components/dashboard/Dashboard';
import { withTranslation } from '../i18n';

function content() {
  return (
    <div />
  );
}

function logout({ t }) {
  return <Dashboard t={t} title="Log out" content={content()} menuSelected="logout" user={null} />;
}

logout.getInitialProps = async function () {
  return {
    namespacesRequired: ['common'],
  };
};

export default withTranslation('common')(logout);
