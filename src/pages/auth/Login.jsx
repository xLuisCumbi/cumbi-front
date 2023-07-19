import { useState  } from "react";
import  Alert from "../../components/Alert";
import UserService from "../../services/UserService";
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPasword] = useState("");
 
    const handleLoignSubmit = async (e) => {

        e.preventDefault();
       
        if(email == ''){
            
            Alert('failed', 'Kinldy input email', 3);

        }else if(password == ''){

            Alert('failed', 'Kinldy input password', 3);

        }else{

            Alert('success', 'loading', 30);
            
            const login = await UserService.Login(email, password);
            if(login.status === 'success'){

                Alert('success', 'Login Successful', 3);

                navigate('/admin');

            }else{
                Alert('failed', login.message, 5);
            }

        }

    }


    
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
                                            <span className="d-none d-lg-block">CumbiAdmin</span>
                                        </a>
                                    </div>

                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="pt-4 pb-2">
                                                <h5 className="card-title text-center pb-0 fs-4">
                                                    Login to Your Account
                                                </h5>
                                                <p className="text-center small">
                                                    Enter your email & password to login
                                                </p>
                                            </div>                                       

                                            <form className="row g-3 needs-validation" noValidate onSubmit={ handleLoignSubmit }>
                                                <div className="col-12">
                                                    <label htmlFor="yourEmail" className="form-label">
                                                        Email
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="email"
                                                        value={email}
                                                        onChange={ (e) => setEmail(e.target.value)}
                                                        required
                                                    />
                                                </div>

                                                <div className="col-12">
                                                    <label htmlFor="yourPassword" className="form-label">
                                                        Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        id="password"
                                                        value={password}
                                                        onChange={ (e) => setPasword(e.target.value)}
                                                        required
                                                    />
                                                </div>

                                                <div className="col-12">
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            name="remember"
                                                            value="true"
                                                            id="rememberMe"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="rememberMe"
                                                        >
                                                            Remember me
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-12 mb-4">
                                                    <button
                                                        className="btn btn-primary w-100"
                                                        type="submit"
                                                    >
                                                        Login
                                                    </button>
                                                </div>
                                            </form>
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
