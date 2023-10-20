import { useEffect, useState } from "react";
import Alert from "../../components/Alert";
import { useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";

export default function Register() {
    const maxSizeDoc = 5
    const navigate = useNavigate();
    const [countryList, setCountryList] = useState([])
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'person',
        payment_fee: 0,
        document: null,
    });
    const [businessData, setBusinessData] = useState({
        id_tax: '',
        name: '',
        web: '',
        country: '',
        email: '',
        payment_fee: 0,
        role: 'business',
        document: null,
    });
    const [userBusinessData, setUserBusinessData] = useState({
        username: '',
        business: '',
        email: '',
        password: '',
        role: 'admin',
        payment_fee: 0,
        document: null,
    });

    useEffect(() => {
        ApiService.getCountry("").then(
            (response) => {
                if (response.status === 'success') {
                    setCountryList(response.countries)
                    setBusinessData({
                        ...businessData,
                        country: response.countries[0]._id
                    })
                }
            },
            (error) => {
                Alert('failed', 'Error fetching', 3);
                console.error(error)
            }
        );

    }, []);

    function verifyFile(file) {
        // Verificar el tamaño del archivo (en bytes)
        if (file && file.size > 1024 * 1024 * maxSizeDoc) {
            alert(`El archivo es demasiado grande. Debe ser menor de ${maxSizeDoc} MB.`);
            e.target.value = null; // Limpia el campo de entrada para que el usuario seleccione otro archivo.
            return false;
        }

        // Verificar el tipo de archivo
        if (file && !file.type.includes('pdf')) {
            // Verificar que el tipo de archivo sea PDF
            alert('El archivo debe ser un PDF.');
            e.target.value = null; // Limpia el campo de entrada para que el usuario seleccione otro archivo.
            return false;
        }
        return true
    }

    const handleFilePerson = (e) => {
        const selectedFile = e.target.files[0];

        if (verifyFile(selectedFile))
            setUserData({
                ...userData,
                document: selectedFile,
            })
    }

    const handleFileBusiness = (e) => {
        const selectedFile = e.target.files[0];

        if (verifyFile(selectedFile))
            setBusinessData({
                ...businessData,
                document: selectedFile,
            })
    }

    const handleSubmitPerson = async (e) => {
        e.preventDefault();


        for (let key in userData) {
            if (userData[key] === '' || userData[key] === null) {
                Alert('failed', `input ${key} is required`, 3);
                return;
            }
        }
        console.log("person")

        Alert("success", "loading", 30);

        ApiService.post('/signup', { ...userData }).then(
            (response) => {
                if (response.status === 'signUp_success') {
                    Alert('success', 'User Registered', 3);
                }
            },
            (err) => {
                console.error(err)
                Alert('failed', 'Error in creating user', 3);
            }
        );
    };

    const handleSubmitBusiness = async (e) => {
        e.preventDefault();
        console.log("business")
        return
        if (email == "") {
            Alert("failed", "Kinldy input email", 3);
        } else if (password == "") {
            Alert("failed", "Kinldy input password", 3);
        } else {
            Alert("success", "loading", 30);

            const login = await UserService.Login(email.toLowerCase(), password);
            if (login.status === "success") {
                Alert("success", "Login Successful", 3);

                navigate("/admin");
            } else {
                Alert("failed", login.message, 5);
            }
        }
    };

    return (
        <>
            <main>
                <div className="container">
                    <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                                    <div className="d-flex justify-content-center py-4">
                                        <a
                                            href="index.html"
                                            className="logo d-flex align-items-center w-auto text-decoration-none"
                                        >
                                            <img src="/images/logo.png" alt="" />
                                            <span className="d-none d-lg-block">Cumbi Dashboard</span>
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
                                                    <button className="nav-link active" id="person-tab" data-bs-toggle="tab" data-bs-target="#person-tab-pane" type="button"
                                                        role="tab" aria-controls="person-tab-pane" aria-selected="true">Person</button>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link" id="business-tab" data-bs-toggle="tab" data-bs-target="#business-tab-pane" type="button"
                                                        role="tab" aria-controls="business-tab-pane" aria-selected="false">Business</button>
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
                                                        <div className="col-12">
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
                                                        <div className="col-12">
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
                                                        <div className="col-12">
                                                            <label className="form-label">Identification Document</label>
                                                            <input type="file" accept=".pdf" onChange={handleFilePerson} />
                                                        </div>

                                                        <div className="col-12 mb-4">
                                                            <button
                                                                className="btn btn-primary w-100"
                                                                type="submit"
                                                            >
                                                                Register
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
                                                        <div className="col-12">
                                                            <label className="form-label">Name Business</label>
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
                                                        <div className="col-12">
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
                                                        <div className="col-12">
                                                            <label className="form-label">Email Business</label>
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
                                                        <div className="col-12">
                                                            <label className="form-label">Country</label>
                                                            <select
                                                                type="text"
                                                                className="form-control"
                                                                value={businessData.country}
                                                                onChange={(e) => {
                                                                    setBusinessData({
                                                                        ...businessData,
                                                                        country: e.target.value,
                                                                    })
                                                                }
                                                                }
                                                                required
                                                            >
                                                                {countryList.map(country =>
                                                                    <option value={country._id} key={country._id}>{country.name}</option>)
                                                                }
                                                            </select>
                                                        </div>
                                                        <div className="col-12">
                                                            <label className="form-label">Identification Document</label>
                                                            <input type="file" accept=".pdf" onChange={handleFileBusiness} />
                                                        </div>
                                                        {/* <div className="col-12">
                                                            <label className="form-label">Password</label>
                                                            <input
                                                                type="password"
                                                                className="form-control"
                                                                value={businessData.password}
                                                                onChange={(e) =>
                                                                    setBusinessData({
                                                                        ...businessData,
                                                                        password: e.target.value,
                                                                    })
                                                                }
                                                                required
                                                            />
                                                        </div> */}
                                                        <div className="col-12">
                                                            <label className="form-label">Username Admin</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={userBusinessData.username}
                                                                onChange={(e) =>
                                                                    setUserBusinessData({
                                                                        ...userBusinessData,
                                                                        username: e.target.value,
                                                                    })
                                                                }
                                                                required
                                                            />
                                                        </div>
                                                        <div className="col-12">
                                                            <label className="form-label">Email Admin</label>
                                                            <input
                                                                type="email"
                                                                className="form-control"
                                                                value={userBusinessData.email}
                                                                onChange={(e) =>
                                                                    setUserBusinessData({
                                                                        ...userBusinessData,
                                                                        email: e.target.value,
                                                                    })
                                                                }
                                                                required
                                                            />
                                                        </div>
                                                        <div className="col-12">
                                                            <label className="form-label">Password</label>
                                                            <input
                                                                type="password"
                                                                className="form-control"
                                                                value={userBusinessData.password}
                                                                onChange={(e) =>
                                                                    setUserBusinessData({
                                                                        ...userBusinessData,
                                                                        password: e.target.value,
                                                                    })
                                                                }
                                                                required
                                                            />
                                                        </div>
                                                        <div className="col-12 mb-4">
                                                            <button
                                                                className="btn btn-primary w-100"
                                                                type="submit"
                                                            >
                                                                Register
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                            <div className="col-12 mb-4">
                                                <a className="nav-link" onClick={() => navigate('/')}>Go to Login</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}
