/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { InputWithSearchComp } from '../../stories/InputWithSearch/InputWithSearch';
import { BsFilter, BsPlusLg, BsGraphUp } from 'react-icons/bs';
import { Button } from '../../stories/Button';
import { withRouter } from 'react-router-dom';
import { CommonDropDownComp } from '../../stories/CommonDropdown/CommonDropdownComp';
// import iconExport from "../../media/iconExport.png";

import { TableComponent } from '../../stories/TableComponent/TableComponent';
const TicketDataTable = (props) => {
    const [tableShow, setTableShow] = useState(true);
    const [actionDropdown, setActionDropdown] = useState(false);
    const [actionIndex, setActionIndex] = useState('');

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
                        <div className="d-flex justify-content-end">
                            <Button
                                label="Export"
                                btnClass="primary-outlined mx-2"
                                size="small"
                                shape="btn-square"
                                Icon={BsGraphUp}
                                // onClick={() => props.history.push("/")}
                            />

                            {props.allbtn === 1 ? (
                                <span>
                                    <Button
                                        label="Reassign Evaluator"
                                        btnClass="primary-outlined mx-2"
                                        size="small"
                                        shape="btn-square"
                                        Icon={BsPlusLg}
                                        onClick={() =>
                                            props.history.push(
                                                '/admin/reassign'
                                            )
                                        }
                                    />
                                    <Button
                                        label="Randomly Assign Evalutor"
                                        btnClass="primary mx-2"
                                        size="small"
                                        shape="btn-square"
                                        Icon={BsPlusLg}
                                        // onClick={() => props.history.push("/")}
                                    />
                                </span>
                            ) : (
                                ''
                            )}
                        </div>
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
                                        // onClick={() => props.history.push("/NewTicket")}
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
