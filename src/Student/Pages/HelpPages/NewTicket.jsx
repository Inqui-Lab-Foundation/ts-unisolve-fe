import React from "react";
import { Row, Col } from "react-bootstrap";
import "../Student.scss";
// import { GoChevronRight } from "react-icons/go";
// import { Breadcrumb } from "antd";
import { SearchDropdown } from "../../../stories/DropdownWithSearch/DropdownWithSearch.stories.jsx";
import { TextArea } from "../../../stories/TextArea/TextArea.jsx";
import { Attachments } from "../../../stories/Attachments/Attachments.jsx";
import { Button } from "../../../stories/Button.jsx";
import {  withRouter } from "react-router-dom";
import Layout from "../../Layout.jsx";
import { BreadcrumbTwo } from "../../../stories/BreadcrumbTwo/BreadcrumbTwo.jsx";
import { useTranslation } from "react-i18next";

const NewTicket = (props) => {
    const { t } = useTranslation();
    const headingDetails = {
        title: "Raise a new ticket",

        options: [
            {
                title: "Tickets",
                path: "/tickets",
            },
            {
                title: "New Tickets",
                path: "/NewTicket",
            },
        ],
    };
    const serachprops = {
        options: [
            { label: 10, value: "Mapusa" },
            { label: 20, value: "Vasco" },
            { label: 30, value: "Mumbai" },
        ],
        label: "Select question category",
        className: "defaultDropdown",
    };
    return (
        <Layout>
            <div className="EditPersonalDetails new-ticket-page">
                <Row>
                    <Col className="col-xl-10 offset-xl-1 offset-md-0">
                        <BreadcrumbTwo {...headingDetails} />
                        {/* <ul class="list-group common-links list-group-horizontal ">
              <li class="list-group-item bg-transparent border-0 px-0">
                <Link
                  exact
                  to="/tickets"
                  activeClassName="is-active"
                  className="text-link"
                >
                  Tickets <GoChevronRight />
                </Link>
              </li>
              <li class="list-group-item bg-transparent border-0 px-2">
                <Link
                  exact
                  to="/NewTicket"
                  activeClassName="is-active"
                  className="text-link text-bold"
                >
                  New Tickets
                </Link>
              </li>
            </ul> */}
                        {/* <Breadcrumb>
              <Breadcrumb.Item>Tickets</Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="">New Tickets</a>
              </Breadcrumb.Item>
            </Breadcrumb> */}
                        <div>
                            {/* <Col>
                <h1 className="mb-4">Raise a new ticket</h1>
              </Col> */}
                            <div className="create-ticket">
                                <p className="m-0 question">What is your question about? </p>
                                <span className="que-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </span>
                                <SearchDropdown {...serachprops} />
                                <p className="m-0 question mt-5">Question Description </p>
                                <span className="que-text">
                  Include all the information someone would need to answer your
                  question
                                </span>
                                <TextArea placeholder="Enter your question description here..." />
                                <p className="m-0 question mt-5 mb-3">
                  Add attachments <span className="que-text"> (optional)</span>{" "}
                                </p>

                                <Attachments />
                            </div>
                            <hr></hr>
                            <Row>
                                <Col>
                                    <Button
                                        label={t('student.discard')}
                                        btnClass="secondary"
                                        size="small"
                                        onClick={() => props.history.push("/tickets")}
                                    />
                                </Col>
                                <Col className="submit-btn">
                                    <Button
                                        label={t('student.save_draft')}
                                        btnClass="primary-outline"
                                        size="small"
                                    />
                                    <Button label="Submit" btnClass="default" size="small" />
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        </Layout>
    );
};

export default withRouter(NewTicket);
