import BentoCard from './BentoCard';
import Icon from '../Icon';
import { SERVICES } from '../../data/site';

export default function ServicesCard() {
  return (
    <BentoCard className="card--services span-3" delay={0.25} id="services">
      <div className="card__head">
        <span className="card__icon">
          <Icon name="layers" size={16} />
        </span>
        <div>
          <h2 className="card__title">Services</h2>
          <p className="card__sub">What I build for people.</p>
        </div>
      </div>

      <ul className="service-list">
        {SERVICES.map((service, index) => (
          <li className="service" key={service}>
            <span className="service__name">{service}</span>
            <span className="service__num">{String(index + 1).padStart(2, '0')}</span>
          </li>
        ))}
      </ul>
    </BentoCard>
  );
}
