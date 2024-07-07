import SideBar from "./SideBar";
import './Admin.scss';
import { FaBars } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useSelector } from "react-redux";
import Language from "../Header/Language";
import { NavDropdown } from "react-bootstrap";

const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const account = useSelector(state => state.user.account)

    useEffect(() => {
        document.body.classList.add('ovf-hidden');
        return () => {
            document.body.classList.remove('ovf-hidden');
        };
    }, [])

    const handleLogOut = () => {

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
                            <NavDropdown.Item > Profile </NavDropdown.Item>
                            <NavDropdown.Item >Setting</NavDropdown.Item>
                            <NavDropdown.Divider />
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