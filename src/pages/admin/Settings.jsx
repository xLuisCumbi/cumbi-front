import { useState, useEffect } from 'react';
import PageTitle from '../../components/PageTitle';
import Alert from '../../components/Alert';
import ApiService from '../../services/ApiService';

function Settings() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [settingsFormData, setSettingsFormData] = useState({
    username: user.username,
    email: user.email,
    password: '',
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Solo incluir campos que han sido modificados
    const data = {};
    if (settingsFormData.username !== user.username) {
      data.username = settingsFormData.username;
    }
    if (settingsFormData.password !== '') {
      data.password = settingsFormData.password;
    }

    Alert('success', 'loading', 30);
    ApiService.post('/update-profile', data).then(
      (response) => {
        if (response.status === 'success') {
          Alert('success', 'Profile successfully Updated', 3);
        }
      },
      (err) => {
        Alert('failed', 'Error updating profile', 3);
      },
    );
  };

  return (
    <div>
      <PageTitle title="Settings" />

      <div className="col-12 mb-3">
        <form
          className="row g-3 needs-validation"
          noValidate
          onSubmit={handleFormSubmit}
        >
          <div className="row">
            <div className="col-md-6 mt-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                value={settingsFormData.username}
                onChange={(e) => setSettingsFormData({
                  ...settingsFormData,
                  username: e.target.value,
                })}
              />
            </div>
            <div className="col-md-6 mt-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={settingsFormData.email}
                readOnly
              />
            </div>
            <div className="col-md-6 mt-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={settingsFormData.password}
                onChange={(e) => setSettingsFormData({
                  ...settingsFormData,
                  password: e.target.value,
                })}
                required
              />
            </div>
            <div className="col-md-12 mt-4 text-center">
              <button className="btn btn-primary text-white">
                Update Profile
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;
