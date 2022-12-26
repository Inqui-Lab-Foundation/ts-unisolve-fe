/* eslint-disable indent */
import React, { useEffect } from 'react';
import './dashboard.scss';
import Layout from '../Pages/Layout';
import { Card, Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { KEY, URL } from '../../../constants/defaultValues';
import { getNormalHeaders } from '../../../helpers/Utils';
import axios from 'axios';

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

    console.log(dateCount, 'countvaluie__', dateCount.submitted_count);

    return (
        <Layout>
            <div className="container dashboard-wrapper mt-5 mb-50">
                <h2 className="mb-5">Dashboard</h2>
                <div className="dashboard">
                    <Container>
                        <Row>
                            <Col>
                                <Link to="/eadmin/listofideas?status=SUBMITTED&title=Submitted">
                                    <Card className="p-4 text-center">
                                        <b className="text-primary">
                                            SUBMITTED IDEAS
                                        </b>
                                        <h3 className="display-5 bold m-2">
                                            {dateCount.submitted_count}
                                        </h3>
                                    </Card>
                                </Link>
                            </Col>
                            <Col>
                                <Link to="/eadmin/listofideas?evaluation_status=SELECTEDROUND1&title=Accepted">
                                    <Card className="p-4 text-center">
                                        <b className="text-success">ACCEPTED</b>
                                        <h3 className="display-5 bold m-2">
                                            {dateCount.selected_round_one_count}
                                        </h3>
                                    </Card>
                                </Link>
                            </Col>
                            <Col>
                                <Link to="/eadmin/listofideas?evaluation_status=REJECTEDROUND1&title=Rejected">
                                    <Card className="p-4 text-center">
                                        <b className="text-danger">REJECTED</b>
                                        <h3 className="display-5 bold m-2">
                                            {dateCount.rejected_round_one_count}
                                        </h3>
                                    </Card>
                                </Link>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </Layout>
    );
};

export default eadmindashboard;
