import React from 'react';
import { Row, Col, Form, Label } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import './style.scss';
import Layout from '../../Admin/Layout';
import { Button } from '../../stories/Button';
import axios from 'axios';

import { InputBox } from '../../stories/InputBox/InputBox';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { BreadcrumbTwo } from '../../stories/BreadcrumbTwo/BreadcrumbTwo';
import { getCurrentUser } from '../../helpers/Utils';
import { useHistory } from 'react-router-dom';

const EditProfile = (props) => {
    const history = useHistory();
    const currentUser = getCurrentUser('current_user');
    const mentorData =
        (history && history.location && history.location.data) || {};

    const headingDetails = {
        title: 'User Edit Details',

        options: [
            {
                title: 'User List',
                path: '/admin/userlist'
            },
            {
                title: 'User Edit Profile',
                
            }
        ]
    };

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    // "mentor_id": 1,
    //                 "user_id": 2,
    //                 "reg_status": "3",
    //                 "organization_code": "33320100606",
    //                 "team_id": null,
    //                 "full_name": "Vasu Aniket Joshi",
    //                 "date_of_birth": null,
    //                 "qualification": "-",
    //                 "city": null,
    //                 "district": null,
    //                 "state": null,
    //                 "country": null,
    //                 "mobile": "9912349858",
    //                 "otp": null,
    //                 "status": "ACTIVE",
    //                 "created_by": null,
    //                 "created_at": "2022-10-17T12:17:01.000Z",
    //                 "updated_by": null,
    //                 "updated_at": "2022-10-17T12:17:29.000Z"

    const formik = useFormik({
        initialValues: {
            name: mentorData.full_name,
            // email: '',
            phone: mentorData.mobile
        },

        validationSchema: Yup.object({
            name: Yup.string().matches(/^[aA-zZ\s]+$/, "Invalid name ").min(2, "Enter a valid name").required('Name is Required'),
            email: Yup.string().email("Invalid email address format")
                .required("Email is required"),
            phone: Yup.string().matches(phoneRegExp, 'Mobile number is not valid')
                .min(10, "Enter a valid mobile number")
                .max(10, "Enter a valid mobile number").required('Mobile Number is Required'),
        }),

        onSubmit: (values) => {
            const full_name = values.name;
            const mobile = values.phone;
            const body = JSON.stringify({
                full_name: full_name,
                mobile: mobile,
            });
            var config = {
                method: 'put',
                url:
                    process.env.REACT_APP_API_BASE_URL +
                    '/mentors/'+ mentorData.user_id,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${currentUser.data[0].token}`
                },
                data: body
            };
            axios(config)
                .then(function (response) {
                    if (response.status === 200) {
                        props.history.push('/admin/userprofile');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        
    });

    return (
        <Layout>
            <div className="EditPersonalDetails new-member-page">
                <Row>
                    <Col className="col-xl-10 offset-xl-1 offset-md-0">
                        <BreadcrumbTwo {...headingDetails} />

                        <div>
                            <Form onSubmit={formik.handleSubmit} isSubmitting>
                                <div className="create-ticket register-block">
                                    <Row>
                                        <Col md={6} className="mb-5 mb-xl-0">
                                            <Label
                                                className="name-req"
                                                htmlFor="name"
                                            >
                                                Name
                                            </Label>

                                            <InputBox
                                                className={'defaultInput'}
                                                id="name"
                                                name="name"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={
                                                    formik.values
                                                        .name
                                                }
                                            />

                                            {formik.touched.name &&
                                            formik.errors.name ? 
                                                (
                                                    <small className="error-cls">
                                                        {
                                                            formik.errors
                                                                .name
                                                        }
                                                    </small>
                                                ) : null}
                                        </Col>
                                        <Col md={6}>
                                            <Label
                                                className="name-req"
                                                htmlFor="email"
                                            >
                                                Email
                                            </Label>
                                            <InputBox
                                                className={'defaultInput'}
                                                id="email"
                                                name="email"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={
                                                    formik.values
                                                        .email
                                                }
                                            />
                                            {formik.touched.email &&
                                            formik.errors.email ? 
                                                (
                                                    <small className="error-cls">
                                                        {
                                                            formik.errors
                                                                .email
                                                        }
                                                    </small>
                                                ) : null}
                                        </Col>
                                        <Col md={6}>
                                            <Label
                                                className="name-req mt-5"
                                                htmlFor="phone"
                                            >
                                                Phone
                                            </Label>
                                            <InputBox
                                                className={'defaultInput'}
                                                id="phone"
                                                name="phone"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={
                                                    formik.values
                                                        .phone
                                                }
                                            />

                                            
                                            {formik.touched.phone &&
                                            formik.errors.phone ? 
                                                (
                                                    <small className="error-cls">
                                                        {
                                                            formik.errors
                                                                .phone
                                                        }
                                                    </small>
                                                ) : null}
                                        </Col>
                                       
                                    </Row>
                                </div>

                                <hr className="mt-4 mb-4"></hr>
                                <Row>
                                    <Col className="col-xs-12 col-sm-6">
                                        <Button
                                            label="Discard"
                                            btnClass="secondary"
                                            size="small"
                                            onClick={() =>
                                                props.history.push(
                                                    '/admin/userlist'
                                                )
                                            }
                                        />
                                    </Col>
                                    <Col className="submit-btn col-xs-12 col-sm-6">
                                        <Button
                                            label="Submit details"
                                            type="submit"
                                            btnClass={
                                                !(
                                                    formik.dirty &&
                                                    formik.isValid
                                                )
                                                    ? 'default'
                                                    : 'primary'
                                            }
                                            size="small"
                                        />
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </div>
        </Layout>
    );
};

export default withRouter(EditProfile);
