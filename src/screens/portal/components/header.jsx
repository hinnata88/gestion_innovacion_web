import React from 'react';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const [t] = useTranslation('translation');

  const title = t('portal_header.title');
  const paragraph = t('portal_header.paragraph');
  const learnMore = t('portal_header.learnMore');

  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1>
                  {title}
                  <span></span>
                </h1>
                <p>{paragraph}</p>
                <a href="#features" className="btn btn-custom btn-lg page-scroll">
                  {learnMore}
                </a>{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
