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

const Header = () => {
    const account = useSelector(state => state.user.account)
    //console.log('check account', account);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                {/* <Navbar.Brand href="#home">Gucci Dior</Navbar.Brand> */}
                <NavLink to="/" className="navbar-brand">Gucci Dior</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className='nav-link'>Home</NavLink>
                        <NavLink to="/users" className='nav-link'>User</NavLink>
                        <NavLink to="/admin" className='nav-link'>Admin</NavLink>
                    </Nav>
                    <Nav>
                        <Language />
                        {isAuthenticated === false ?
                            <>
                                <Button
                                    variant='light'
                                    className='btn-login me-3 border-dark'
                                    onClick={() => handleLogin()}>Log in</Button>
                                <Button
                                    variant='dark'
                                    className='btn-sign'
                                    onClick={() => handleRegister()}>Sign up</Button>
                            </> :
                            <NavDropdown title={`Hello, ${account.username}`} id="basic-nav-dropdown">
                                <NavDropdown.Item > Profile </NavDropdown.Item>
                                <NavDropdown.Item >Setting</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => handleLogOut()}>Log out </NavDropdown.Item>
                            </NavDropdown>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;