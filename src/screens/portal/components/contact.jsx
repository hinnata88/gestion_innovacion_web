import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { sendContactEmail } from '../../../api/systemServices';
import { CustomPopup } from '../../../components';

const Contact = (props) => {
  const initialState = {
    name: '',
    email: '',
    message: ''
  };

  const [t] = useTranslation('translation');
  const [{ name, email, message }, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };
  const clearState = () => setState({ ...initialState });

  const handleSubmit = () => {
    clearState();
    CustomPopup('success', t('contact.message_ok'));

    sendContactEmail(name, email, message);
  };

  return (
    <div>
      <div id="contact">
        <div className="container">
          <div className="col-md-8">
            <div className="row">
              <div className="section-title">
                <h2>{t('contact.title')}</h2>
                <p>{t('contact.description')}</p>
              </div>
              <form name="sentMessage" validate="true">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder={t('contact.field_name')}
                        required
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder={t('contact.field_email')}
                        required
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    id="message"
                    className="form-control"
                    rows="4"
                    placeholder={t('contact.field_message')}
                    required
                    onChange={handleChange}
                  ></textarea>
                  <p className="help-block text-danger"></p>
                </div>
                <div id="success"></div>
                <button type="button" className="btn btn-custom btn-lg" onClick={handleSubmit}>
                  {t('contact.form_button_send')}
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-3 col-md-offset-1 contact-info">
            <div className="contact-item">
              <h3>{t('contact.info')}</h3>
              <p>
                <span>
                  <i className="fa fa-map-marker"></i>
                  {t('contact.info_address')}
                </span>
                {props.data ? props.data.address : 'loading'}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-phone"></i>
                  {t('contact.info_phone')}
                </span>{' '}
                {props.data ? props.data.phone : 'loading'}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-envelope-o"></i>
                  {t('contact.info_email')}
                </span>{' '}
                {props.data ? props.data.email : 'loading'}
              </p>
            </div>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="social">
                <ul>
                  <li>
                    <a href={props.data ? props.data.facebook : '/'}>
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.twitter : '/'}>
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.youtube : '/'}>
                      <i className="fa fa-youtube"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="footer">
        <div className="container text-center">
          <p>
            &copy; 2020 Mil Leguas. Design & Develop{' '}
            {/* <a href="https://github.com/accarbonell1987" rel="nofollow">
              accarbonell
            </a> */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
