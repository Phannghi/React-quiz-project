import videoHomePage from '../../assets/video-homepage.mp4';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
const Home = (props) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    //console.log('account: ', account, 'isAuthenticated: ', isAuthenticated)
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    return (
        <div className="home-container">
            <video autoPlay muted loop playsInline>
                <source src={videoHomePage} type="video/mp4" />
            </video>
            <div className="home-content d-flex gap-2 flex-column">
                <h1 className='title-1'>{t('homepage.title1')}</h1>
                <p className='title-2'>{t('homepage.title2')}</p>
                <div>
                    {isAuthenticated === false ?
                        <button className='btn btn-dark p-2'
                            onClick={() => navigate('/login')}>{t('homepage.btnLogin')}</button>
                        :
                        <button className='btn btn-dark p-2'
                            onClick={() => navigate('/users')}>{t('homepage.btnDoQuiz')}</button>
                    }
                </div>
            </div>
        </div>
    )
}
export default Home;