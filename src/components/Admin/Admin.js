import SideBar from "./SideBar";
import './Admin.scss';
import { FaBars } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useSelector, useDispatch } from "react-redux";
import Language from "../Header/Language";
import { NavDropdown } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../services/apiService';
import { toast } from 'react-toastify';
import { doLogOut } from '../../redux/action/userAction';

const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const account = useSelector(state => state.user.account)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add('ovf-hidden');
        return () => {
            document.body.classList.remove('ovf-hidden');
        };
    }, [])

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
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <span onClick={() => setCollapsed(!collapsed)}>
                        <FaBars className="left-side" />
                    </span>
                    <div className="right-side">
                        <Language />
                        <NavDropdown title={`Hello, ${account.username}`} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={() => handleLogOut()}>Log out </NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </div>
                <div className="admin-main">
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>
            </div>
        </div>
    )
}
export default Admin;