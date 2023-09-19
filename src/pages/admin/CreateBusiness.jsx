import { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import Alert from '../../components/Alert';
import ApiService from '../../services/ApiService';
import ListBusiness from './ListBusiness';

function CreateBusiness() {
  const [businessData, setBusinessData] = useState({
    id_tax: '',
    name: '',
    web: '',
    country: '',
    email: '',
    payment_fee: 0,
  });
  const [isEditing, setIsEditing] = useState(false)
  const [textButton, setTextButton] = useState("Create Business")
  const [seed, setSeed] = useState(1);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    for (let key in businessData) {
      if (key === 'country' || key === 'web')
        continue
      if (businessData[key] === '') {
        Alert('failed', `input ${key} is required`, 3);
        return;
      }
    }

    Alert('success', 'loading', 30);
    if (isEditing)
      ApiService.putBusiness('/' + businessData._id, { ...businessData }).then(
        (response) => {
          if (response.status === 'success') {
            Alert('success', 'Business Updated', 3);
            reset()
          }
        },
        (err) => {
          Alert('failed', 'Error updating business', 3);
        }
      );
    else
      ApiService.postBusiness('/create', { ...businessData }).then(
        (response) => {
          if (response.status === 'success') {
            Alert('success', 'Business Created', 3);
            reset()
          }
        },
        (err) => {
          Alert('failed', 'Error in creating business', 3);
        }
      );
  };


  const editBusiness = (business) => {
    setBusinessData({
      ...businessData,
      _id: business._id,
      id_tax: business.id_tax,
      name: business.name,
      email: business.email,
      payment_fee: business.payment_fee ? business.payment_fee : 0,
      country: business.country ? business.country : "",
      web: business.web ? business.web : "",
    })
    setIsEditing(true)
    setTextButton("Update Business")
  }

  const reset = () => {
    setSeed(Math.random());
    setTextButton("Create Business")
    setIsEditing(false)
    setBusinessData({
      id_tax: '',
      name: '',
      email: '',
      payment_fee: 0,
      country: '',
      web: '',
    })
  }

  return (
    <div>
      <PageTitle title="Create Business" />
      <div className="col-12 mb-3">
        <form
          className="row g-3 needs-validation"
          noValidate
          onSubmit={handleFormSubmit}
        >
          <div className="row">
            <div className="col-md-6 mt-3">
              <label className="form-label">ID Tax</label>
              <input
                type="text"
                className="form-control"
                value={businessData.id_tax}
                onChange={(e) =>
                  setBusinessData({
                    ...businessData,
                    id_tax: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="col-md-6 mt-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={businessData.name}
                onChange={(e) =>
                  setBusinessData({
                    ...businessData,
                    name: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="col-md-6 mt-3">
              <label className="form-label">Web</label>
              <input
                type="text"
                className="form-control"
                value={businessData.web}
                onChange={(e) =>
                  setBusinessData({
                    ...businessData,
                    web: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-md-6 mt-3">
              <label className="form-label">Country</label>
              <input
                type="text"
                className="form-control"
                value={businessData.country}
                onChange={(e) =>
                  setBusinessData({
                    ...businessData,
                    country: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-md-6 mt-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={businessData.email}
                onChange={(e) =>
                  setBusinessData({
                    ...businessData,
                    email: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="col-md-6 mt-3">
              <label className="form-label">Payment Fee [%]</label>
              <input
                type="number"
                className="form-control"
                value={businessData.payment_fee}
                onChange={(e) =>
                  setBusinessData({
                    ...businessData,
                    payment_fee: e.target.value,
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
                New Business
              </button>}

            </div>
          </div>
        </form>
      </div>
      <ListBusiness key={seed} editBusiness={editBusiness} />
    </div>
  );
}

export default CreateBusiness;
