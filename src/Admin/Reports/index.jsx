import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Layout from '../Layout';
import Cards from './Helpers/Cards';
import './reports.scss';

const Reports = () => {
    const survey =['Pre Survey Report', 'Pre survey summary Report','Post Survey Report'];
    const course =['Not Started Report', 'On going Report','Completed Report'];
    const incomplete =['Incomplete Report'];
    return (
        <Layout>
            <Container className="mt-5 report-wrapper mb-5 pb-5">
                <h2>Reports</h2>
                <Row>
                    <Col md={6}>
                        <Cards list={survey} heading="Pre-survey Reports" />
                        <Cards list={course} heading="Course Reports" />
                        <Cards list={incomplete} heading="Assessment Reports" />
                    </Col>
                    <Col md={6}>
                        <Cards list={survey} heading="Student Related Reports" />
                        <Cards list={course} heading="Challenges Reports" />
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default Reports;
