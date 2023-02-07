import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
// import { InputWithSearchComp } from "../../stories/InputWithSearch/InputWithSearch";
// import { DropDownComp } from "../../stories/DropdownComp/DropdownComp";
import { BsPlusLg } from 'react-icons/bs';
// import { HiDotsHorizontal } from "react-icons/hi";
import { Button } from '../../stories/Button';
// import { Tag } from "antd";
import { withRouter } from 'react-router-dom';
// import { BsThreeDots } from "react-icons/bs";
// import { BiEditAlt } from "react-icons/bi";
// import { AiFillDelete } from "react-icons/ai";
// import { Dropdown } from "react-bootstrap";
// import { CommonDropDownComp } from "../../stories/CommonDropdown/CommonDropdownComp";
import { TableComponent } from '../../stories/TableComponent/TableComponent';

// import iconImport from "../../media/iconImport.png";
// import iconExport from "../../media/iconExport.png";

const TicketDataTable = (props) => {
    // props, ":::::::::::123");
    const [tableShow] = useState(true);
    // const [actionDropdown, setActionDropdown] = useState(false);
    // const [ setActionIndex] = useState("");

    // const handleAction = (index) => {
    //     setActionIndex(index.key);
    //     if (!actionDropdown) {
    //         setActionDropdown(true);
    //     } else if (actionDropdown) {
    //         setActionDropdown(false);
    //     }
    // };

    // const typeProps = {
    //     name: "type: All",

    //     options: [
    //         { name: "type: All", path: "" },
    //         { name: "type: 1", path: "" },
    //         { name: "type: 2", path: "" },
    //     ],
    // };

    // const statusFilter = {
    //     name: "Status: All",
    //     options: [
    //         { name: "All", path: "" },
    //         { name: "Open", path: "" },
    //         { name: "Draft", path: "" },
    //         { name: "Solved", path: "" },
    //     ],
    // };
    // const filterDropProps = {
    //     name: "Filter by",
    //     Icon: BsFilter,
    //     options: [
    //         { name: "Course - 1", path: "/playCourse" },
    //         { name: "Course - 2", path: "/playCourse" },
    //     ],
    // };

    // const addImport = {
    //     name: "Import",
    //     Icon: BsFilter,
    //     options: [
    //         { name: "CSV", path: "" },
    //         { name: "XLV", path: "" },
    //     ],
    // };
    // const addExport = {
    //     name: "Export",
    //     Icon: BsFilter,
    //     options: [
    //         { name: "All", path: "" },
    //         { name: "Open", path: "" },
    //         { name: "Draft", path: "" },
    //         { name: "Solved", path: "" },
    //     ],
    // };
    return (
        <div>
            <div className="tableActionTemplate">
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
