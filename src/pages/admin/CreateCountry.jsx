import { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import Alert from '../../components/Alert';
import ApiService from '../../services/ApiService';
import ListCountry from './ListCountry';

function CreateCountry() {
  const [country, setData] = useState({
    name: '',
    abbr: '',
  });
  const [isEditing, setIsEditing] = useState(false)
  const [textButton, setTextButton] = useState("Create")
  const [seed, setSeed] = useState(1);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // for (let key in country) {
    //   if (key === 'country' || key === 'web')
    //     continue
    //   if (country[key] === '') {
    //     Alert('failed', `input ${key} is required`, 3);
    //     return;
    //   }
    // }

    Alert('success', 'loading', 30);
    if (isEditing)
      ApiService.putCountry('/' + country._id, { ...country }).then(
        (response) => {
          if (response.status === 'success') {
            Alert('success', 'Updated', 3);
            reset()
          }
        },
        (error) => {
          Alert('failed', 'Error creating', 3);
          console.error(error)
        }
      );
    else
      ApiService.postCountry('/create', { ...country }).then(
        (response) => {
          if (response.status === 'success') {
            Alert('success', 'Created', 3);
            reset()
          }
        },
        (error) => {
          Alert('failed', 'Error creating', 3);
          console.error(error)
        }
      );
  };


  const edit = (data) => {
    setData({
      ...country,
      _id: data._id,
      name: data.name,
      abbr: data.abbr,
    })
    setIsEditing(true)
    setTextButton("Update")
  }

  const reset = () => {
    setSeed(Math.random());
    setTextButton("Create")
    setIsEditing(false)
    setData({
      name: '',
      abbr: '',
    })
  }

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
                value={country.name}
                onChange={(e) =>
                  setData({
                    ...country,
                    name: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="col-md-6 mt-3">
              <label className="form-label">Abbreviation</label>
              <input
                type="text"
                className="form-control"
                value={country.abbr}
                onChange={(e) =>
                  setData({
                    ...country,
                    abbr: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="col-md-12 mt-4 text-center">
              <button className="btn btn-primary text-white">
                {textButton}
              </button>
              {isEditing && <button type="button" className="btn btn-primary text-white" onClick={reset}>
                New
              </button>}

            </div>
          </div>
        </form>
      </div>
      <ListCountry key={seed} edit={edit} />
    </div>
  );
}

export default CreateCountry;
