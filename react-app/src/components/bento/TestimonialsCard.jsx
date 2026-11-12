import { Link } from 'react-router-dom';
import BentoCard from './BentoCard';
import Icon from '../Icon';
import { TESTIMONIALS } from '../../data/site';

const initials = (name) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

export default function TestimonialsCard() {
  return (
    <BentoCard className="card--testimonials span-6" delay={0.3} id="testimonials">
      <div className="card__head">
        <span className="card__icon">
          <Icon name="star" size={16} />
        </span>
        <div>
          <h2 className="card__title">Testimonials</h2>
          <p className="card__sub">What people I build for say about the work.</p>
        </div>
      </div>

      <div className="quotes">
        {TESTIMONIALS.map((testimonial) => (
          <figure className="quote" key={testimonial.name}>
            <div className="quote__head">
              <span className="avatar">{initials(testimonial.name)}</span>
              <div>
                <p className="quote__name">{testimonial.name}</p>
                <p className="quote__role">{testimonial.role}</p>
              </div>
            </div>
            <blockquote className="quote__text">“{testimonial.quote}”</blockquote>
            <div className="quote__tags">
              {testimonial.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </figure>
        ))}

        <figure className="quote quote--cta">
          <p className="quote__next">Your project next.</p>
          <p className="quote__text">Open for freelance and full-time work in 2026.</p>
          <Link className="quote__link" to="/#contact">
            Let's talk
            <Icon name="arrow" size={13} />
          </Link>
        </figure>
      </div>
    </BentoCard>
  );
}
