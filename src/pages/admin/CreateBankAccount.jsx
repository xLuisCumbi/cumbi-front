import { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import Alert from '../../components/Alert';
import ApiService from '../../services/ApiService';
import ListBankAccount from './ListBankAccount';

function CreateBankAccount() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [bankAccount, setData] = useState({
    user: user.id,
    bank: '',
    type: '',
    number: '',
    name: '',
    active: false,
  });
  const [bankList, setBankList] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [textButton, setTextButton] = useState("Create")
  const [seed, setSeed] = useState(1);

  useEffect(() => {
    console.log(user)
    ApiService.getBank("").then(
      (response) => {
        if (response.status === 'success') {
          setBankList(response.banks)
        }
      },
      (error) => {
        Alert('failed', 'Error fetching', 3);
        console.error(error)
      }
    );

  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    for (let key in bankAccount) {
      // if (key === 'bankAccount' || key === 'web')
      //   continue
      if (bankAccount[key] === '') {
        Alert('failed', `input ${key} is required`, 3);
        return;
      }
    }

    Alert('success', 'loading', 30);
    if (isEditing)
      ApiService.putBankAccount('/' + bankAccount._id, { ...bankAccount }).then(
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
    else {
      ApiService.postBankAccount('/create', { ...bankAccount }).then(
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
    }

  };


  const edit = (data) => {
    setData({
      ...bankAccount,
      _id: data._id,
      user: data.user,
      bank: data.bank,
      type: data.type,
      number: data.number,
      name: data.name,
      active: data.active,
    })
    setIsEditing(true)
    setTextButton("Update")
  }

  const reset = () => {
    setSeed(Math.random());
    setTextButton("Create")
    setIsEditing(false)
    setData({
      user: user.id,
      bank: '',
      type: '',
      number: '',
      name: '',
      active: false,
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
              <label className="form-label">Bank</label>
              <select
                type="text"
                className="form-control"
                value={bankAccount.bank}
                onChange={(e) => {
                  setData({
                    ...bankAccount,
                    bank: e.target.value,
                  })
                }
                }
                required
              >
                {bankList.map(bank =>
                  <option value={bank._id} key={bank._id}>{bank.name}</option>)
                }
              </select>
            </div>
            <div className="col-md-6 mt-3">
              <label className="form-label">Type</label>
              <select
                type="text"
                className="form-control"
                value={bankAccount.type}
                onChange={(e) => {
                  setData({
                    ...bankAccount,
                    type: e.target.value,
                  })
                }
                }
                required
              >
                <option value="ahorros" >Ahorros</option>
                <option value="corriente" >Corriente</option>

              </select>
            </div>
            <div className="col-md-6 mt-3">
              <label className="form-label">Number</label>
              <input
                type="text"
                className="form-control"
                value={bankAccount.number}
                onChange={(e) =>
                  setData({
                    ...bankAccount,
                    number: e.target.value,
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
                value={bankAccount.name}
                onChange={(e) =>
                  setData({
                    ...bankAccount,
                    name: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="col-md-6 mt-3">
              <label className="form-label">Active</label>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
                  checked={bankAccount.active} onChange={(e) =>
                    setData({
                      ...bankAccount,
                      active: e.target.checked,
                    })
                  } />
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault"></label>
              </div>
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
      <ListBankAccount key={seed} edit={edit} />
    </div>
  );
}

export default CreateBankAccount;
