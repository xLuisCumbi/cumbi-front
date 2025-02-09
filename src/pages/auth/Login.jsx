import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../../components/Alert';
import UserService from '../../services/UserService';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (email == '') {
      Alert('failed', 'Kinldy input email', 3);
    } else if (password == '') {
      Alert('failed', 'Kinldy input password', 3);
    } else {
      Alert('success', 'loading', 30);

      const login = await UserService.Login(email.toLowerCase(), password);
      if (login.status === 'success') {
        Alert('success', 'Login Successful', 3);

        navigate('/admin');
      } else {
        Alert('failed', login.message, 5);
      }
    }
  };

  return (
    <main>
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex justify-content-center py-4">
                  <a
                    href="/"
                    className="logo d-flex align-items-center w-auto text-decoration-none"
                  >
                    <img src="/images/Cumbi_Purple_horizontal.svg" height="200" width="200" alt="" />
                  </a>
                </div>

                <div className="card mb-3">
                  <div className="card-body">
                    <div className="pt-4 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">
                        Iniciar sesión
                      </h5>
                    </div>

                    <form
                      className="row g-3 needs-validation"
                      noValidate
                      onSubmit={handleLoginSubmit}
                    >
                      <div className="col-12">
                        <label htmlFor="yourEmail" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>

                      <div className="col-12">
                        <label htmlFor="yourPassword" className="form-label">
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>

                      <div className="col-12">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="remember"
                            value="true"
                            id="rememberMe"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="rememberMe"
                          >
                            Remember me
                          </label>
                        </div>
                      </div>
                      <div className="col-12 mb-4">
                        <button
                          className="btn btn-primary w-100"
                          type="submit"
                        >
                          Login
                        </button>
                      </div>
                    </form>
                    <div className="col-12 mb-4">
                      <a className="nav-link text-primary text-decoration-underline" onClick={() => navigate('/register')}>Registrarme</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
