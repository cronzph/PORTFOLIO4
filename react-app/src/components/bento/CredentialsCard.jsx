import BentoCard from './BentoCard';
import Icon from '../Icon';
import { CERTIFICATES, PROFILE } from '../../data/site';

export default function CredentialsCard() {
  return (
    <BentoCard className="card--credentials span-3" delay={0.2}>
      <div className="card__head">
        <span className="card__icon">
          <Icon name="check" size={16} />
        </span>
        <div>
          <h2 className="card__title">Credentials</h2>
          <p className="card__sub">What backs the work.</p>
        </div>
      </div>

      <p className="card__text">{PROFILE.credentials}</p>

      <div className="cred">
        <p className="cred__label">
          <span>Mimo</span> · {CERTIFICATES.length} certificates
        </p>
        <div className="cred__list">
          {CERTIFICATES.map((cert) => (
            <a
              key={cert.title}
              className="cred__item"
              href={cert.file}
              target="_blank"
              rel="noreferrer"
              style={{ '--cert-tint': cert.tint }}
              title={`${cert.title} — ${cert.issuer}, ${cert.date}`}
            >
              <span className="cred__dot" aria-hidden="true" />
              <span className="cred__name">{cert.title}</span>
              <Icon name="external" size={11} className="cred__go" />
            </a>
          ))}
        </div>
      </div>

      <a className="btn btn--dark btn--sm" href={PROFILE.resume} download>
        <Icon name="download" size={14} />
        Download Resume
      </a>
    </BentoCard>
  );
}
