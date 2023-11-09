import { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import Alert from '../../components/Alert';
import ApiService from '../../services/ApiService';
import ListBank from './ListBank';

function CreateBank() {
  const [bank, setData] = useState({
    name: '',
    country: '',
  });
  const [countryList, setCountryList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [textButton, setTextButton] = useState('Create');
  const [seed, setSeed] = useState(1);

  useEffect(() => {
    ApiService.getCountry('').then(
      (response) => {
        if (response.status === 'success') {
          setCountryList(response.countries);
          setData({
            ...bank,
            country: response.countries[0]._id,
          });
        }
      },
      (error) => {
        Alert('failed', 'Error fetching', 3);
        console.error(error);
      },
    );
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    for (const key in bank) {
      console.log('bank', bank);
      console.log('key', key);
      // if (key === 'bank' || key === 'web')
      //   continue
      if (bank[key] === '') {
        Alert('failed', `input ${key} is required`, 3);
        return;
      }
    }

    // Validar que el usuario haya seleccionado un país válido
    if (bank.country === '') {
      Alert('failed', 'Please select a valid country', 3);
      return;
    }

    Alert('success', 'loading', 30);
    if (isEditing) {
      ApiService.putBank(`/${bank._id}`, { ...bank }).then(
        (response) => {
          if (response.status === 'success') {
            Alert('success', 'Updated', 3);
            reset();
          }
        },
        (error) => {
          Alert('failed', 'Error creating', 3);
          console.error(error);
        },
      );
    } else {
      ApiService.postBank('/create', { ...bank }).then(
        (response) => {
          if (response.status === 'success') {
            Alert('success', 'Created', 3);
            reset();
          }
        },
        (error) => {
          Alert('failed', 'Error creating', 3);
          console.error(error);
        },
      );
    }
  };

  const edit = (data) => {
    console.log(data);
    setData({
      ...bank,
      _id: data._id,
      name: data.name,
      country: data.country._id,
    });
    setIsEditing(true);
    setTextButton('Update');
  };

  const reset = () => {
    setSeed(Math.random());
    setTextButton('Create');
    setIsEditing(false);
    setData({
      name: '',
      country: countryList[0]._id,
    });
  };

  return (
    <div>
      <PageTitle title="Create" />
      <div className="col-12 mb-3">
        <form
          className="row g-3 needs-validation"
          noValidate
          onSubmit={handleFormSubmit}
        >
          <div className="row">
            <div className="col-md-6 mt-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={bank.name}
                onChange={(e) => setData({
                  ...bank,
                  name: e.target.value,
                })}
                required
              />
            </div>
            <div className="col-md-6 mt-3">
              <label className="form-label">Country</label>
              <select
                type="text"
                className="form-control"
                value={bank.country}
                onChange={(e) => {
                  setData({
                    ...bank,
                    country: e.target.value,
                  });
                }}
                required
              >
                <option value="">Selecciona un país...</option>
                {' '}
                {/* Opción por defecto */}
                {countryList.map((country) => <option value={country._id} key={country._id}>{country.name}</option>)}
              </select>
            </div>

            <div className="col-md-12 mt-4 text-center">
              <button className="btn btn-primary text-white">
                {textButton}
              </button>
              {isEditing && (
              <button type="button" className="btn btn-primary text-white" onClick={reset}>
                New
              </button>
              )}

            </div>
          </div>
        </form>
      </div>
      <ListBank key={seed} edit={edit} />
    </div>
  );
}

export default CreateBank;
