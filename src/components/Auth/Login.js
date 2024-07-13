import { useState, useTransition } from 'react';
import './Login.scss'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";
import { postLogin } from '../../services/apiService';
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';
import Language from '../Header/Language';
import { useTranslation } from 'react-i18next';
const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();
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

    const handleOnKeyDown = (event) => {
        if (event && event.key === 'Enter') {
            handleLogin();
        }
    }

    return (
        <div className='log-container'>
            <div className="header">
                <Language />
                <span>{t('login.header.title')}</span>
                <div>
                    <button
                        className='btn btn-light border-dark'
                        onClick={() => navigate('/register')}>
                        {t('login.header.btnSignUp')}
                    </button>
                </div>
            </div>
            <div className="title col-3 mx-auto text-center">
                {t('login.title')}
            </div>
            <div className="title2 welcome col-3 mx-auto text-center">
                {t('login.title2')}
            </div>
            <div className="content-form col-3 mx-auto">
                <div className="form-group">
                    <label htmlFor="email" className='form-label'>{t('login.form.email')}</label>
                    <input type="email" id='email'
                        placeholder={t('login.form.placeholderEmail')}
                        className='form-control'
                        autoComplete='email'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className='form-label'>{t('login.form.password')}</label>
                    <input type="password" id='password'
                        placeholder={t('login.form.placeholderPassword')}
                        className='form-control'
                        value={password}
                        autoComplete='current-password'
                        onChange={(event) => setPassword(event.target.value)}
                        onKeyDown={(event) => handleOnKeyDown(event)} />
                </div>
                <span className='form-text-forgot'>{t('login.form.forgotPassword')}</span>
                <div className="mt-2">
                    <button
                        className='btn btn-dark w-100 fs-5'
                        onClick={handleLogin}
                        disabled={isLoading}>
                        {isLoading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />}
                        <span>{t('login.form.btnLogin')}</span>
                    </button>
                </div>
                <div className="back">
                    <span className='d-flex gap-2 align-items-center'
                        onClick={() => navigate('/')}>
                        <FaArrowLeft />{t('login.form.backToHomepage')}
                    </span>
                </div>
            </div>
        </div>
    )
}
export default Login;