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
  });

  const [person, setPerson] = useState({})

  const handleFormSubmit = (e) => {
    e.preventDefault();

    for (let key in userData) {
      if (key === 'business' && userData.role === 'person') {
        continue; // Omitir validación del campo "business" para roles "person".
      }

      if (userData[key] === '' && key !== 'business') {
        Alert('failed', `input ${key} is required`, 3);
        return;
      }
    }

    Alert('success', 'loading', 30);
    ApiService.post('/signup', { ...userData }).then(
      (response) => {
        if (response.status === 'signUp_success') Alert('success', 'User Created', 3);
      },
      (err) => {
        Alert('failed', 'Error in creating user', 3);
      }
    );
  };



  useEffect(() => {

    const user = JSON.parse(localStorage.getItem('user'));
    setRoleCur(user.role)
    // Si es admin puede crear usuarios de su misma empresa
    if (user.role === 'admin')
      setUserData({
        ...userData,
        business: {
          _id: user.business,
          name: ''
        },
      })
    ApiService.getBusiness('').then(
      (response) => {
        if (response.status === 'success') {
          setBusinessData(response.businesses)
          try {
            setPerson(response.businesses.filter(business => business.name === "Person")[0])
          } catch (e) {
            setPerson("00000000")
          }
        }
      },
      (err) => {
        Alert('failed', 'Error fetching business', 3);
      }
    );

  }, []);

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
                  if (e.target.value === "person") {
                    console.log(person)
                    setUserData({
                      ...userData,
                      role: e.target.value,
                      business: {
                        _id: person._id,
                        name: person.name
                      }
                    })
                  }
                  else
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
                  value={userData.business._id}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      business: {
                        _id: e.target.value,
                        name: e.target.options[e.target.selectedIndex].text
                      }
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
            <div className="col-md-12 mt-4 text-center">
              <button className="btn btn-primary text-white">
                {' '}
                Create User{' '}
              </button>
            </div>
          </div>
        </form>
      </div >
      <ListUserBusiness />
    </div >
  );
}

export default CreateUser;
