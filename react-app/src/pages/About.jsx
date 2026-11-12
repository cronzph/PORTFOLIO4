import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import Icon from '../components/Icon';
import { ABOUT } from '../data/about';
import { PROFILE } from '../data/site';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function About() {
  useDocumentTitle(`About — ${PROFILE.name}`);

  return (
    <PageTransition>
      <header className="about-head">
        <div className="about-head__text">
          <p className="eyebrow">{ABOUT.eyebrow}</p>
          <h1 className="about-title">{ABOUT.title}</h1>
          <p className="about-lede">{ABOUT.lede}</p>

          <div className="about-actions">
            <a className="btn btn--dark btn--sm" href={PROFILE.resume} download>
              <Icon name="download" size={14} />
              Download resume
            </a>
            <Link className="btn btn--ghost btn--sm" to="/#contact">
              Work with me
              <Icon name="arrow" size={14} />
            </Link>
          </div>
        </div>

        <figure className="about-portrait">
          <img src={PROFILE.photo} alt={`Portrait of ${PROFILE.name}`} />
          <figcaption className="about-portrait__tag">
            <span className="about-portrait__dot" />
            {PROFILE.handle} · {PROFILE.location}
          </figcaption>
        </figure>
      </header>

      <ul className="about-facts">
        {ABOUT.facts.map((fact) => (
          <li className="about-fact" key={fact.label}>
            <p className="about-fact__label">{fact.label}</p>
            <p className="about-fact__value">{fact.value}</p>
          </li>
        ))}
      </ul>

      <section className="about-section" aria-labelledby="about-intro">
        <h2 className="sr-only" id="about-intro">
          Introduction
        </h2>
        <div className="about-intro">
          {ABOUT.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="about-section" aria-labelledby="about-story">
        <header className="about-section__head">
          <div>
            <h2 className="about-section__title" id="about-story">
              {ABOUT.story.title}
            </h2>
            <p className="about-section__sub">{ABOUT.story.sub}</p>
          </div>
        </header>

        <ol className="about-timeline">
          {ABOUT.story.steps.map((step) => (
            <li className="step" key={step.num}>
              <p className="step__num">{step.num}</p>
              <span className="step__bar" aria-hidden="true" />
              <h3 className="step__title">{step.title}</h3>
              <p className="step__body">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="about-section" aria-labelledby="about-work">
        <header className="about-section__head">
          <div>
            <h2 className="about-section__title" id="about-work">
              {ABOUT.work.title}
            </h2>
            <p className="about-section__sub">{ABOUT.work.sub}</p>
          </div>
          <span className="about-section__count">{ABOUT.work.items.length} areas</span>
        </header>

        <ul className="about-work">
          {ABOUT.work.items.map((item) => (
            <li className="work-item" key={item.title}>
              <div className="work-item__head">
                <span className="work-item__icon">
                  <Icon name={item.icon} size={14} />
                </span>
                <h3 className="work-item__title">{item.title}</h3>
              </div>
              <p className="work-item__body">{item.body}</p>
              <ul className="about-tags">
                {item.tags.map((tag) => (
                  <li className="about-tag" key={tag}>
                    {tag}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section className="about-section" aria-labelledby="about-process">
        <header className="about-section__head">
          <div>
            <h2 className="about-section__title" id="about-process">
              {ABOUT.process.title}
            </h2>
            <p className="about-section__sub">{ABOUT.process.sub}</p>
          </div>
          <span className="about-section__count">{ABOUT.process.items.length} stages</span>
        </header>

        <ol className="about-process">
          {ABOUT.process.items.map((item) => (
            <li className="process-step" key={item.num}>
              <div className="process-step__head">
                <span className="process-step__num">{item.num}</span>
                <h3 className="process-step__title">{item.title}</h3>
              </div>
              <p className="process-step__body">{item.body}</p>
              <ul className="about-tags">
                {item.covers.map((cover) => (
                  <li className="about-tag" key={cover}>
                    {cover}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section className="about-section" aria-labelledby="about-setup">
        <header className="about-section__head">
          <div>
            <h2 className="about-section__title" id="about-setup">
              {ABOUT.setup.title}
            </h2>
            <p className="about-section__sub">{ABOUT.setup.sub}</p>
          </div>
        </header>

        <div className="about-setup">
          <div className="rig">
            <p className="rig__summary">{ABOUT.setup.rigSummary}</p>
            <dl className="rig__list">
              {ABOUT.setup.rig.map((row) => (
                <div className="rig__row" key={row.label}>
                  <dt className="rig__label">{row.label}</dt>
                  <dd className="rig__value">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="about-stack">
            {ABOUT.setup.stack.map((group) => (
              <div className="stack-group" key={group.group}>
                <p className="stack-group__label">{group.group}</p>
                <ul className="about-tags">
                  {group.items.map((item) => (
                    <li className="about-tag" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section" aria-labelledby="about-now">
        <header className="about-section__head">
          <div>
            <h2 className="about-section__title" id="about-now">
              {ABOUT.now.title}
            </h2>
            <p className="about-section__sub">{ABOUT.now.sub}</p>
          </div>
        </header>

        <ul className="about-now">
          {ABOUT.now.items.map((item) => (
            <li className="now-item" key={item.name}>
              <div className="now-item__head">
                <h3 className="now-item__name">{item.name}</h3>
                <span className="now-item__status">{item.status}</span>
              </div>
              <p className="now-item__body">{item.body}</p>
              <ul className="about-tags">
                {item.tags.map((tag) => (
                  <li className="about-tag" key={tag}>
                    {tag}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section className="about-cta" aria-labelledby="about-cta">
        <div>
          <h2 className="about-cta__title" id="about-cta">
            {ABOUT.cta.title}
          </h2>
          <p className="about-cta__body">{ABOUT.cta.body}</p>
        </div>
        <div className="about-cta__actions">
          <a className="btn btn--accent btn--sm" href={`mailto:${PROFILE.email}`}>
            <Icon name="mail" size={14} />
            Email me
          </a>
          <Link className="btn btn--ghost btn--sm" to="/projects">
            See the projects
            <Icon name="arrow" size={14} />
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}
