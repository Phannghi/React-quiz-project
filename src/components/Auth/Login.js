import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";
import { postLogin } from '../../services/apiService';
import { toast } from 'react-toastify'
import './Login.scss'
const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = async () => {
        // validate

        // submit api
        let data = await postLogin(email, password);
        console.log('check resp Login: ', data);

        if (data && data.EC === 0) {
            toast.success(data.EM);
            navigate('/');
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }
    return (
        <div className='log-container'>
            <div className="header">
                <span>Don't have an account yet?</span>
                <div>
                    <button
                        className='btn btn-light border-dark'
                        onClick={() => navigate('/register')}>
                        Sign up
                    </button>
                </div>
            </div>
            <div className="title col-3 mx-auto text-center">
                Admin Site
            </div>
            <div className="welcome col-3 mx-auto text-center">
                Hello, Who is this?
            </div>
            <div className="content-form col-3 mx-auto">
                <div className="form-group">
                    <label htmlFor="email" className='form-label'>Email</label>
                    <input type="email" id='email'
                        placeholder='bruce@wayne.com'
                        className='form-control'
                        autoComplete='email'
                        email={email}
                        onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className='form-label'>Password</label>
                    <input type="password" id='password'
                        placeholder='At least 6 characters'
                        className='form-control'
                        password={password}
                        autoComplete='current-password'
                        onChange={(event) => setPassword(event.target.value)} />
                </div>
                <span className='form-text-forgot'>Forgot password ?</span>
                <div className="mt-2">
                    <button
                        className='btn btn-dark w-100 fs-5'
                        onClick={() => handleLogin()}>
                        Login
                    </button>
                </div>
                <div className="back">
                    <span className='d-flex gap-2 align-items-center'
                        onClick={() => { navigate('/') }}>
                        <FaArrowLeft />Go to homepage
                    </span>
                </div>
            </div>
        </div>
    )
}
export default Login;