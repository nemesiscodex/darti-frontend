import React from 'react';
import Dashboard from '../components/dashboard/Dashboard';
import { withTranslation } from '../i18n';

function content() {
  return (
    <div />
  );
}

function users({ t }) {
  return <Dashboard t={t} title="Users" content={content()} menuSelected="users" user={null} />;
}

users.getInitialProps = async function () {
  return {
    namespacesRequired: ['common'],
  };
};


export default withTranslation('common')(users);
