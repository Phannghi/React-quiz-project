import { useState } from 'react';
import './Login.scss'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";
import { postLogin } from '../../services/apiService';
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';
const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleLogin = async () => {
        // validate
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error('Invalid email');
            return;
        }
        if (!password) {
            toast.error('Invalid password');
            return;
        }

        setIsLoading(true);
        // submit api
        let data = await postLogin(email, password);
        //console.log('check resp Login: ', data);

        if (data && data.EC === 0) {
            dispatch(doLogin(data));
            toast.success(data.EM);
            setIsLoading(false);
            navigate('/');
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
            setIsLoading(false);
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
                Phan Nghi Practice
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
                        onClick={() => handleLogin()}
                        disabled={isLoading}>
                        {isLoading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />}
                        <span> Login</span>
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