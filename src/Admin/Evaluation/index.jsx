/* eslint-disable indent */
import React, { useEffect } from 'react';
import './index.scss';
import Layout from '../../Admin/Layout';
import { Card, Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { KEY, URL } from '../../constants/defaultValues';
import axios from 'axios';
import { getNormalHeaders } from '../../helpers/Utils';

const eadmindashboard = () => {
    const [dateCount, setdateCount] = useState({});

    useEffect(() => {
        handlecountvalue();
    }, []);

    async function handlecountvalue() {
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        await axios
            .get(`${URL.gettotalcount}`, axiosConfig)
            .then(function (response) {
                if (response.status === 200) {
                    setdateCount(
                        response.data &&
                            response.data.data[0] &&
                            response.data.data[0]
                    );
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <Layout>
            <div className="container dashboard-wrapper mt-5 mb-5">
                <h2 className="mb-5">Evaluation</h2>
                <div className="dashboard">
                    <Container>
                        <Row className="mb-5">
                            <Col lg={6} md={6}>
                                <Link to="/admin/challenges?status=SUBMITTED">
                                    <Card className="p-4 text-center card-effect mb-3">
                                        <b className="text-primary">
                                            SUBMITTED IDEAS
                                        </b>
                                        <h3 className="display-5 bold m-2">
                                            {dateCount.submitted_count}
                                        </h3>
                                    </Card>
                                </Link>
                            </Col>
                            <Col lg={6} md={6}>
                                <Link to="/admin/challenges?status=DRAFT">
                                    <Card className="p-4 text-center card-effect mb-3">
                                        <b className="text-secondary">
                                            DRAFTED IDEAS
                                        </b>
                                        <h3 className="display-5 bold m-2">
                                            {dateCount?.draft_count || 0}
                                        </h3>
                                    </Card>
                                </Link>
                            </Col>
                        </Row>
                        <Row className="mb-5">
                            <Col lg={6} md={6}>
                                <Link to="/admin/evaluationStatus/viewlist?evaluation_status=SELECTEDROUND1&title=Accepted&level=L1">
                                    <Card className="p-4 text-center card-effect mb-3">
                                        <b className="text-success">
                                            ACCEPTED IDEAS
                                        </b>
                                        <h3 className="display-5 bold m-2">
                                            {dateCount.selected_round_one_count}
                                        </h3>
                                    </Card>
                                </Link>
                            </Col>
                            <Col lg={6} md={6}>
                                <Link to="/admin/evaluationStatus/viewlist?evaluation_status=REJECTEDROUND1&title=Rejected&level=L1">
                                    <Card className="p-4 text-center card-effect mb-3">
                                        <b className="text-danger">
                                            REJECTED IDEAS
                                        </b>
                                        <h3 className="display-5 bold m-2">
                                            {dateCount.rejected_round_one_count}
                                        </h3>
                                    </Card>
                                </Link>
                            </Col>
                        </Row>
                        <Row className="mb-5">
                            <Col lg={6} md={6}>
                                <Link to="/admin/evaluationStatus/viewlist?title=L2 PROCESSED&level=L2">
                                    <Card className="p-4 text-center card-effect mb-3">
                                        <b className="text-success">
                                            L2 PROCESSED IDEAS
                                        </b>
                                        <h3 className="display-5 bold m-2">
                                            {dateCount.l2_processed}
                                        </h3>
                                    </Card>
                                </Link>
                            </Col>
                            <Col lg={6} md={6}>
                                <Link to="/admin/evaluationStatus/viewlist?title=L2 YET TO PROCESSED&level=L2">
                                    <Card className="p-4 text-center card-effect mb-3">
                                        <b className="text-warning">
                                            L2 YET TO PROCESSED IDEAS
                                        </b>
                                        <h3 className="display-5 bold m-2">
                                            {dateCount.l2_yet_to_processed}
                                        </h3>
                                    </Card>
                                </Link>
                            </Col>
                        </Row>
                        {/* <Row className="mb-5">
                            <Col>
                                <Link to="/admin/evaluationStatus/viewlist?title=FINAl">
                                    <Card className="p-4 text-center card-effect mb-3">
                                        <b className="text-success">
                                            FINAl IDEAS
                                        </b>
                                        <h3 className="display-5 bold m-2">
                                            1
                                        </h3>
                                    </Card>
                                </Link>
                            </Col>
                        </Row> */}
                    </Container>
                </div>
            </div>
        </Layout>
    );
};

export default eadmindashboard;
