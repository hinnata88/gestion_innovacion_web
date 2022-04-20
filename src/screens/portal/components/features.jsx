import React from 'react';
import { useTranslation } from 'react-i18next';

const Features = () => {
  const [t] = useTranslation('translation');

  const statics = [
    {
      icon: 'fa fa-comments-o',
      title: t('portal_features.f1.title'),
      text: t('portal_features.f1.description')
    },
    {
      icon: 'fa fa-bullhorn',
      title: t('portal_features.f2.title'),
      text: t('portal_features.f2.description')
    },
    {
      icon: 'fa fa-group',
      title: t('portal_features.f3.title'),
      text: t('portal_features.f3.description')
    },
    {
      icon: 'fa fa-magic',
      title: t('portal_features.f4.title'),
      text: t('portal_features.f4.description')
    }
  ];

  const _feature = t('portal_navigation.features');

  return (
    <div id="features" className="text-center">
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>{_feature}</h2>
        </div>
        <div className="row">
          {statics
            ? statics.map((d, i) => (
                <div key={`${d.title}-${i}`} className="col-xs-6 col-md-3">
                  {' '}
                  <i className={d.icon}></i>
                  <h3>{d.title}</h3>
                  <p>{d.text}</p>
                </div>
              ))
            : 'Loading...'}
        </div>
      </div>
    </div>
  );
};

export default Features;
