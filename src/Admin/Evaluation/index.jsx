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
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement);
const eadmindashboard = () => {
    const [dateCount, setdateCount] = useState({});
    const L1PieData = {
        labels: ['Completed', 'Pending'],
        datasets: [
            {
                title: 'My First Dataset',
                data: [
                    parseInt(dateCount.selected_round_one_count) +
                        parseInt(dateCount.rejected_round_one_count),
                    parseInt(dateCount.submitted_count) -
                        (parseInt(dateCount.selected_round_one_count) +
                            parseInt(dateCount.rejected_round_one_count))
                ],
                backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)'],
                hoverOffset: 4
            }
        ]
    };

    const L2PieData = {
        labels: ['Completed', 'Pending'],
        datasets: [
            {
                title: 'My First Dataset',
                data: [10, 3],
                backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)'],
                hoverOffset: 4
            }
        ]
    };

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
            <div className="container dashboard-wrapper mt-5 mb-50">
                <h2 className="mb-5">Evaluation</h2>
                <div className="dashboard">
                    <Container>
                        <Row>
                            <Col lg={9}>
                                <Row>
                                    <Col lg={6} md={6}>
                                        <Link to="/admin/challenges">
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
                                        <Link to="/admin/evaluationStatus/viewlist?evaluation_status=SELECTEDROUND1&title=Accepted&level=L1">
                                            <Card className="p-4 text-center card-effect mb-3">
                                                <b className="text-success">
                                                    ACCEPTED
                                                </b>
                                                <h3 className="display-5 bold m-2">
                                                    {
                                                        dateCount.selected_round_one_count
                                                    }
                                                </h3>
                                            </Card>
                                        </Link>
                                    </Col>
                                    <Col lg={6} md={6}>
                                        <Link to="/admin/evaluationStatus/viewlist?evaluation_status=REJECTEDROUND1&title=Rejected&level=L1">
                                            <Card className="p-4 text-center card-effect mb-3">
                                                <b className="text-danger">
                                                    REJECTED
                                                </b>
                                                <h3 className="display-5 bold m-2">
                                                    {
                                                        dateCount.rejected_round_one_count
                                                    }
                                                </h3>
                                            </Card>
                                        </Link>
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg={3} className={'mb-lg-0 mb-5'}>
                                <Doughnut data={L1PieData} />
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={9}>
                                <Row>
                                    <Col lg={6} md={6}>
                                        <Link to="/admin/evaluationStatus/viewlist?evaluation_status=SELECTEDROUND1&level=L2&title=L2 PROCESSED&level=L2">
                                            <Card className="p-4 text-center card-effect mb-3">
                                                <b className="text-success">
                                                    L2 PROCESSED
                                                </b>
                                                <h3 className="display-5 bold m-2">
                                                    10
                                                </h3>
                                            </Card>
                                        </Link>
                                    </Col>
                                    <Col lg={6} md={6}>
                                        <Link to="/admin/evaluationStatus/viewlist?evaluation_status=SELECTEDROUND1&level=L2&title=L2 PROMOTED&level=L2">
                                            <Card className="p-4 text-center card-effect mb-3">
                                                <b className="text-warning">
                                                    L2 PROMOTED
                                                </b>
                                                <h3 className="display-5 bold m-2">
                                                    1
                                                </h3>
                                            </Card>
                                        </Link>
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg={3} className={'mb-lg-0 mb-5'}>
                                <Doughnut data={L2PieData} />
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </Layout>
    );
};

export default eadmindashboard;
