import { useState } from 'react';
import PageTitle from '../../components/PageTitle';
import Alert from '../../components/Alert';
import ApiService from '../../services/ApiService';
import ListUser from './ListUser';

function CreateUser() {
  const [userData, setUserData] = useState({
    username: '',
    business: '',
    domain: '',
    email: '',
    password: '',
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    for (let i in userData) {
      if (userData[i] === '') {
        Alert('failed', `input ${i} is required`, 3);
        return;
      }
    }

    Alert('success', 'loading', 30);
    ApiService.post('/signup', { ...userData }).then(
      (response) => {
        if (response.status === 'signUp_success') Alert('success', '', 0);
      },
      (err) => {
        Alert('failed', 'Error in creating user', 3);
      }
    );
  };

  return (
    <div>
      <PageTitle title="Create User" />
      <div className="col-12 mb-3">
        <form
          className="row g-3 needs-validation"
          noValidate
          onSubmit={handleFormSubmit}
        >
          <div className="row">
            <div className="col-md-6 mt-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={userData.username}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    username: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="col-md-6 mt-3">
              <label className="form-label">Email</label>
              <input
                type="text"
                className="form-control"
                value={userData.email}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    email: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="col-md-6 mt-3">
              <label className="form-label">Business</label>
              <input
                type="text"
                className="form-control"
                value={userData.business}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    business: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="col-md-6 mt-3">
              <label className="form-label">Domain</label>
              <input
                type="text"
                className="form-control"
                value={userData.domain}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    domain: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="col-md-6 mt-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={userData.password}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    password: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="col-md-12 mt-4 text-center">
              <button className="btn btn-primary text-white">
                {' '}
                Create User{' '}
              </button>
            </div>
          </div>
        </form>
      </div>
      <ListUser />
    </div>
  );
}

export default CreateUser;
