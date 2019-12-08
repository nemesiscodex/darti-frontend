import React from 'react';
import Dashboard from '../components/Dashboard';
import { withTranslation } from '../i18n';

function content() {
  return (
    <div />
  );
}

function logout({ t }) {
  return <Dashboard t={t} title="Log out" content={content()} menuSelected="logout" user={null} />;
}

export default withTranslation('common')(logout);
