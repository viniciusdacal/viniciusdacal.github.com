import React, { useState } from 'react';
import addToMailchimp from 'gatsby-plugin-mailchimp';

import './SubscribeForm.css';

const initialValues = () => ({
  name: '',
  email: '',
});

const initialForm = () => ({
  submitting: '',
  error: '',
});

const SubscribeForm = ({ language }) => {
  const [form, setForm] = useState(initialForm);
  const [values, setValues] = useState(initialValues);

  const onSubmit = async e => {
    e.preventDefault();
    if (!values.email || !values.name) {
      return;
    }
    const nform = {
      submitting: true,
      error: '',
      status: null,
    };
    setForm(nform);
    const response = await addToMailchimp(values.email, {
      FNAME: values.name,
    });

    setForm({
      ...nform,
      submitting: false,
    });

    if (response.result === 'success') {
      setValues(initialValues);
      setForm({
        ...initialForm(),
        status: 'success',
      });
    }

    if (response.result === 'error') {
      if (response.msg.includes('is already subscribed')) {
        return setForm({
          ...form,
          msg: `O e-mail ${values.email} já está inscrito em nossa newsletter`,
          status: 'error',
        });
      } else {
        return setForm({
          ...form,
          msg: `Ocorreu um erro. Tente novamente mais tarde!`,
          status: 'error',
        });
      }
    }
  };

  const onChange = ev => {
    const { name, value } = ev.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <>
      <form
        action="https://app.convertkit.com/forms/1222250/subscriptions"
        className="subscribe-form"
        onSubmit={onSubmit}
        method="post"
        style={{
          backgroundColor: 'rgb(255, 255, 255)',
          borderRadius: '6px',
        }}
      >
        <div className="subscribe-form__row">
          <div
            className="subscribe-form__column"
            style={{ backgroundColor: 'rgb(249, 250, 251)' }}
          >
            <header className="subscribe-form__header">
              <h1>
                {language === 'pt-br'
                  ? 'Junte-se a nossa newsletter'
                  : 'Join the Newsletter'}
              </h1>
            </header>
            <div
              className="subscribe-form__subheader"
              style={{
                color: 'rgb(104, 104, 104)',
                fontSize: '15px',
              }}
            >
              <p>
                {language === 'pt-br'
                  ? 'Assine para receber nossos conteúdos por email'
                  : 'Subscribe to get our latest content by email.'}
              </p>
            </div>
            <div className="subscribe-form__image relative">
              <img
                className="cursor-pointer focus:outline-blue"
                src="https://images.unsplash.com/photo-1563207153-f403bf289096?ixlib=rb-1.2.1&amp;q=85&amp;fm=jpg&amp;crop=entropy&amp;cs=srgb&amp;ixid=eyJhcHBfaWQiOjY5NzkwfQ?fit=max&amp;w=800"
              />
            </div>
          </div>
          <div className="subscribe-form__column">
            <ul
              className="subscribe-form__alert subscribe-form__alert-error"
              data-group="alert"
            ></ul>
            <div className="subscribe-form__fields">
              <div className="subscribe-form__field">
                <input
                  className="subscribe-form__input"
                  aria-label="Your first name"
                  name="name"
                  placeholder={
                    language === 'pt-br' ? 'Seu nome' : 'Your first name'
                  }
                  value={values.name}
                  onChange={onChange}
                  type="text"
                />
              </div>
              <div className="subscribe-form__field">
                <input
                  className="subscribe-form__input"
                  name="email"
                  placeholder={
                    language === 'pt-br' ? 'Seu e-mail' : 'Your email address'
                  }
                  required
                  type="email"
                  onChange={onChange}
                  value={values.email}
                />
              </div>
              <button className="subscribe-form__submit" type="submit">
                {form.submitting ? (
                  <div className="subscribe-form__spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                    {/* {language === 'pt-br' ? 'Enviando' : 'Sending'}... */}
                  </div>
                ) : (
                  <span>
                    {language === 'pt-br' ? 'Inscrever-se' : 'Subscribe'}
                  </span>
                )}
              </button>
              {form.status === 'success' && (
                <div className="subscribe-form__success">
                  Obrigado por se juntar a nós!
                </div>
              )}
              {form.status === 'error' && (
                <div className="subscribe-form__error">{form.msg}</div>
              )}
            </div>
            <div
              className="subscribe-form__guarantee"
              style={{
                color: 'rgb(77, 77, 77)',
                fontSize: '13px',
                fontWeight: '400',
              }}
            >
              {language === 'pt-br'
                ? 'Você pode cancelar a inscrição a qualquer hora'
                : 'We respect your privacy. Unsubscribe at any time.'}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default SubscribeForm;
