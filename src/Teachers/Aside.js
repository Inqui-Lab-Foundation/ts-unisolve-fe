import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import DashboardIcon from '../assets/media/DashboardIcon.svg';

import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarContent
} from 'react-pro-sidebar';
import { FaShieldVirus, FaBars } from 'react-icons/fa';

import 'react-pro-sidebar/dist/css/styles.css';
import { useLocation } from 'react-router-dom';
import CourseIcon from '../assets/media/CoursesIcon.svg';
// import Logo from "../../assets/img/Logo.png";
import Logo from '../assets/media/img/Logo.svg';
const Aside = ({ rtl, toggled, handleToggleSidebar }) => {
    // const intl = useIntl();

    const location = useLocation();

    //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(false);

    //create a custom function that will change menucollapse state from false to true and true to false
    const menuIconClick = (val) => {
        //condition checking to change state from true to false and vice versa
        setMenuCollapse(val);
        // menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };

    useEffect(() => {
        if (location.pathname === '/admin/playvideo') {
            // document.querySelector(".pro-sidebar").classList.add("collapsed");
            setMenuCollapse(true);
        }
    });
    // console.log("-----57", location.pathname);

    return (
        <ProSidebar
            rtl={rtl}
            toggled={toggled}
            breakPoint="md"
            onToggle={handleToggleSidebar}
            collapsed={menuCollapse}
        >
            <SidebarHeader>
                <div className="sidebar-header header-comp sticky-top">
                    <div className="d-flex logo-section">
                        {menuCollapse ? (
                            <img
                                src={Logo}
                                alt="logo"
                                className="img-fluid img-close"
                            />
                        ) : (
                            <>
                                <img
                                    src={Logo}
                                    alt="logo"
                                    className="img-fluid img-open"
                                />
                                <div className="logo-box my-auto">
                                    <h3 className="logo-title m-0">Unisolve</h3>
                                    {/* <p className="logo-state m-0">India</p> */}
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className="closemenu">
                    {/* changing menu collapse icon on click */}
                    {menuCollapse ? (
                        <FaBars onClick={() => menuIconClick(false)} />
                    ) : (
                        <FaBars onClick={() => menuIconClick(true)} />
                    )}
                </div>
            </SidebarHeader>

            <SidebarContent>
                <Menu iconShape="circle">
                    <MenuItem className="static">
                        {menuCollapse ? '' : <span>MAIN MENU</span>}
                    </MenuItem>

                    <MenuItem
                        icon={<img src={DashboardIcon} />}
                        className={
                            location.pathname === '/teacher/pre-servey' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink exact={true} to={'/teacher/pre-servey'}>
                            Pre Servey
                        </NavLink>
                    </MenuItem>

                    <MenuItem
                        icon={<img src={DashboardIcon} />}
                        className={
                            location.pathname === '/teacher/dashboard' &&
                            'sidebar-active'
                        }
                        // suffix={<span className="badge red">new1</span>}
                    >
                        <NavLink exact={true} to={'/teacher/dashboard'}>
                            Dashboard
                        </NavLink>
                    </MenuItem>
                    <MenuItem
                      icon={<img src={CourseIcon} />}
                      className={
                        location.pathname === `/teacher/playvideo/${1}` && "sidebar-active"
                      }
                    >
                      <NavLink exact={true} to={`/teacher/playvideo/${1}`}>
                        Teacher Courses
                      </NavLink>
                  </MenuItem>
                    {/* <MenuItem
            icon={<FaShieldVirus />}
            className={
              location.pathname === "/admin/registered-schools" &&
              "sidebar-active"
            }
          >
            <NavLink
              exact={true}
              to={"/admin/registered-schools"}
              activeClassName="sidebar-active"
            >
              Schools Registered
            </NavLink>
          </MenuItem> */}

                    <MenuItem
                        icon={<FaShieldVirus />}
                        className={
                            location.pathname === '/teacher/teamlist' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink
                            exact={true}
                            to={'/teacher/teamlist'}
                            activeClassName="sidebar-active"
                        >
                            Teams
                        </NavLink>
                    </MenuItem>

                    <MenuItem
                        icon={<FaShieldVirus />}
                        className={
                            location.pathname === '/teacher/faq' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink
                            exact={true}
                            to={'/teacher/faq'}
                            activeClassName="sidebar-active"
                        >
                            {' '}
                            Manage FAQ&apos;s
                        </NavLink>
                    </MenuItem>

                    {/* <MenuItem
              className={location.pathname === "/admin/faq" && "sidebar-active"}
            >
              <NavLink exact={true} to={"/admin/faq"}>
                Manage FAQ's
              </NavLink>
            </MenuItem> */}

                    {/* <MenuItem
            icon={<img src={ProblemIcon} />}
            className={
              location.pathname === "/admin/problem-categories" &&
              "sidebar-active"
            }
          >
            <NavLink exact={true} to={"/admin/problem-categories"}>
              Problem Categories
            </NavLink>
          </MenuItem> */}
                    {/* <MenuItem
            icon={<img src={UserIcon} />}
            className={
              location.pathname === "/admin/userlist" && "sidebar-active"
            }
          >
            <NavLink exact={true} to={"/admin/userlist"}>
              User List
            </NavLink>
          </MenuItem> */}
                    {/* <MenuItem
            icon={<img src={BadgesIcon} />}
            className={
              location.pathname === "/admin/badges" && "sidebar-active"
            }
          >
            <NavLink
              exact={true}
              to={"/admin/badges"}
              activeClassName="sidebar-active"
            >
              Badges
            </NavLink>
          </MenuItem> */}
                    {/* <MenuItem
            icon={<img src={IdeasIcon} />}
            className={location.pathname === "/admin/ideas" && "sidebar-active"}
          >
            <NavLink exact={true} to={"/admin/ideas"}>
              Ideas
            </NavLink>
          </MenuItem> */}
                    {/* <MenuItem
            icon={<HiOutlineUserGroup />}
            className={
              location.pathname === "/admin/signup" && "sidebar-active"
            }
          >
            <NavLink exact={true} to={"/admin/signup"}>
              Create Student SignUp
            </NavLink>
          </MenuItem> */}
                    {/* <SubMenu
            suffix={<span className="badge yellow">2</span>}
            title="Sessions & News"
            icon={<img src={SessionIcon} />}
            data-element={location.pathname}
          >
            <MenuItem
              className={
                location.pathname === "/admin/sessions" && "sidebar-active"
              }
            >
              <NavLink exact={true} to={"/admin/sessions"}>
                Manage Sessions
              </NavLink>
            </MenuItem>
            <MenuItem
              className={
                location.pathname === "/admin/news" && "sidebar-active"
              }
            >
              <NavLink to={"/admin/news"}>News</NavLink>
            </MenuItem>
          </SubMenu> */}
                </Menu>

                {/* <Menu iconShape="circle">
          <MenuItem className="static">
            {menuCollapse ? "" : <span>GENERAL</span>}
          </MenuItem>
          <SubMenu
            suffix={<span className="badge yellow">2</span>}
            title="Help"
            icon={<FaQuestionCircle />}
            data-element={location.pathname}
          >
            <MenuItem
              className={location.pathname === "/admin/faq" && "sidebar-active"}
            >
              <NavLink exact={true} to={"/admin/faq"}>
                Manage FAQ's
              </NavLink>
            </MenuItem>
            <MenuItem
              className={
                location.pathname === "/admin/tickets" && "sidebar-active"
              }
            >
              <NavLink to={"/admin/all-tickets"}>Tickets</NavLink>
            </MenuItem>
          </SubMenu>
        </Menu> */}
            </SidebarContent>

            {/* <SidebarFooter style={{ textAlign: "center" }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: "20px 24px",
          }}
        >
          <a
            href="#"
            target="_blank"
            className="sidebar-btn"
            rel="noopener noreferrer"
          >
            <span> Footer</span>
          </a>
        </div>
      </SidebarFooter> */}
        </ProSidebar>
    );
};

export default Aside;
