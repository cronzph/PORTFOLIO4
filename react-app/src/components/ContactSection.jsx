import { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { EMAILJS, PROFILE, SOCIALS } from '../data/site';
import Icon from './Icon';

const EMPTY = { from_name: '', from_email: '', subject: '', message: '' };

export default function ContactSection() {
  const [values, setValues] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | sending | ok | err
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    emailjs.init({ publicKey: EMAILJS.publicKey });
  }, []);

  const update = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === 'sending') return;

    setStatus('sending');
    setErrorMessage('');

    try {
      await emailjs.send(EMAILJS.serviceId, EMAILJS.templateId, {
        ...values,
        to_name: PROFILE.name,
        reply_to: values.from_email,
      });
      setStatus('ok');
      setValues(EMPTY);
    } catch (error) {
      setStatus('err');
      setErrorMessage(error?.text || error?.message || 'Something went wrong.');
    }
  };

  return (
    <motion.section
      className="contact"
      id="contact"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="contact__side">
        <p className="eyebrow">Contact</p>
        <h2 className="contact__title">
          Got something that
          <br />
          needs building?
        </h2>
        <p className="contact__text">{PROFILE.contactBlurb}</p>

        <div className="contact__meta">
          <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
          <span>{PROFILE.location}</span>
          <span>{PROFILE.role}</span>
          <div className="socials" style={{ margin: '8px 0 0' }}>
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                className={`social social--${social.icon}`}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
              >
                <Icon name={social.icon} size={19} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <form className="contact__form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-field">
            <label className="label" htmlFor="from_name">
              Your name
            </label>
            <input
              className="input"
              id="from_name"
              name="from_name"
              value={values.from_name}
              onChange={update('from_name')}
              placeholder="Juan dela Cruz"
              autoComplete="name"
              required
            />
          </div>

          <div className="form-field">
            <label className="label" htmlFor="from_email">
              Your email
            </label>
            <input
              className="input"
              id="from_email"
              name="from_email"
              type="email"
              value={values.from_email}
              onChange={update('from_email')}
              placeholder="juan@email.com"
              autoComplete="email"
              required
            />
          </div>
        </div>

        <div className="form-field">
          <label className="label" htmlFor="subject">
            Subject
          </label>
          <input
            className="input"
            id="subject"
            name="subject"
            value={values.subject}
            onChange={update('subject')}
            placeholder="Project inquiry"
            required
          />
        </div>

        <div className="form-field">
          <label className="label" htmlFor="message">
            Message
          </label>
          <textarea
            className="textarea"
            id="message"
            name="message"
            rows={6}
            value={values.message}
            onChange={update('message')}
            placeholder="Tell me what it needs to do…"
            required
          />
        </div>

        {status === 'ok' && (
          <p className="form-status form-status--ok">
            Message sent — I'll get back to you within a day.
          </p>
        )}
        {status === 'err' && (
          <p className="form-status form-status--err">
            Could not send: {errorMessage}. You can email me directly at {PROFILE.email}.
          </p>
        )}

        <motion.button
          className="btn btn--accent"
          type="submit"
          disabled={status === 'sending'}
          whileTap={{ scale: 0.98 }}
        >
          {status === 'sending' ? 'Sending…' : 'Send message'}
          {status !== 'sending' && <Icon name="arrow" size={15} />}
        </motion.button>
      </form>
    </motion.section>
  );
}
