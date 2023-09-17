import { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import Alert from '../../components/Alert';
import ApiService from '../../services/ApiService';
import ListUserBusiness from './ListUserBusiness';

function CreateUser() {
  const [roleCur, setRoleCur] = useState('')
  const [businessData, setBusinessData] = useState([])
  const [userData, setUserData] = useState({
    username: '',
    business: '',
    email: '',
    password: '',
    role: 'person',
    payment_fee: 0,
  });
  const [isEditing, setIsEditing] = useState(false)
  const [textButton, setTextButton] = useState("Create User")
  const [seed, setSeed] = useState(1);


  const handleFormSubmit = (e) => {
    e.preventDefault();

    for (let key in userData) {
      if (key === 'business' && userData.role === 'person') {
        continue; // Omitir validación del campo "business" para roles "person".
      }
      if (key === 'payment_fee' && userData.role !== 'person') {
        continue; // Omitir validación del campo "payment_fee" para roles diferentes de "person".
      }

      if (userData[key] === '' && key !== 'business') {
        Alert('failed', `input ${key} is required`, 3);
        return;
      }
    }

    Alert('success', 'loading', 30);
    if (isEditing)
      ApiService.put('/' + userData._id, { ...userData }).then(
        (response) => {
          if (response.status === 'success') {
            Alert('success', 'User Updated', 3);
            reset()
          }
        },
        (err) => {
          console.log('err', err);
          console.log('stack', err.stack);
          Alert('failed', 'Error updating user', 3);
        }
      );
    else
      ApiService.post('/signup', { ...userData }).then(
        (response) => {
          if (response.status === 'signUp_success') {
            Alert('success', 'User Created', 3);
            reset()
          }
        },
        (err) => {
          Alert('failed', 'Error in creating user', 3);
        }
      );
  };

  const reset = () => {
    setSeed(Math.random());
    setTextButton("Create User")
    setIsEditing(false)
    setUserData({
      username: '',
      business: '',
      email: '',
      password: '',
      role: 'person',
      payment_fee: 0,
    })
  }

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem('user'));
    setRoleCur(user.role)
    // Si es admin puede crear usuarios de su misma empresa
    if (user.role === 'admin')
      setUserData({
        ...userData,
        business: user.business,
      })
    ApiService.getBusiness('').then(
      (response) => {
        if (response.status === 'success') {
          setBusinessData(response.businesses)
        }
      },
      (err) => {
        Alert('failed', 'Error fetching business', 3);
      }
    );

  }, []);


  const editUser = (user) => {
    setUserData({
      ...userData,
      _id: user._id,
      username: user.username,
      business: user.business,
      email: user.email,
      role: user.role,
      payment_fee: user.payment_fee ? user.payment_fee : 0,
      token: user.token,
    })
    setIsEditing(true)
    setTextButton("Update User")
  }

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
                type="email"
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
            <div className="col-md-6 mt-3">
              <label className="form-label">Role</label>
              <select
                type="text"
                className="form-control"
                value={userData.role}
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    role: e.target.value,
                  })
                }
                }
                required
              >
                {roleCur === 'superadmin' && <option value="person">Person</option>}
                <option value="business">Business Person</option>
                <option value="admin">Business Admin</option>
              </select>
            </div>
            {/* solo el superadmin puede crear usuarios para empresas en específico */}
            {roleCur === 'superadmin' && userData.role !== "person" &&
              <div className="col-md-6 mt-3">
                <label className="form-label">Business</label>
                <select
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
                >
                  {businessData.map(business =>
                    <option value={business._id} key={business._id}>{business.name}</option>)
                  }
                </select>
              </div>
            }
            {userData.role === "person" &&
              <div className="col-md-6 mt-3">
                <label className="form-label">Payment Fee [%]</label>
                <input
                  type="number"
                  className="form-control"
                  value={userData.payment_fee}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      payment_fee: e.target.value,
                    })
                  }
                  required
                />
              </div>
            }
            <div className="col-md-12 mt-4 text-center">
              <button className="btn btn-primary text-white">
                {textButton}
              </button>
              {isEditing && <button type="button" className="btn btn-primary text-white" onClick={reset}>
                New User
              </button>}
            </div>
          </div>
        </form>
      </div >
      <ListUserBusiness key={seed} editUser={editUser} />
    </div >
  );
}

export default CreateUser;
