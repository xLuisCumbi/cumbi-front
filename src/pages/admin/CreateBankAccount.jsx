import { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import Alert from '../../components/Alert';
import ApiService from '../../services/ApiService';
import ListBankAccount from './ListBankAccount';
import FileDropzone from '../../components/FileDropzone'; // Importa el componente FileDropzone

function CreateBankAccount() {
  const user = JSON.parse(localStorage.getItem('user'));

  const [bankAccount, setData] = useState({
    user: user._id,
    bank: '',
    type: 'ahorros',
    number: '',
    name: '',
    active: false,
  });
  const [bankList, setBankList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [textButton, setTextButton] = useState('Create');
  const [seed, setSeed] = useState(1);
  const [file, setFile] = useState(null);
  const maxSizeDoc = 5 * 1024 * 1024; // 5 MB


  useEffect(() => {
    ApiService.getBank('').then(
      (response) => {
        if (response.status === 'success') {
          setBankList(response.banks);
          setData({
            ...bankAccount,
            bank: response.banks[0]._id,
          });
        }
      },
      (error) => {
        Alert('failed', 'Error fetching', 3);
        console.error(error);
      },
    );

    // ApiService.getBankAccount("/active").then(
    //   (response) => {
    //     if (response.status === 'success') {
    //       console.log(response.bankAccount)
    //     }
    //   },
    //   (error) => {
    //     Alert('failed', 'Error fetching', 3);
    //     console.error(error)
    //   }
    // );
  }, []);

  const onDrop = (acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    if (uploadedFile.size <= maxSizeDoc) {
      setFile(uploadedFile);
    } else {
      Alert('failed', `El archivo es demasiado grande. Debe ser menor de ${maxSizeDoc / 1024 / 1024} MB.`, 3);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Verificar que todos los campos necesarios están completos antes de enviar
    for (const key in bankAccount) {
      if (bankAccount[key] === '') {
        Alert('failed', `The field ${key} is required`, 3);
        return;
      }
    }

    // Crear un objeto FormData para enviar los datos del formulario y el archivo
    const formData = new FormData();
    formData.append('user', bankAccount.user);
    formData.append('bank', bankAccount.bank);
    formData.append('type', bankAccount.type);
    formData.append('number', bankAccount.number);
    formData.append('name', bankAccount.name);
    formData.append('active', bankAccount.active);


    // Añadir el archivo al objeto FormData si existe
    if (file) {
      formData.append('document', file);
    }
    // Mostrar alerta de carga
    Alert('success', 'loading', 30);

    // Realizar la petición POST o PUT dependiendo si es edición o creación
    if (isEditing) {
      ApiService.putBankAccount(`/${bankAccount._id}`, formData).then(
        (response) => {
          if (response.status === 'success') {
            Alert('success', 'Cuenta de Banco ctualizada correctamente', 3);
            reset(); // Resetea el formulario después de la actualización
          }
        },
        (error) => {
          Alert('failed', 'Error actualizando la cuenta de banco', 3);
          console.error(error);
        },
      );
    } else {
      ApiService.postBankAccount('/create', formData).then(
        (response) => {
          if (response.status === 'success') {
            Alert('success', 'Cuenta de Banco creada correctamente', 3);
            reset(); // Resetea el formulario después de la creación
          }
        },
        (error) => {
          Alert('failed', 'Error creando la Cuenta de Banco', 3);
          console.error(error);
        },
      );
    }
  };

  const edit = (data) => {
    setData({
      ...bankAccount,
      _id: data._id,
      user: data.user,
      bank: data.bank._id,
      type: data.type,
      number: data.number,
      name: data.name,
      active: data.active,
      document: data.document,

    });
    setIsEditing(true);
    setTextButton('Update');
  };

  const reset = () => {
    setSeed(Math.random());
    setTextButton('Create');
    setIsEditing(false);
    setData({
      user: user.id,
      bank: bankList[0]._id,
      type: 'ahorros',
      number: '',
      name: '',
      active: false,
      document: '',
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
              <label className="form-label">Bank</label>
              <select
                type="text"
                className="form-control"
                value={bankAccount.bank}
                onChange={(e) => {
                  setData({
                    ...bankAccount,
                    bank: e.target.value,
                  });
                }}
                required
              >
                {bankList.map((bank) => <option value={bank._id} key={bank._id}>{bank.name}</option>)}
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
                  });
                }}
                required
              >
                <option value="ahorros">Ahorros</option>
                <option value="corriente">Corriente</option>

              </select>
            </div>
            <div className="col-md-6 mt-3">
              <label className="form-label">Number</label>
              <input
                type="text"
                className="form-control"
                value={bankAccount.number}
                onChange={(e) => setData({
                  ...bankAccount,
                  number: e.target.value,
                })}
                required
              />
            </div>
            <div className="col-md-6 mt-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={bankAccount.name}
                onChange={(e) => setData({
                  ...bankAccount,
                  name: e.target.value,
                })}
                required
              />
            </div>
            <div className="col-md-6 mt-3">
              <label className="form-label">Active</label>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  checked={bankAccount.active}
                  onChange={(e) => setData({
                    ...bankAccount,
                    active: e.target.checked,
                  })}
                />
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault" />
                <div className="form-text" id="basic-addon4">Solo se permite una cuenta activa</div>

              </div>
            </div>
            {/* Añade la sección de carga de archivos */}
            <div className="col-12">
              <label className="form-label">Sube la referencia bancaria de la cuenta de banco, debe estar a tu nombre, asociada al ID subido al momento del proceso de KYC</label>
              <FileDropzone onDrop={onDrop} />
              <small className="text-muted">
                Solo se permiten archivos PDF de hasta 5 MB.
              </small>
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
      <ListBankAccount key={seed} edit={edit} />
    </div>
  );
}

export default CreateBankAccount;
