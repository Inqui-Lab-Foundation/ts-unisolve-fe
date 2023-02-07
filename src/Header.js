/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './Header.scss';
import { FaBars } from 'react-icons/fa';
import { Row, Col, Navbar } from 'reactstrap';
// import { NavLink } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { CommonDropDownComp } from './stories/CommonDropdown/CommonDropdownComp';
// import LanguageSelectorComp from "./components/LanguageSelectorComp";
import { logout } from './helpers/Utils';

// import {
//     FaTachometerAlt,
//     FaGem,
//     FaList,
//     FaGithub,
//     FaRegLaughWink,
//     FaHeart,
// } from "react-icons/fa";
import { VscBell } from 'react-icons/vsc';
import AvatarImg from './assets/img/Avatar.png';

import { InputWithSearch } from './stories/InputWithSearch/InputWithSearch.stories';
// import { DropDownComp } from "./stories/DropdownComp/DropdownComp";
import { Badge } from 'antd';
// import LogoutView from "./Pages/LogoutView";

const Header = (props) => {
    const history = useHistory();
    // const headerOptions = ["Home", "My Profile", "My Settings", "Logout"];
    const profileOpt = {
        options: [
            { name: 'Home', path: '/dashboard' },
            { name: 'My Profile', path: '/my-profile' },
            { name: 'My Settings', path: '/settings' },
            { name: 'Logout', path: '', onClick: () => logout(history) }
        ],
        name: 'Ritu',
        img: AvatarImg
    };
    const notifyOpt = {
        options: [
            { name: 'You have a new Notification', path: '/notification' }
        ],
        Icon: VscBell
    };

    const [selectedOption, setSelectedOption] = useState('');
    const option = JSON.parse(localStorage.getItem('headerOption'));
    const headerProps = {
        size: 'large',
        placeholder: 'Search',
        isLogin: false
    };
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    window.onunload = function () {
        localStorage.setItem('headerOption', JSON.stringify('Home'));
    };

    const handleSelect = async (e) => {
        localStorage.setItem('headerOption', JSON.stringify(e.target.value));
        const responce = await e.target.value;
        setSelectedOption(responce);
        switch (e.target.value) {
            case 'Home':
                history.push('/dashboard');
                break;
            case 'My Profile':
                history.push('/my-profile');
                break;
            case 'My Settings':
                history.push('/settings');
                break;
            case 'Logout':
                history.push('/logout');
                break;
            default:
        }
    };

    return (
        <header>
            <div className="header-comp sticky-top py-3">
                <div className="header-container">
                    <div className="tollbar">
                        <div
                            className={`btn-toggle dfdf`}
                            onClick={() => props.handleToggleSidebar(true)}
                        >
                            <FaBars />
                        </div>
                        <Navbar>
                            <Row className="justify-content-between w-100">
                                <Col md={6}>
                                    <InputWithSearch {...headerProps} />
                                </Col>
                                <Col md={6} className="d-flex profile-section">
                                    <Badge
                                        status="success"
                                        count={1}
                                        className="notify-sec"
                                    >
                                        <CommonDropDownComp {...notifyOpt} />
                                        {/* <NavLink exact to={"/notification"}>
                      <VscBell />
                    </NavLink> */}
                                    </Badge>

                                    <div className="d-flex align-items-center profile">
                                        <CommonDropDownComp {...profileOpt} />
                                        <span className="common-language-selc">
                                            {/* <LanguageSelectorComp /> */}
                                        </span>

                                        {/* <DropDownComp
                      options={headerOptions}
                      value={option}
                      onChange={(e) => handleSelect(e)}
                    /> */}
                                    </div>
                                </Col>
                            </Row>
                        </Navbar>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
