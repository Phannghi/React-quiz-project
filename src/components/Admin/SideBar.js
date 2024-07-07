import 'react-pro-sidebar/dist/css/styles.css';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart, FaCouch } from 'react-icons/fa';
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
                        <span className='text-white' role='button' onClick={() => navigate('/')}> QUIZZ </span>
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
                                Quản lý users
                                <Link to='/admin/manage-users' />
                            </MenuItem>
                            <MenuItem>
                                Quản lý bài quiz
                                <Link to='/admin/manage-quizzes' />
                            </MenuItem>
                            <MenuItem>
                                Quản lý Câu hỏi
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
                            <FaCouch />
                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                Gucci
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    )
}
export default SideBar;