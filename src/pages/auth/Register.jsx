import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../../components/Alert';
import ApiService from '../../services/ApiService';

export default function Register() {
    const navigate = useNavigate();
    const [countryList, setCountryList] = useState([]);
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        role: 'person',
        payment_fee: 0,
        acceptedDataPolicy: false,
        acceptedTermsConditions: false,
        acceptedPrivacyPolicy: false,
    });

    const [businessData, setBusinessData] = useState({
        id_tax: '',
        name: '',
        web: '',
        country: '',
        email: '',
        payment_fee: 0,
        role: 'business',
    });

    const [userBusinessData, setUserBusinessData] = useState({
        business: '',
        email: '',
        password: '',
        role: 'admin',
        payment_fee: 0,
        acceptedDataPolicy: false,
        acceptedTermsConditions: false,
        acceptedPrivacyPolicy: false,
    });

    useEffect(() => {
        ApiService.getCountry('').then(
            (response) => {
                if (response.status === 'success') {
                    setCountryList(response.countries);
                    setBusinessData((prevData) => ({
                        ...prevData,
                        country: response.countries[0]._id,
                    }));
                }
            },
            (error) => {
                Alert('failed', 'Error fetching countries', 3);
                console.error(error);
            },
        );
    }, []);

    const handleSubmitPerson = async (e) => {
        e.preventDefault();

        if (!userData.acceptedDataPolicy || !userData.acceptedTermsConditions || !userData.acceptedPrivacyPolicy) {
            Alert('failed', 'Debes aceptar los Términos y Condiciones, la Política de Tratamiento de Datos y el Aviso de Privacidad', 3);
            return;
        }

        for (const key in userData) {
            if (userData[key] === '' || userData[key] === null) {
                Alert('failed', `input ${key} is required`, 3);
                return;
            }
        }

        // Enviar la solicitud
        ApiService.publicSignUp(userData)
            .then((response) => {
                if (response.status === 'signUp_success') {
                    Alert('success', 'Usuario Registrado', 3);
                    setTimeout(() => {
                        navigate('/');
                    }, 3000);
                }
            })
            .catch((err) => {
                console.error('err signup user', err);
                Alert('failed', 'Error in creating user', 3);
            });
    };

    const handleSubmitBusiness = async (e) => {
        e.preventDefault();

        if (!userBusinessData.acceptedDataPolicy || !userBusinessData.acceptedTermsConditions || !userBusinessData.acceptedPrivacyPolicy) {
            Alert('failed', 'Debes aceptar los Términos y Condiciones y la Política de Tratamiento de Datos', 3);
            return;
        }

        for (const key in businessData) {
            if (businessData[key] === '' || businessData[key] === null) {
                Alert('failed', `input ${key} is required`, 3);
                return;
            }
        }
        for (const key in userBusinessData) {
            if (key === 'business') continue;
            if (userBusinessData[key] === '' || userBusinessData[key] === null) {
                Alert('failed', `input ${key} is required`, 3);
                return;
            }
        }

        ApiService.postBusiness('/create', { ...businessData }).then(
            (response) => {
                if (response.status === 'success') {
                    createUserWithBusiness(response.business._id);
                }
            },
            (err) => {
                Alert('failed', 'Error in creating business', 3);
            },
        );
    };

    const createUserWithBusiness = (_id) => {

        userBusinessData.business = _id;
      // Enviar la solicitud
        ApiService.publicSignUp(userBusinessData)
            .then((response) => {
                if (response.status === 'signUp_success') {
                    Alert('success', 'Registro exitoso', 3);
                    setTimeout(() => {
                        navigate('/');
                    }, 2000);
                }
            })
            .catch((err) => {
                console.error('err signup user business', err);
                Alert('failed', 'Error in creating  user business', 3);
            });
    };

    return (
        <main>
            <div className="container">
                <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6 col-md-6 d-flex flex-column align-items-center justify-content-center">
                                <div className="d-flex justify-content-center py-4">
                                    <a
                                        href="/"
                                        className="logo d-flex align-items-center w-auto text-decoration-none"
                                    >
                                        <img src="/images/Cumbi_Purple_horizontal.svg" height="120" alt="" />
                                    </a>
                                </div>

                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="pt-4 pb-2">
                                            <h5 className="card-title text-center pb-0 fs-4">
                                                Registro
                                            </h5>
                                        </div>

                                        {/* Tabs */}
                                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <button
                                                    className="nav-link active"
                                                    id="person-tab"
                                                    data-bs-toggle="tab"
                                                    data-bs-target="#person-tab-pane"
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="person-tab-pane"
                                                    aria-selected="true"
                                                >
                                                    Persona Natural
                                                </button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button
                                                    className="nav-link"
                                                    id="business-tab"
                                                    data-bs-toggle="tab"
                                                    data-bs-target="#business-tab-pane"
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="business-tab-pane"
                                                    aria-selected="false"
                                                >
                                                    Negocio
                                                </button>
                                            </li>
                                        </ul>

                                        {/* Form for register a person */}
                                        <div className="tab-content" id="myTabContent">
                                            <div className="tab-pane fade show active" id="person-tab-pane" role="tabpanel" aria-labelledby="person-tab" tabIndex="0">
                                                <form
                                                    className="row g-3 needs-validation"
                                                    noValidate
                                                    onSubmit={handleSubmitPerson}
                                                >
                                                    <div className="col-12">
                                                        <label className="form-label">Email</label>
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            value={userData.email}
                                                            onChange={(e) => setUserData({
                                                                ...userData,
                                                                email: e.target.value,
                                                            })}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-12">
                                                        <label className="form-label">Password</label>
                                                        <input
                                                            type="password"
                                                            className="form-control"
                                                            value={userData.password}
                                                            onChange={(e) => setUserData({
                                                                ...userData,
                                                                password: e.target.value,
                                                            })}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-12">
                                                        <label className="form-label">Teléfono</label>
                                                        <input
                                                            type="tel"
                                                            className="form-control"
                                                            value={userData.phone}
                                                            onChange={(e) => setUserData({
                                                                ...userData,
                                                                phone: e.target.value
                                                            })}
                                                        />
                                                    </div>
                                                    {/* Términos y Condiciones */}
                                                    <div className="col-12">
                                                        <div className="form-check">
                                                            <input
                                                                type="checkbox"
                                                                className="form-check-input"
                                                                id="termsCheckbox"
                                                                required
                                                                checked={userData.acceptedTermsConditions} // Usa el valor del estado
                                                                onChange={(e) => setUserData({
                                                                    ...userData,
                                                                    acceptedTermsConditions: e.target.checked, // Actualiza el estado cuando cambia
                                                                })}
                                                            />
                                                            <label className="form-check-label" htmlFor="termsCheckbox">
                                                                Acepto los
                                                                {' '}
                                                                <a href="https://cumbi.co/terminos-y-condiciones" target="_blank" rel="noopener noreferrer">Términos y Condiciones</a>
                                                                {' '}
                                                                y confirmo que los he leído y entendido.
                                                            </label>
                                                        </div>
                                                    </div>
                                                    {/* Política de Tratamiento de Datos */}
                                                    <div className="col-12">
                                                        <div className="form-check">
                                                            <input
                                                                type="checkbox"
                                                                className="form-check-input"
                                                                id="dataPolicyCheckbox"
                                                                required
                                                                checked={userData.acceptedDataPolicy} // Usa el valor del estado
                                                                onChange={(e) => setUserData({
                                                                    ...userData,
                                                                    acceptedDataPolicy: e.target.checked, // Actualiza el estado cuando cambia
                                                                })}
                                                            />
                                                            <label className="form-check-label" htmlFor="dataPolicyCheckbox">
                                                                Acepto la
                                                                {' '}
                                                                <a href="https://cumbi.co/politica-de-tratamiento-de-datos" target="_blank" rel="noopener noreferrer">Política de Tratamiento de Datos</a>
                                                                {' '}
                                                                y confirmo que los he leído y entendido.
                                                            </label>
                                                        </div>
                                                    </div>
                                                    {/* Aviso de Privacidad */}
                                                    <div className="col-12">
                                                        <div className="form-check">
                                                            <input
                                                                type="checkbox"
                                                                className="form-check-input"
                                                                id="dataPrivacyCheckbox"
                                                                required
                                                                checked={userData.acceptedPrivacyPolicy} // Usa el valor del estado
                                                                onChange={(e) => setUserData({
                                                                    ...userData,
                                                                    acceptedPrivacyPolicy: e.target.checked, // Actualiza el estado cuando cambia
                                                                })}
                                                            />
                                                            <label className="form-check-label" htmlFor="dataPrivacyCheckbox">
                                                                Acepto el
                                                                {' '}
                                                                <a href="https://cumbi.co/aviso-de-privacidad" target="_blank" rel="noopener noreferrer">Aviso de Privacidad</a>
                                                                {' '}
                                                                y confirmo que los he leído y entendido.
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 mb-4">
                                                        <button
                                                            className="btn btn-primary w-100"
                                                            type="submit"
                                                        >
                                                            Registrar
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>

                                            {/* Form for register a business */}
                                            <div className="tab-pane fade" id="business-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
                                                <form
                                                    className="row g-3 needs-validation"
                                                    noValidate
                                                    onSubmit={handleSubmitBusiness}
                                                >
                                                    <div className="col-12">
                                                        <label className="form-label">Número de Identificacion Comercial</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={businessData.id_tax}
                                                            onChange={(e) => setBusinessData({
                                                                ...businessData,
                                                                id_tax: e.target.value,
                                                            })}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-12">
                                                        <label className="form-label">Nombre Empresa</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={businessData.name}
                                                            onChange={(e) => setBusinessData({
                                                                ...businessData,
                                                                name: e.target.value,
                                                            })}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-12">
                                                        <label className="form-label">Web</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={businessData.web}
                                                            onChange={(e) => setBusinessData({
                                                                ...businessData,
                                                                web: e.target.value,
                                                            })}
                                                        />
                                                    </div>
                                                    <div className="col-12">
                                                        <label className="form-label">Correo empresarial</label>
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            value={businessData.email}
                                                            onChange={(e) => setBusinessData({
                                                                ...businessData,
                                                                email: e.target.value,
                                                            })}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-12">
                                                        <label className="form-label">País</label>
                                                        <select
                                                            type="text"
                                                            className="form-control"
                                                            value={businessData.country}
                                                            onChange={(e) => {
                                                                setBusinessData({
                                                                    ...businessData,
                                                                    country: e.target.value,
                                                                });
                                                            }}
                                                            required
                                                        >
                                                            {countryList.map((country) => <option value={country._id} key={country._id}>{country.name}</option>)}
                                                        </select>
                                                    </div>
                                                    <div className="col-12">
                                                        <label className="form-label">Correo Usuario</label>
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            value={userBusinessData.email}
                                                            onChange={(e) => setUserBusinessData({
                                                                ...userBusinessData,
                                                                email: e.target.value,
                                                            })}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-12">
                                                        <label className="form-label">Contraseña</label>
                                                        <input
                                                            type="password"
                                                            className="form-control"
                                                            value={userBusinessData.password}
                                                            onChange={(e) => setUserBusinessData({
                                                                ...userBusinessData,
                                                                password: e.target.value,
                                                            })}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-12">
                                                        <label className="form-label">Teléfono</label>
                                                        <input
                                                            type="tel"
                                                            className="form-control"
                                                            value={businessData.phone}
                                                            onChange={(e) => setBusinessData({ ...businessData, phone: e.target.value })}
                                                        />
                                                    </div>
                                                    {/* Términos y Condiciones */}
                                                    <div className="col-12">
                                                        <div className="form-check">
                                                            <input
                                                                type="checkbox"
                                                                className="form-check-input"
                                                                id="termsCheckboxBusinnes"
                                                                required
                                                                checked={userBusinessData.acceptedTermsConditions} // Usa el valor del estado
                                                                onChange={(e) => setUserBusinessData({
                                                                    ...userBusinessData,
                                                                    acceptedTermsConditions: e.target.checked, // Actualiza el estado cuando cambia
                                                                })}
                                                            />
                                                            <label className="form-check-label" htmlFor="termsCheckboxBusinnes">
                                                                Acepto los
                                                                {' '}
                                                                <a href="https://cumbi.co/terminos-y-condiciones" target="_blank" rel="noopener noreferrer">Términos y Condiciones</a>
                                                                {' '}
                                                                y confirmo que los he leído y entendido.
                                                            </label>
                                                        </div>
                                                    </div>
                                                    {/* Política de Tratamiento de Datos */}
                                                    <div className="col-12">
                                                        <div className="form-check">
                                                            <input
                                                                type="checkbox"
                                                                className="form-check-input"
                                                                id="dataPolicyCheckboxBusinnes"
                                                                required
                                                                checked={userBusinessData.acceptedDataPolicy} // Usa el valor del estado
                                                                onChange={(e) => setUserBusinessData({
                                                                    ...userBusinessData,
                                                                    acceptedDataPolicy: e.target.checked, // Actualiza el estado cuando cambia
                                                                })}
                                                            />
                                                            <label className="form-check-label" htmlFor="dataPolicyCheckboxBusinnes">
                                                                Acepto la
                                                                {' '}
                                                                <a href="https://cumbi.co/politica-de-tratamiento-de-datos" target="_blank" rel="noopener noreferrer">Política de Tratamiento de Datos</a>
                                                                {' '}
                                                                y confirmo que los he leído y entendido.
                                                            </label>
                                                        </div>
                                                    </div>
                                                    {/* Aviso de Privacidad */}
                                                    <div className="col-12">
                                                        <div className="form-check">
                                                            <input
                                                                type="checkbox"
                                                                className="form-check-input"
                                                                id="dataPrivacyCheckboxBusiness"
                                                                required
                                                                checked={userBusinessData.acceptedPrivacyPolicy} // Usa el valor del estado
                                                                onChange={(e) => setUserBusinessData({
                                                                    ...userBusinessData,
                                                                    acceptedPrivacyPolicy: e.target.checked, // Actualiza el estado cuando cambia
                                                                })}
                                                            />
                                                            <label className="form-check-label" htmlFor="dataPrivacyCheckboxBusiness">
                                                                Acepto el
                                                                {' '}
                                                                <a href="https://cumbi.co/aviso-de-privacidad" target="_blank" rel="noopener noreferrer">Aviso de Privacidad</a>
                                                                {' '}
                                                                y confirmo que los he leído y entendido.
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 mb-4">
                                                        <button
                                                            className="btn btn-primary w-100"
                                                            type="submit"
                                                        >
                                                            Registrar
                                                        </button>
                                                    </div>
                                                </form>
                                                <p>
                                                    {/* <br></br>
                                                        Si quieres registrar tu negocio, escríbenos para realizar la validación:
                                                        <b><a target="_blank" href="https://wa.me/573044433331"> Línea Cumbi</a></b> */}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-12 mb-4">
                                            <a className="nav-link text-primary text-decoration-underline" onClick={() => navigate('/')}>Ya tengo un usuario</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
