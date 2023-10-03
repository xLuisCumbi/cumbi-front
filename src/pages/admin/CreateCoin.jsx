import { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import Alert from '../../components/Alert';
import ApiService from '../../services/ApiService';
import ListCoin from './ListCoin';

function CreateCoin() {
  const [coin, setData] = useState({
    name: '',
    abbr: '',
  });
  const [isEditing, setIsEditing] = useState(false)
  const [textButton, setTextButton] = useState("Create")
  const [seed, setSeed] = useState(1);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // for (let key in coin) {
    //   if (key === 'coin' || key === 'web')
    //     continue
    //   if (coin[key] === '') {
    //     Alert('failed', `input ${key} is required`, 3);
    //     return;
    //   }
    // }

    Alert('success', 'loading', 30);
    if (isEditing)
      ApiService.putCoin('/' + coin._id, { ...coin }).then(
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
      ApiService.postCoin('/create', { ...coin }).then(
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
      ...coin,
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
                value={coin.name}
                onChange={(e) =>
                  setData({
                    ...coin,
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
                value={coin.abbr}
                onChange={(e) =>
                  setData({
                    ...coin,
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
      <ListCoin key={seed} edit={edit} />
    </div>
  );
}

export default CreateCoin;
