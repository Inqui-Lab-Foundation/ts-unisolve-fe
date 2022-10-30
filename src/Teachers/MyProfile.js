import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    // CardTitle,
    CardBody,
    CardText
    // CardImg
} from 'reactstrap';
import { IoIosArrowBack } from 'react-icons/io';
// import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
// import ChangePSWModal from './ChangePSWModal';
// import withReactContent from 'sweetalert2-react-content';

import { Link } from 'react-router-dom';
import { BreadcrumbTwo } from '../stories/BreadcrumbTwo/BreadcrumbTwo.jsx';

import Layout from './Layout.jsx';
import { getCurrentUser } from '../helpers/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { getTeacherByID } from '../redux/actions';
// import moment from 'moment';

// const MySwal = withReactContent(Swal);

// const onCancel = () => {
//     Swal.close();
// };

// const btnSubmit = () => {
//     Swal.close();
// };

// const showFormModal = (values) => {
//     return new Promise((resolve, reject) => {
//         MySwal.fire({
//             title: "Enter values",
//             reverseButtons: false,
//             showCloseButton: true,
//             allowOutsideClick: false,
//             html: (
//                 <ChangePSWModal
//                     values={values}
//                     onSubmit={(values) => {
//                         resolve(values);
//                         Swal.close();
//                     }}
//                     onCancel={onCancel}
//                     btnSubmit={btnSubmit}
//                 />
//             ),
//             onClose: () => reject(),
//             showConfirmButton: false
//         });
//     });
// };

const MyProfile = () => {
    const currentUser = getCurrentUser('current_user');
    const [profileAction, setProfileAction] = useState(true);
    const { teacher } = useSelector((state) => state.teacher);
    const dispatch = useDispatch();

    // function showModal() {
    //     showFormModal({
    //         oldPassword: '',
    //         newPassword: '',
    //         confirmPassword: '',
    //         lastName: ''
    //     })
    //         .then((values) => console.log(values))
    //         .catch(() => console.log('Modal closed'));
    // }
    useLayoutEffect(() => {
        dispatch(getTeacherByID(currentUser?.data[0]?.mentor_id));
    }, [currentUser.data[0].mentor_id]);
    useEffect(() => {
        const search = window.location.search;
        if (search === '?id=teams') {
            setProfileAction(false);
        }
    });
    const headingDetails = {
        title: 'My Profile',

        options: [
            {
                title: 'Home',
                path: '/teacher/dashboard'
            },
            {
                title: 'My Profile',
                path: '/teacher/my-profile'
            }
        ]
    };

    return (
        <Layout>
            <Container className="MyProfile pt-3 pt-xl-5 mb-50">
                <Row>
                    <Col className="col-xl-10 offset-xl-1 offset-md-0">
                        {profileAction ? (
                            <BreadcrumbTwo {...headingDetails} />
                        ) : (
                            <Link
                                to="/teams"
                                className="color-grey-1 mb-3 d-block"
                            >
                                <IoIosArrowBack />
                                Go Back
                            </Link>
                        )}

                        <Row>
                            <Col md={12}>
                                <Card className="w-100  mb-5 p-4">
                                    <CardBody>
                                        <Row>
                                            <Col
                                                md={8}
                                                className="border-right my-auto "
                                            >
                                                <Row>
                                                    <Col
                                                        md={7}
                                                        className="my-auto profile-detail w-100"
                                                    >
                                                        {/* <h2 className="mb-4">
                                                            {teacher?.full_name}
                                                        </h2> */}
                                                        <CardText>
                                                            <Row className="pt-3 pb-3">
                                                                <Col
                                                                    md={5}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>Name</b>
                                                                </Col>
                                                                <Col md={1}>
                                                                    :
                                                                </Col>
                                                                <Col
                                                                    md={6}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        {teacher?.full_name
                                                                            ? teacher?.full_name
                                                                            : '-'}
                                                                    </b>
                                                                </Col>
                                                            </Row>
                                                            <Row className="pt-3 pb-3">
                                                                <Col
                                                                    md={5}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>Email</b>
                                                                </Col>
                                                                <Col md={1}>
                                                                    :
                                                                </Col>
                                                                <Col
                                                                    md={6}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        {teacher?.username_email
                                                                            ? teacher?.username_email
                                                                            : '-'}
                                                                    </b>
                                                                </Col>
                                                            </Row>
                                                            <Row className="pt-3 pb-3">
                                                                <Col
                                                                    md={5}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        Mobile
                                                                    </b>
                                                                </Col>
                                                                <Col md={1}>
                                                                    :
                                                                </Col>
                                                                <Col
                                                                    md={6}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        {teacher?.mobile
                                                                            ? teacher?.mobile
                                                                            : '-'}
                                                                    </b>
                                                                </Col>
                                                            </Row>
                                                        </CardText>

                                                        {/* <CardText>
                                                            
                                                            <span className="mx-3">
                                                                <b>Email:</b>
                                                            </span>
                                                            <b>
                                                                {teacher?.username_email
                                                                    ? teacher?.username_email
                                                                    : '-'}
                                                            </b>
                                                        </CardText>

                                                        <CardText>
                                                            <span className="mx-3">
                                                                <b>Mobile:</b>
                                                            </span>
                                                            <b>
                                                                {teacher?.mobile
                                                                    ? teacher?.mobile
                                                                    : '-'}
                                                            </b>
                                                        </CardText> */}
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>

                            <Col md={12}>
                                <Card className="w-100  mb-5 p-4">
                                    <CardBody>
                                        <Row>
                                            <Col
                                                md={8}
                                                className="border-right my-auto "
                                            >
                                                <Row>
                                                    <Col
                                                        md={7}
                                                        className="my-auto profile-detail w-100"
                                                    >
                                                        {/* <h2 className="mb-4">
                                                            {teacher?.full_name}
                                                        </h2> */}

                                                        <CardText>
                                                            <Row className="pt-3 pb-3">
                                                                <Col
                                                                    md={5}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>UDISE</b>
                                                                </Col>
                                                                <Col md={1}>
                                                                    :
                                                                </Col>
                                                                <Col
                                                                    md={6}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        {teacher?.organization_code
                                                                            ? teacher?.organization_code
                                                                            : '-'}
                                                                    </b>
                                                                </Col>
                                                            </Row>
                                                            <Row className="pt-3 pb-3">
                                                                <Col
                                                                    md={5}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        School
                                                                        Name
                                                                    </b>
                                                                </Col>
                                                                <Col md={1}>
                                                                    :
                                                                </Col>
                                                                <Col
                                                                    md={6}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        {teacher?.organization_name
                                                                            ? teacher?.organization_name
                                                                            : '-'}
                                                                    </b>
                                                                </Col>
                                                            </Row>

                                                            <Row className="pt-3 pb-3">
                                                                <Col
                                                                    md={5}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        Principal
                                                                        Name
                                                                    </b>
                                                                </Col>
                                                                <Col md={1}>
                                                                    :
                                                                </Col>
                                                                <Col
                                                                    md={6}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        {teacher
                                                                            .organization
                                                                            ?.principal_name
                                                                            ? teacher.organization?.principal_name
                                                                            : '-'}
                                                                    </b>
                                                                </Col>
                                                            </Row>
                                                            <Row className="pt-3 pb-3">
                                                                <Col
                                                                    md={5}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        Principal
                                                                        Email
                                                                    </b>
                                                                </Col>
                                                                <Col md={1}>
                                                                    :
                                                                </Col>
                                                                <Col
                                                                    md={6}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        {teacher
                                                                            .organization
                                                                            ?.principal_email
                                                                            ? teacher.organization?.principal_email
                                                                            : '-'}
                                                                    </b>
                                                                </Col>
                                                            </Row>

                                                            <Row className="pt-3 pb-3">
                                                                <Col
                                                                    md={5}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        Principal
                                                                        Mobile
                                                                    </b>
                                                                </Col>
                                                                <Col md={1}>
                                                                    :
                                                                </Col>
                                                                <Col
                                                                    md={6}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        {teacher
                                                                            .organization
                                                                            ?.principal_mobile
                                                                            ? teacher.organization?.principal_mobile  
                                                                            : '-'}
                                                                    </b>
                                                                </Col>
                                                            </Row>

                                                            <Row className="pt-3 pb-3">
                                                                <Col
                                                                    md={5}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>City</b>
                                                                </Col>
                                                                <Col md={1}>
                                                                    :
                                                                </Col>
                                                                <Col
                                                                    md={6}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        {teacher
                                                                            .organization
                                                                            ?.city
                                                                            ? teacher.organization?.city 
                                                                            : '-'}
                                                                    </b>
                                                                </Col>
                                                            </Row>
                                                            <Row className="pt-3 pb-3">
                                                                <Col
                                                                    md={5}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        District
                                                                    </b>
                                                                </Col>
                                                                <Col md={1}>
                                                                    :
                                                                </Col>
                                                                <Col
                                                                    md={6}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        {teacher
                                                                            .organization
                                                                            ?.district
                                                                            ? teacher.organization?.district  
                                                                            : '-'}
                                                                    </b>
                                                                </Col>
                                                            </Row>

                                                            <Row className="pt-3 pb-3">
                                                                <Col
                                                                    md={5}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>State</b>
                                                                </Col>
                                                                <Col md={1}>
                                                                    :
                                                                </Col>
                                                                <Col
                                                                    md={6}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        {teacher
                                                                            .organization
                                                                            ?.state
                                                                            ? teacher.organization?.state
                                                                            : '-'}
                                                                    </b>
                                                                </Col>
                                                            </Row>
                                                        </CardText>
                                                        {/* <span className="mx-3">
                                                                <b>UDISE:</b>
                                                            </span>
                                                            <b>
                                                                {teacher?.organization_code
                                                                    ? teacher?.organization_code
                                                                    : '-'}
                                                            </b>
                                                        

                                                        <CardText>
                                                            <span className="mx-3">
                                                                <b>
                                                                    Principal
                                                                    Name:
                                                                </b>
                                                            </span>
                                                            <b>
                                                                {teacher
                                                                    .organization
                                                                    ?.principal_name
                                                                    ? teacher
                                                                          .organization
                                                                          ?.principal_name
                                                                    : '-'}
                                                            </b>
                                                        </CardText>

                                                        <CardText>
                                                            <span className="mx-3">
                                                                <b>City:</b>
                                                            </span>
                                                            <b>
                                                                {teacher
                                                                    .organization
                                                                    ?.city
                                                                    ? teacher
                                                                          .organization
                                                                          ?.city
                                                                    : '-'}
                                                            </b>
                                                        </CardText>

                                                        <CardText>
                                                            <span className="mx-3">
                                                                <b>District:</b>
                                                            </span>
                                                            <b>
                                                                {teacher
                                                                    .organization
                                                                    ?.district
                                                                    ? teacher
                                                                          .organization
                                                                          ?.district
                                                                    : '-'}
                                                            </b>
                                                        </CardText> */}
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                            {/* <Col md={12} xl={6}>
                                <Card className="w-100 h-100   mb-5 p-4">
                                    <CardBody>
                                        <div className="d-flex ">
                                            <div className="me-auto my-auto ">
                                                <CardTitle className="sub">
                                                    Personal details
                                                </CardTitle>
                                            </div>

                                            <div className="p-2 ">
                                                {profileAction ? (
                                                    <Link
                                                        exact="true"
                                                        to="/edit-details"
                                                        className="text-link"
                                                    >
                                                        <b>
                                                            <i className="fa-solid fa-pencil px-3"></i>{' '}
                                                            Edit
                                                        </b>
                                                    </Link>
                                                ) : (
                                                    ''
                                                )}
                                            </div>
                                        </div>

                                        <hr className="mb-5 mt-0" />
                                        <Row>
                                            <Col md={12} className="mb-5">
                                                <CardTitle>About</CardTitle>
                                                <CardText>
                                                    Lorem ipsum dolor sit amet,
                                                    consectetur adipiscing elit.
                                                    Blandit turpis cursus quam
                                                    diam ipsum. Tempor,
                                                    tristique egestas
                                                    pellentesque faucibus. Quis
                                                    nibh tellus sit aliquam nibh
                                                    penatibus elit.
                                                </CardText>
                                            </Col>

                                            {personal_details.map((item) => {
                                                return (
                                                    <Col
                                                        md={6}
                                                        className="mb-5"
                                                        key={item.id}
                                                    >
                                                        <CardTitle>
                                                            {item.title}
                                                        </CardTitle>
                                                        <CardText>
                                                            {item.body}
                                                        </CardText>
                                                    </Col>
                                                );
                                            })}
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col> */}
                            {/* <Col md={12} xl={6}>
                                <Card className="w-100  p-4">
                                    <CardBody>
                                        <div className="d-flex ">
                                            <div className="me-auto my-auto">
                                                <CardTitle className="sub">
                                                    Achievements
                                                </CardTitle>
                                            </div>

                                            <div className="p-2 ">
                                                <Link
                                                    exact="true"
                                                    to="/"
                                                    className="text-link"
                                                >
                                                    <b>View all</b>{' '}
                                                    <i className="fa-solid fa-angle-right" />
                                                </Link>
                                            </div>
                                        </div>

                                        <hr className="mb-4 mt-0" />
                                        <Row>
                                            <Col md={12}>
                                                <CardTitle>
                                                    Learning progress
                                                </CardTitle>
                                                <CardText>
                                                    Lorem ipsum dolor sit amet,
                                                    consectetur adipiscing elit.
                                                </CardText>
                                            </Col>
                                            <Col md={12} className="mb-5">
                                                <Row>
                                                    <Col md={7}>
                                                        <ProgressComp
                                                            {...progressBar}
                                                        />
                                                        <span>Level 15</span>
                                                    </Col>
                                                    <Col md={5}>
                                                        <h6>
                                                            Points:{' '}
                                                            <span>300</span>
                                                        </h6>
                                                    </Col>
                                                </Row>
                                            </Col>

                                            <Col md={12} className="mb-4">
                                                <div className="d-flex ">
                                                    <div className="me-auto my-auto">
                                                        <CardTitle className="sub">
                                                            <CardTitle>
                                                                Badges
                                                            </CardTitle>
                                                        </CardTitle>
                                                    </div>

                                                    <div className="p-2 ">
                                                        <CardTitle className="sub">
                                                            <Link
                                                                exact="true"
                                                                to="/"
                                                                className="text-link"
                                                            >
                                                                View all{' '}
                                                                <i className="fa-solid fa-angle-right" />
                                                            </Link>
                                                        </CardTitle>
                                                    </div>
                                                </div>

                                                <Row>
                                                    
                                                    {static_badges.map(
                                                        (item) => {
                                                            return (
                                                                <Col
                                                                    md="4"
                                                                    className="mb-3"
                                                                    key={
                                                                        item.id
                                                                    }
                                                                >
                                                                    <Card className="badges">
                                                                        <CardImg
                                                                            className="img-fluid"
                                                                            src={
                                                                                item.imgageUrl
                                                                            }
                                                                            alt={
                                                                                item.badgeName
                                                                            }
                                                                        />
                                                                        <CardBody className="px-0">
                                                                            <CardTitle>
                                                                                {
                                                                                    item.badgeName
                                                                                }
                                                                            </CardTitle>
                                                                            <hr />
                                                                            <CardText>
                                                                                EARNED
                                                                                ON:
                                                                                <br />
                                                                                <span>
                                                                                    {
                                                                                        item.earnedOn
                                                                                    }
                                                                                </span>
                                                                            </CardText>
                                                                        </CardBody>
                                                                    </Card>
                                                                </Col>
                                                            );
                                                        }
                                                    )}
                                                  
                                                    <div className="d-flex flex-row-reverse mt-3">
                                                        <Link
                                                            exact="true"
                                                            to="/"
                                                            className="text-link"
                                                        >
                                                            <b>How to earn</b>{' '}
                                                            <i className="fa-solid fa-question" />
                                                        </Link>
                                                    </div>
                                                    
                                                </Row>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col> */}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default MyProfile;
