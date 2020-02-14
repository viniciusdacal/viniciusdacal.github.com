import React from 'react';

import './SubscribeForm.css';

const SubscribeForm = ({ language }) => (
  <>
    <script src="https://f.convertkit.com/ckjs/ck.5.js"></script>
    <form
      action="https://app.convertkit.com/forms/1222250/subscriptions"
      className="seva-form formkit-form"
      method="post"
      data-sv-form="1222250"
      data-uid="1f155a4aa1"
      data-format="inline"
      data-version="5"
      data-options="{&quot;settings&quot;:{&quot;after_subscribe&quot;:{&quot;action&quot;:&quot;message&quot;,&quot;success_message&quot;:&quot;Success! Now check your email to confirm your subscription.&quot;,&quot;redirect_url&quot;:&quot;&quot;
      },&quot;analytics&quot;:{&quot;google&quot;:null,&quot;facebook&quot;:null,&quot;segment&quot;:null,&quot;pinterest&quot;:null},&quot;modal&quot;:{&quot;trigger&quot;:&quot;timer&quot;,&quot;scroll_percentage&quot;:null,&quot;timer&quot;:5,&quot;devices&quot;:&quot;all&quot;,&quot;show_once_every&quot;:15},&quot;powered_by&quot;:{&quot;show&quot;:true,&quot;url&quot;:&quot;https://convertkit.com?utm_source=dynamic&amp;utm_medium=referral&amp;utm_campaign=poweredby&amp;utm_content=form&quot;
      },&quot;recaptcha&quot;:{&quot;enabled&quot;:false},&quot;return_visitor&quot;:{&quot;action&quot;:&quot;show&quot;,&quot;custom_content&quot;:&quot;&quot;
      },&quot;slide_in&quot;:{&quot;display_in&quot;:&quot;bottom_right&quot;,&quot;trigger&quot;:&quot;timer&quot;,&quot;scroll_percentage&quot;:null,&quot;timer&quot;:5,&quot;devices&quot;:&quot;all&quot;,&quot;show_once_every&quot;:15},&quot;sticky_bar&quot;:{&quot;display_in&quot;:&quot;top&quot;,&quot;trigger&quot;:&quot;timer&quot;,&quot;scroll_percentage&quot;:null,&quot;timer&quot;:5,&quot;devices&quot;:&quot;all&quot;,&quot;show_once_every&quot;:15}},&quot;version&quot;:&quot;5&quot;
      }"
      min-width="400 500 600 700 800"
      style={{
        backgroundColor: 'rgb(255, 255, 255)',
        borderRadius: '6px',
      }}
    >
      <div data-style="full">
        <div data-element="column" className="formkit-column" style={{ backgroundColor: 'rgb(249, 250, 251)' }}>
          <div className="formkit-background" style={{ opacity: '0.3' }}></div>
          <div
            className="formkit-header"
            data-element="header"
            style={{ color: 'rgb(77, 77, 77)', fontSize: '20px', fontWeight: 700 }}
          >
            <h1>
              {language === 'pt-br'
                ? 'Junte-se a nossa newsletter'
                : 'Join the Newsletter'}

            </h1>
          </div>
          <div
            className="formkit-subheader"
            data-element="subheader"
            style={{
              color: 'rgb(104, 104, 104)',
              fontSize: '15px'
            }}
          >
            <p>
              {language === 'pt-br'
                ? 'Assine para receber nossos conteúdos por email'
                : 'Subscribe to get our latest content by email.'}

            </p>
          </div>
          <div className="formkit-image relative">
            <img
              className="cursor-pointer focus:outline-blue"
              src="https://images.unsplash.com/photo-1563207153-f403bf289096?ixlib=rb-1.2.1&amp;q=85&amp;fm=jpg&amp;crop=entropy&amp;cs=srgb&amp;ixid=eyJhcHBfaWQiOjY5NzkwfQ?fit=max&amp;w=800"
              style={{ maxWidth: '100%' }}
            />
          </div>
        </div>
        <div data-element="column" className="formkit-column">
          <ul className="formkit-alert formkit-alert-error" data-element="errors" data-group="alert"></ul>
          <div data-element="fields" className="seva-fields formkit-fields">
            <div className="formkit-field">
              <input
                className="formkit-input"
                aria-label="Your first name"
                name="fields[first_name]"
                placeholder={language === 'pt-br' ? 'Seu nome' : 'Your first name'}
                type="text"
                style={{
                  color: 'rgb(0, 0, 0)',
                  borderColor: 'rgb(227, 227, 227)',
                  borderRadius: '4px',
                  fontWeight: 400
                }}
              />
            </div>
            <div className="formkit-field">
              <input
                className="formkit-input"
                name="email_address"
                placeholder={language === 'pt-br' ? 'Seu e-mail' : 'Your email address'}
                required
                type="email"
                style={{
                  color: 'rgb(0, 0, 0)',
                  borderColor: 'rgb(227, 227, 227)',
                  borderRadius: '4px',
                  fontWeight: 400
                }}
              />
            </div>
            <button
              data-element="submit"
              className="formkit-submit formkit-submit"
              style={{
                color: 'rgb(255, 255, 255)',
                backgroundColor: 'rgb(22, 119, 190)',
                borderRadius: '24px',
                fontWeight: '700',
              }}
            >
              <div className="formkit-spinner"></div>
              <div></div>
              <div></div>
              <div></div>
              <span>Subscribe</span>
            </button>
          </div>
          <div
            className="formkit-guarantee"
            data-element="guarantee"
            style={{
              color: 'rgb(77, 77, 77)',
              fontSize: '13px',
              fontWeight: '400',
            }}
          >
            {language === 'pt-br' ? (
              'Você pode cancelar a inscrição a qualquer hora'
            ): (
              'We respect your privacy. Unsubscribe at any time.'
            )}

          </div>
          <a
            href="https://convertkit.com?utm_source=dynamic&amp;utm_medium=referral&amp;utm_campaign=poweredby&amp;utm_content=form"
            className="formkit-powered-by"
            data-element="powered-by"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered By ConvertKit
          </a>
        </div>
      </div>
    </form>
  </>
)

export default SubscribeForm;
