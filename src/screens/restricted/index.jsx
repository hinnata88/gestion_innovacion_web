import React from 'react';
import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Restricted = () => {
  const [t] = useTranslation('translation');
  const history = useHistory();

  return (
    <Result
      status="403"
      title="403"
      subTitle={t('restricted.title')}
      extra={
        <Button onClick={() => history.replace('/')} type="primary">
          {t('restricted.button')}
        </Button>
      }
    />
  );
};

export default Restricted;
