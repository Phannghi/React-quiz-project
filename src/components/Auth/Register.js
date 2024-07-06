import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import './Login.scss'
import { registerUser } from '../../services/apiService';
import Language from '../Header/Language';
const Register = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const navigate = useNavigate();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const validatePasswordLength = (password) => {
        return password.length >= 6;
    }
    const handleRegister = async () => {
        // validate
        const isValidEmail = validateEmail(email);
        const isValidPassword = validatePasswordLength(password);
        if (!isValidEmail) {
            toast.error('Invalid email');
            return;
        }
        if (!isValidPassword) {
            toast.error('Password has to be at least 6 characters long');
            return;
        }
        // submit api
        let data = await registerUser(email, password, userName);
        console.log('check resp Register: ', data);

        if (data && data.EC === 0) {
            toast.success(data.EM);
            navigate('/login');
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }
    return (
        <div className='log-container'>
            <div className="header">
                <span>Already have an account?</span>
                <div>
                    <button
                        className='btn btn-light border-dark'
                        onClick={() => navigate('/login')}>
                        Login
                    </button>
                </div>
                <Language />
            </div>
            <div className="title col-3 mx-auto text-center">
                Register new account
            </div>
            <div className="welcome col-3 mx-auto text-left">
                Get better data with conversational form, survey, quizzes and more
            </div>
            <div className="content-form col-3 mx-auto">
                <div className="form-group">
                    <label htmlFor="email" className='form-label'>Email</label>
                    <input type="email" id='email'
                        placeholder='bruce@wayne.com'
                        className='form-control'
                        autoComplete='email'
                        required
                        email={email}
                        onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className='form-label'>Password</label>
                    <input type="password" id='password'
                        placeholder='At least 6 characters'
                        className='form-control'
                        password={password}
                        autoComplete='new-password'
                        required
                        onChange={(event) => setPassword(event.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="username" className='form-label'>Username</label>
                    <input type="text" id='username'
                        placeholder='Your name'
                        className='form-control'
                        password={userName}
                        autoComplete='username'
                        required
                        onChange={(event) => setUserName(event.target.value)} />
                </div>
                <div className="form-group form-check">
                    <input className="form-check-input" type="checkbox" value="" id="form-check" required />
                    <label className="form-check-label" htmlFor="form-check">
                        I agree to Dior's <span>Terms of Service</span>
                    </label>
                </div>
                <div className="mt-2">
                    <button
                        className='btn btn-dark w-100'
                        onClick={() => handleRegister()}>
                        Create my new account
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Register;