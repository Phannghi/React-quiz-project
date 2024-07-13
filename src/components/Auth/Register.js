import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import './Login.scss'
import { registerUser } from '../../services/apiService';
import Language from '../Header/Language';
import { useTranslation } from 'react-i18next';
const Register = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const navigate = useNavigate();
    const { t } = useTranslation();

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
                <Language />
                <span>{t('register.header.title')}</span>
                <div>
                    <button
                        className='btn btn-light border-dark'
                        onClick={() => navigate('/login')}>
                        {t('register.header.btnLogin')}
                    </button>
                </div>
            </div>
            <div className="title col-3 mx-auto text-center">
                {t('register.title')}
            </div>
            <div className="welcome col-3 mx-auto text-left">
                {t('register.welcome')}
            </div>
            <div className="content-form col-3 mx-auto">
                <div className="form-group">
                    <label htmlFor="email" className='form-label'>{t('register.form.email')}</label>
                    <input type="email" id='email'
                        placeholder={t('register.form.placeholderEmail')}
                        className='form-control'
                        autoComplete='email'
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className='form-label'>{t('register.form.password')}</label>
                    <input type="password" id='password'
                        placeholder={t('register.form.placeholderPassword')}
                        className='form-control'
                        autoComplete='new-password'
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="username" className='form-label'>{t('register.form.username')}</label>
                    <input type="text" id='username'
                        placeholder={t('register.form.placeholderUsername')}
                        className='form-control'
                        autoComplete='username'
                        required
                        value={userName}
                        onChange={(event) => setUserName(event.target.value)} />
                </div>
                <div className="form-group form-check">
                    <input className="form-check-input" type="checkbox" value="" id="form-check" required />
                    <label className="form-check-label" htmlFor="form-check">
                        {t('register.form.terms')}
                    </label>
                </div>
                <div className="mt-2">
                    <button
                        className='btn btn-dark w-100'
                        onClick={handleRegister}>
                        {t('register.form.btnRegister')}
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Register;