/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import { Descriptions, Input } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';
import { Button } from '../../stories/Button';
import Layout from '../Layout';
import { deleteTempMentorById } from '../store/admin/actions';
import './dashboard.scss';
import { useHistory } from 'react-router-dom';
import jsPDF from 'jspdf';

const Dashboard = () => {
    const pdfRef = React.useRef(null);
    const inputField = {
        type: 'text',
        className: 'defaultInput'
    };
    const history = useHistory();
    const [diesCode, setDiesCode] = useState('');
    const [orgData, setOrgData] = useState({});
    const [error, setError] = useState('');
    const handleOnChange = (e) => {
        setDiesCode(e.target.value);
        setOrgData({});
        setError("");
    };

    const handleSearch = (e) => {

        const body = JSON.stringify({
            organization_code: diesCode
        });
        var config = {
            method: 'post',
            url: process.env.REACT_APP_API_BASE_URL + '/organizations/checkOrg',
            headers: {
                'Content-Type': 'application/json'
            },
            data: body
        };
        axios(config)
            .then(function (response) {
                if (response.status == 200) {
                    setOrgData(response?.data?.data[0]);
                    setError('');
                }
            })
            .catch(function (error) {
                if (error?.response?.data?.status === 404) {
                    setError('Entered Invalid UDISE Code');
                }
                setOrgData({});
            });
        e.preventDefault();
    };
    const handleEdit = () => {
        history.push({
            pathname: '/admin/edit-user-profile',
            data: {
                full_name: orgData.mentor?.full_name,
                mobile: orgData.mentor?.mobile,
                username: orgData.mentor?.user?.username,
                mentor_id: orgData.mentor?.mentor_id,
                where: 'Dashbord'
            }
        });
    };
    const downloadPDF = () => {
        const content = pdfRef.current;
        const doc = new jsPDF('p', 'px', [1280, 1020]);
        doc.html(content, {
            callback: function (doc) {
                doc.save('Detail.pdf');
            }
        });
        console.warn(content);
    };
    return (
        <Layout>
            <div className="dashboard-wrapper pb-5 my-5 px-5">
                <h2 className="mb-5">Dashboard </h2>
                <div className="dashboard p-5 mb-5">
                    <div className="row">
                        <div style={{ flex: 1 }} className="col-lg-12">
                            Data
                        </div>
                        <div style={{ flex: 1 }} className="bg-white rounded px-5 py-3 col-lg-12 disc-card-search">
                            <h2 className='mt-3'>Search Registration Details</h2>
                            <Row className="text-center justify-content-md-center my-4">
                                <Col md={9} lg={12}>
                                    <Row>
                                        <Col md={9} className="my-auto">
                                            <Input
                                                {...inputField}
                                                id="organization_code"
                                                onChange={(e) =>
                                                    handleOnChange(e)
                                                }
                                                value={diesCode}
                                                name="organization_code"
                                                placeholder="Enter UDISE Code"
                                                className="w-100 mb-3 mb-md-0"
                                                style={{
                                                    borderRadius: '60px',
                                                    padding: '9px 11px'
                                                }}
                                            />
                                        </Col>
                                        <Col md={3} className="partner-btn">
                                            <Button
                                                label={'Search'}
                                                btnClass="primary mx-3 w-100"
                                                size="small"
                                                onClick={(e) => handleSearch(e)}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                            {diesCode && orgData &&
                                orgData?.organization_name &&
                                orgData?.mentor !== null ? (
                                <>
                                    {/* <div>
                                        <Descriptions
                                            bordered
                                            className='mt-3 text-left p-4'
                                            column={{ xxl: 1, xl: 1, lg: 1, md: 3, sm: 2, xs: 1 }}
                                        >
                                            <Descriptions.Item label="School">{orgData.organization_name}</Descriptions.Item>
                                            <Descriptions.Item label="City">{orgData.city}</Descriptions.Item>
                                            <Descriptions.Item label="District">{orgData.district}</Descriptions.Item>
                                            <Descriptions.Item label="Faculty Name">{orgData.mentor?.full_name}</Descriptions.Item>
                                            <Descriptions.Item label="Faculty Mobile">{orgData.mentor?.mobile}</Descriptions.Item>
                                            <Descriptions.Item label="Faculty email">{orgData.mentor?.user?.username}</Descriptions.Item>
                                        </Descriptions>
                                    </div> */}
                                    <div className='mb-5 p-3' ref={pdfRef}>
                                        <div className="container-fluid card shadow border">
                                            <div className="row">
                                                <div className="col">
                                                    <h2 className='text-center m-3 text-primary'>Registration Detail</h2>
                                                    <hr />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <ul className='p-0'>
                                                        <li className='d-flex justify-content-between'>School:<p>{orgData.organization_name}</p></li>
                                                        <li className='d-flex justify-content-between'>City: <p>{orgData.city}</p></li>
                                                        <li className='d-flex justify-content-between'>District: <p>{orgData.district}</p></li>
                                                        <li className='d-flex justify-content-between'>Faculty Name: <p>{orgData.mentor?.full_name}</p></li>
                                                        <li className='d-flex justify-content-between'>Faculty Mobile: <p>{orgData.mentor?.mobile}</p></li>
                                                        <li className='d-flex justify-content-between'>Faculty email: <p>{orgData.mentor?.user?.username}</p></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <button onClick={() => handleEdit()} className='btn btn-warning btn-lg'>Edit</button>
                                        <button onClick={() => { downloadPDF(); }} className='btn btn-primary rounded-pill px-4 btn-lg'>Download</button>
                                        <button onClick={() => {
                                            deleteTempMentorById(orgData.mentor?.user_id);
                                            setOrgData({});
                                            setDiesCode("");
                                        }} className='btn btn-danger btn-lg' >Delete</button>
                                    </div>

                                </>
                            ) : !error && diesCode && orgData !== {} && orgData?.organization_name && (
                                // <Card className="mt-3 p-4">
                                <div className='text-success fs-highlight d-flex justify-content-center align-items-center'>
                                    <span>Still No Teacher Registered</span>
                                </div>
                                // </Card>
                            )}
                            {error && diesCode && (
                                // <Card className="mt-3 p-4">
                                <div className='text-danger mt-3 p-4 fs-highlight d-flex justify-content-center align-items-center'>
                                    <span>{error}</span>
                                </div>
                            )}
                            {!diesCode && (
                                // <Card className="mt-3 p-4">
                                <div className='d-flex  mt-3 p-4 justify-content-center align-items-center'>
                                    <span className='text-primary fs-highlight'>Enter UDISE Code</span>
                                </div>
                                // </Card>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
