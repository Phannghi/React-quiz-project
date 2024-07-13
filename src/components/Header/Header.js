import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../services/apiService';
import { toast } from 'react-toastify';
import { doLogOut } from '../../redux/action/userAction';
import Language from './Language';
import { useTranslation } from 'react-i18next';
import { NavItem } from 'react-bootstrap';
import { useState } from 'react';
import Profile from './Profile';

const Header = () => {
    const account = useSelector(state => state.user.account)
    //console.log('check account', account);
    const [isShowProfile, setIsShowProfile] = useState(false);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleLogin = () => {
        navigate('/login');
    }
    const handleRegister = () => {
        navigate('/register');
    }
    const handleLogOut = async () => {
        let res = await logOut(account.email, account.refresh_token);
        //console.log('log out:', res);
        if (res && res.EC === 0) {
            dispatch(doLogOut());
            navigate('/login');
            toast.success(res.EM);
        } else {
            toast.error(res.EM);
        }
    }

    const handleNavigateAdmin = () => {
        if (account && account.role && account.role === 'ADMIN') {
            toast.success('Access to Admin successfully');
            navigate('/admin');
        } else {
            toast.error("Your account doesn't have access to Admin ");
            return;
        }
    }

    return (<>
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                {/* <Navbar.Brand href="#home">Gucci Dior</Navbar.Brand> */}
                <NavLink to="/" className="navbar-brand">Nghi Phan</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className='nav-link'>{t('header.home')}</NavLink>
                        <NavLink to="/users" className='nav-link'>{t('header.user')}</NavLink>
                        <Nav.Link onClick={() => handleNavigateAdmin()}
                            className='nav-link'>{t('header.admin')}</Nav.Link>
                    </Nav>
                    <Nav>
                        <Language />
                        {isAuthenticated === false ?
                            <>
                                <Button
                                    variant='light'
                                    className='btn-login me-3 border-dark'
                                    onClick={handleLogin}>{t('header.login')}</Button>
                                <Button
                                    variant='dark'
                                    className='btn-sign'
                                    onClick={handleRegister}>{t('header.signup')}</Button>
                            </> :
                            <NavDropdown title={`${t('header.hello')}, ${account.username}`} id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={() => setIsShowProfile(true)}>{t('header.profile')}</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogOut}>{t('header.logout')}</NavDropdown.Item>
                            </NavDropdown>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Profile
            show={isShowProfile}
            setShow={setIsShowProfile}
        />
    </>


    );
}

export default Header;