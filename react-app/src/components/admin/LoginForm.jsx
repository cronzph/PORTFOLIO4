import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { PROFILE } from '../../data/site';

const MESSAGES = {
  'auth/invalid-credential': 'Wrong email or password.',
  'auth/invalid-email': 'That email address is not valid.',
  'auth/user-not-found': 'No account with that email.',
  'auth/wrong-password': 'Wrong password.',
  'auth/too-many-requests': 'Too many attempts. Wait a minute and try again.',
  'auth/network-request-failed': 'Network error. Check your connection.',
  'auth/operation-not-allowed': 'Email/password sign-in is disabled in Firebase.',
};

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (err) {
      setError(MESSAGES[err.code] || err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="login">
      <form className="login__card" onSubmit={handleSubmit}>
        <span className="login__logo">M</span>
        <div>
          <h1 className="login__title">Admin sign in</h1>
          <p className="login__sub">
            {PROFILE.name} — content manager. Accounts are created in the Firebase console.
          </p>
        </div>

        <div className="login__form">
          <div className="form-field">
            <label className="label" htmlFor="admin-email">
              Email
            </label>
            <input
              id="admin-email"
              className="input"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className="form-field">
            <label className="label" htmlFor="admin-password">
              Password
            </label>
            <input
              id="admin-password"
              className="input"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {error && <p className="notice notice--err">{error}</p>}

          <button className="btn btn--dark" type="submit" disabled={busy}>
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
        </div>
      </form>
    </div>
  );
}
