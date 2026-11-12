import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import Icon from '../components/Icon';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function NotFound() {
  useDocumentTitle('Page not found');

  return (
    <PageTransition>
      <div className="empty-state" style={{ marginTop: 40 }}>
        <p className="eyebrow">404</p>
        <h3>This page does not exist.</h3>
        <p>The link may be old, or the project was moved.</p>
        <Link className="btn btn--dark btn--sm" to="/" style={{ marginTop: 10 }}>
          Back home
          <Icon name="arrow" size={14} />
        </Link>
      </div>
    </PageTransition>
  );
}
