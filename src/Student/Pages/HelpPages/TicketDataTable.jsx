/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { InputWithSearchComp } from '../../../stories/InputWithSearch/InputWithSearch.jsx';
// import { DropDownComp } from "../../stories/DropdownComp/DropdownComp";
import { BsFilter, BsPlusLg } from 'react-icons/bs';
// import { HiDotsHorizontal } from "react-icons/hi";
import { Button } from '../../../stories/Button.jsx';
// import { Tag } from "antd";
import { withRouter } from 'react-router-dom';
// import { BsThreeDots } from "react-icons/bs";
// import { BiEditAlt } from "react-icons/bi";
// import { AiFillDelete } from "react-icons/ai";
// import { Dropdown } from "react-bootstrap";
import { CommonDropDownComp } from '../../../stories/CommonDropdown/CommonDropdownComp.jsx';

import { TableComponent } from '../../../stories/TableComponent/TableComponent.jsx';
const TicketDataTable = (props) => {
    const [tableShow] = useState(true);
    const [actionDropdown] = useState(false);
    const [actionIndex] = useState('');

    // const handleAction = (index) => {
    //     setActionIndex(index.key);
    //     if (!actionDropdown) {
    //         setActionDropdown(true);
    //     } else if (actionDropdown) {
    //         setActionDropdown(false);
    //     }
    // };

    const typeProps = {
        name: 'type: All',

        options: [
            { name: 'type: All', path: '' },
            { name: 'type: 1', path: '' },
            { name: 'type: 2', path: '' }
        ]
    };

    const statusFilter = {
        name: 'Status: All',
        options: [
            { name: 'All', path: '' },
            { name: 'Open', path: '' },
            { name: 'Draft', path: '' },
            { name: 'Solved', path: '' }
        ]
    };
    const filterDropProps = {
        name: 'Filter by',
        Icon: BsFilter,
        options: [
            { name: 'Course - 1', path: '/playCourse' },
            { name: 'Course - 2', path: '/playCourse' }
        ]
    };
    return (
        <div>
            <div className="tableActionTemplate">
                <Row>
                    <Col
                        sm={12}
                        md={12}
                        lg={3}
                        className="mb-5 mb-sm-5 mb-md-5 mb-lg-0"
                    >
                        <InputWithSearchComp placeholder="Search ticket" />
                    </Col>
                    <Col className="col-auto mb-5 mb-sm-5 mb-md-5 mb-lg-0">
                        <div className="d-flex action-drops">
                            <CommonDropDownComp {...typeProps} />
                            <CommonDropDownComp {...statusFilter} />
                            <CommonDropDownComp {...filterDropProps} />
                        </div>
                    </Col>

                    <Col className="ticket-btn col ml-auto ">
                        <Button
                            label="New Ticket"
                            btnClass="primary"
                            size="small"
                            shape="btn-square"
                            Icon={BsPlusLg}
                            onClick={() => props.history.push('/NewTicket')}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <div className="ticket-table">
                            {tableShow ? (
                                <TableComponent {...props} />
                            ) : (
                                <div className="add-ticket">
                                    <Button
                                        btnClass="primary"
                                        size="small"
                                        shape="btn-circle"
                                        Icon={BsPlusLg}
                                        onClick={() =>
                                            props.history.push('/NewTicket')
                                        }
                                    />
                                    <p className="text">Add a Ticket</p>
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default withRouter(TicketDataTable);
