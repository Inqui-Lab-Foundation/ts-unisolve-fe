import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Layout from '../Layout';
import Cards from './Helpers/Cards';
import './reports.scss';

const Reports = () => {
    const survey = [
        'Download Students Report'
        // 'Students Download'
        // 'Download Teachers Report',
        // 'Registered Teachers List',
        // 'Not Registered Teachers List',
        // 'Teachers Pre Survey',
        // 'Teachers Course Completion'
    ];
    const teacherReports = [
        'Registered Teachers List',
        'Not Registered Teachers List',
        'Teachers Pre Survey Completed List',
        'Teachers Pre Survey Not Completed List',
        'Teachers Course Completion List',
        'Download Teachers Report'
    ];
    return (
        <Layout>
            <Container className="mt-5 report-wrapper mb-5 pb-5">
                <h2>Reports</h2>
                <Row>
                    <Col md={12}>
                        <Cards list={survey} reports={teacherReports} />
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default Reports;
