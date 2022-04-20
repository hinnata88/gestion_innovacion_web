import React from 'react';
import { useTranslation } from 'react-i18next';

const Services = () => {
  const [t] = useTranslation('translation');

  const _services = t('portal_navigation.services');

  const statics = [
    // {
    //   "icon": "fa fa-wordpress",
    //   "name": "Lorem ipsum dolor",
    //   "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at."
    // },
    // {
    //   "icon": "fa fa-cart-arrow-down",
    //   "name": "Consectetur adipiscing",
    //   "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at."
    // },
    // {
    //   icon: 'fa fa-cloud-download',
    //   name: t('portal_therapy.t1.name'),
    //   text: t('portal_therapy.t1.text')
    // },
    {
      icon: 'fa fa-language',
      name: t('portal_therapy.t2.name'),
      text: t('portal_therapy.t2.text')
    },
    {
      icon: 'fa fa-plane',
      name: t('portal_therapy.t3.name'),
      text: t('portal_therapy.t3.text')
    },
    {
      icon: 'fa fa-pie-chart',
      name: t('portal_therapy.t4.name'),
      text: t('portal_therapy.t4.text')
    }
  ];

  return (
    <div id="services" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>{_services}</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed dapibus leonec.</p>
        </div>
        <div className="row">
          {statics
            ? statics.map((d, i) => (
                <div key={`${d.name}-${i}`} className="col-md-4">
                  {' '}
                  <i className={d.icon}></i>
                  <div className="service-desc">
                    <h3>{d.name}</h3>
                    <p>{d.text}</p>
                  </div>
                </div>
              ))
            : 'Loading'}
        </div>
      </div>
    </div>
  );
};

export default Services;
