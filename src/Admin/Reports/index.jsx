import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Layout from '../Layout';
import Cards from './Helpers/Cards';
import './reports.scss';

const Reports = () => {
    const survey = [
        'Download Teachers Report',
        'Download Students Report',
        'Registered Teachers List',
        'Not Registered Teachers List',
        'Teachers Pre Survey',
        'Teachers Course Completion'
    ];
    return (
        <Layout>
            <Container className="mt-5 report-wrapper mb-5 pb-5">
                <h2>Reports</h2>
                <Row>
                    <Col md={6}>
                        <Cards list={survey} heading="Reports" />
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default Reports;
