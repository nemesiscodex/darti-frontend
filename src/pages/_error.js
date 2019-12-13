import React from 'react';
import Error from 'next/error';
import Dashboard from '../components/dashboard/Dashboard';
import { withTranslation } from '../i18n';

function ErrorPage({ t, statusCode }) {
  return (
    <Dashboard
      t={t}
      title="Error"
      content={(
        <Error statusCode={statusCode} />
  )}
      user={null}
    />
  );
}

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  const namespacesRequired = ['common'];
  return { statusCode, namespacesRequired };
};

export default withTranslation('common')(ErrorPage);
