import 'react-pro-sidebar/dist/css/styles.css';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { FaTachometerAlt, FaGem, FaGithub } from 'react-icons/fa';
import { DiReact } from "react-icons/di";
import './SideBar.scss'
import { Link, useNavigate } from 'react-router-dom';
const SideBar = (props) => {
    const navigate = useNavigate();
    const { collapsed, toggled, handleToggleSidebar } = props;
    return (
        <>
            <ProSidebar
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <DiReact className='me-1' size='3em' color='aqua' />
                        <span className='text-white' role='button' onClick={() => navigate('/')}>
                            Nghi Phan
                        </span>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<FaTachometerAlt />}
                            suffix={<span className="badge red d-inline-block p-1 bg-danger text-white">New</span>}
                        >
                            Dashboard
                            <Link to='/admin' />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            icon={<FaGem />}
                            title='Features'
                        >
                            <MenuItem>
                                Manage Users
                                <Link to='/admin/manage-users' />
                            </MenuItem>
                            <MenuItem>
                                Manage Quizzes
                                <Link to='/admin/manage-quizzes' />
                            </MenuItem>
                            <MenuItem>
                                Manage Questions
                                <Link to='/admin/manage-questions' />
                            </MenuItem>
                        </SubMenu>

                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="https://github.com/Phannghi/demoReact/tree/master"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <FaGithub />
                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                Github
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    )
}
export default SideBar;