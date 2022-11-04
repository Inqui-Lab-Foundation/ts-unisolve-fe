/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import './styles.scss';
import { Row, Col, Form, Label } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import Layout from '../Layout';
import { Button } from '../../stories/Button';
import { InputBox } from '../../stories/InputBox/InputBox';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { BreadcrumbTwo } from '../../stories/BreadcrumbTwo/BreadcrumbTwo';
import { openNotificationWithIcon, getCurrentUser } from '../../helpers/Utils';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { teacherCreateMultipleStudent } from '../store/teacher/actions';

const studentBody = {
    full_name: '',
    Age: '',
    Grade: '',
    Gender: ''
};

const CreateMultipleMembers = ({ id }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [itemDataErrors, setItemDataErrors] = useState([studentBody]);
    const history = useHistory();
    const [studentData, setStudentData] = useState([
        {
            team_id: id,
            role: 'STUDENT',
            full_name: '',
            Age: 10,
            Grade: '',
            Gender: ''
        },
        {
            team_id: id,
            role: 'STUDENT',
            full_name: '',
            Age: 10,
            Grade: '',
            Gender: ''
        }
    ]);
    const grades = [6, 7, 8, 9, 10, 11, 12];
    const handleChange = (e, i) => {
        let newItem = [...studentData];
        const dataKeys = Object.keys(studentBody);
        if (e.target) {
            dataKeys.some((item) => {
                if (e.target.name === item) {
                    newItem[i][e.target.name] = e.target.value;
                    let errCopy = [...itemDataErrors];
                    const foo = { ...errCopy[i] };
                    foo[e.target.name] = '';
                    errCopy[i] = { ...foo };
                    setItemDataErrors(errCopy);
                }
            });
        }
        setStudentData(newItem);
    };
    const validateItemData = () => {
        const errors = studentData.map((item, i) => {
            let err = {};
            if (!item.full_name) err['full_name'] = 'Full name is Required';
            if (!item.Age) err['Age'] = 'Age is Required';
            if (!item.Grade) err['Grade'] = 'Class is Required';
            if (!item.Gender) err['Gender'] = 'Gender is Required';
            if (Object.values(err).length === 0) {
                return { ...studentBody, i };
            }
            return { ...err, i };
        });
        setItemDataErrors(
            errors.filter((item) => Object.values(item).length > 0)
        );
        const filterEmpty = errors.filter((item) => {
            const ce = { ...item };
            delete ce.i;
            return Object.values(ce).filter(Boolean).length > 0;
        });
        if (filterEmpty.length > 0) {
            return false;
        } else {
            return true;
        }
    };
    const handleSumbit = () => {
        if (!validateItemData()) return;
        dispatch(teacherCreateMultipleStudent(studentData, history));
    };
    return (
        <div className="create-ticket register-blockt">
            {studentData.map((item, i) => {
                const foundErrObject = { ...itemDataErrors[i] };
                return (
                    <div key={i} className="mb-5">
                        <h6 className="">Student {i + 1} Details</h6>
                        <hr />
                        <Row className="mb-3">
                            <Col md={4}>
                                <Label className="name-req" htmlFor="fullName">
                                    {t('teacher_teams.student_name')}
                                </Label>
                                <InputBox
                                    className={'defaultInput'}
                                    placeholder={t(
                                        'teacher_teams.student_name_pl'
                                    )}
                                    id="full_name"
                                    name="full_name"
                                    onChange={(e) => {
                                        handleChange(e, i);
                                    }}
                                    value={item.full_name}
                                />
                                {foundErrObject?.full_name ? (
                                    <small className="error-cls">
                                        {foundErrObject.full_name}
                                    </small>
                                ) : null}
                            </Col>
                            <Col md={2} className="mb-5 mb-xl-0">
                                <Label className="name-req" htmlFor="age">
                                    {t('teacher_teams.age')}
                                </Label>

                                <InputBox
                                    className={'defaultInput'}
                                    placeholder={'Enter Age'}
                                    type="number"
                                    id="Age"
                                    name="Age"
                                    onChange={(e) => {
                                        if (e.target.value.length === 3)
                                            return false;
                                        if (
                                            Math.sign(
                                                parseInt(e.target.value)
                                            ) === -1
                                        )
                                            return false;
                                        if (parseInt(e.target.value) < 10)
                                            return false;
                                        if (parseInt(e.target.value) > 18)
                                            return false;
                                        handleChange(e, i);
                                    }}
                                    value={item.Age}
                                />
                                {foundErrObject?.Age ? (
                                    <small className="error-cls">
                                        {foundErrObject.Age}
                                    </small>
                                ) : null}
                            </Col>
                            <Col md={3}>
                                <Label className="name-req" htmlFor="grade">
                                    Class
                                </Label>
                                <div className="dropdown CalendarDropdownComp ">
                                    <select
                                        name="Grade"
                                        className="form-control custom-dropdown"
                                        value={item.Grade}
                                        onChange={(e) => handleChange(e, i)}
                                    >
                                        <option value="">Select Class..</option>
                                        {grades.map((item) => (
                                            <option key={item} value={item}>
                                                Class {item}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {foundErrObject?.Grade ? (
                                    <small className="error-cls">
                                        {foundErrObject?.Grade}
                                    </small>
                                ) : null}
                            </Col>
                            <Col md={3} className="mb-5 mb-xl-0">
                                <Label className="name-req" htmlFor="gender">
                                    {t('teacher_teams.gender')}
                                </Label>

                                <select
                                    name="Gender"
                                    className="form-control custom-dropdown"
                                    value={item.Gender}
                                    onChange={(e) => handleChange(e, i)}
                                >
                                    <option value="">
                                        {t('teacher_teams.student_gender')}
                                    </option>
                                    <option value="Male">
                                        {t('teacher_teams.student_gender_male')}
                                    </option>
                                    <option value="Female">
                                        {t(
                                            'teacher_teams.student_gender_female'
                                        )}
                                    </option>
                                    <option value="OTHERS">
                                        Prefer not to mention
                                    </option>
                                </select>
                                {foundErrObject?.Gender ? (
                                    <small className="error-cls">
                                        {foundErrObject?.Gender}
                                    </small>
                                ) : null}
                            </Col>
                        </Row>
                    </div>
                );
            })}
            <Row>
                <Col className="col-xs-12 col-sm-6">
                    <Button
                        label={t('teacher_teams.discard')}
                        btnClass="secondary "
                        size="small"
                        onClick={() => history.push('/teacher/teamlist')}
                    />
                </Col>
                <Col className="col-xs-12 col-sm-6">
                    <Button
                        label={t('teacher_teams.submit')}
                        type="submit"
                        onClick={handleSumbit}
                        btnClass={'primary float-end'}
                        size="small"
                    />
                </Col>
            </Row>
        </div>
    );
};

const CreateTeamMember = (props) => {
    const history = useHistory();
    const { t } = useTranslation();

    const teamID = JSON.parse(localStorage.getItem('teamId'));
    const id =
        history && history.location && history.location.item
            ? history.location.item.team_id
            : teamID.team_id;

    const currentUser = getCurrentUser('current_user');
    const [teamMemberData, setTeamMemberData] = useState({});

    const headingDetails = {
        title: t('teacher_teams.create_team_members'),

        options: [
            {
                title: t('teacher_teams.teamslist'),
                path: '/teacher/teamlist'
            },
            {
                title: t('teacher_teams.create_team_members')
            }
        ]
    };
    useEffect(() => {
        handleCreateMemberAPI(id);
    }, [id]);

    async function handleCreateMemberAPI(teamId) {
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                '/teams/' +
                teamId +
                '?status=ACTIVE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser.data[0].token}`
            }
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setTeamMemberData(response.data && response.data.data[0]);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const formik = useFormik({
        initialValues: {
            fullName: '',
            age: '',
            grade: '',
            gender: ''
        },

        validationSchema: Yup.object({
            fullName: Yup.string()
                .required('Please Enter valid Full Name')
                .max(40)
                .required(),
            age: Yup.number()
                .integer()
                .min(10, 'Min age is 10')
                .max(18, 'Max age is 18')
                .required('required'),
            gender: Yup.string().required('Please select valid gender'),
            grade: Yup.string()
                .matches('', 'Please enter valid class')
                .max(40)
                .required('Please enter valid class')
        }),

        onSubmit: (values) => {
            if (
                process.env.REACT_APP_TEAM_LENGTH ==
                teamMemberData.student_count
            ) {
                openNotificationWithIcon(
                    'warning',
                    'Team Members Maximum Count All Ready Exist'
                );
            } else {
                const body = {
                    team_id: id,
                    role: 'STUDENT',
                    full_name: values.fullName,
                    qualification: '',
                    Age: values.age,
                    Grade: values.grade,
                    Gender: values.gender,
                    country: values.country
                };
                var config = {
                    method: 'post',
                    url:
                        process.env.REACT_APP_API_BASE_URL +
                        '/students/register',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${currentUser.data[0].token}`
                    },
                    data: body
                };
                axios(config)
                    .then(function (response) {
                        console.log(response);
                        if (response.status === 201) {
                            openNotificationWithIcon(
                                'success',
                                'Team Member Created Successfully'
                            );
                            props.history.push('/teacher/teamlist');
                        } else {
                            openNotificationWithIcon(
                                'error',
                                'Opps! Something Wrong'
                            );
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    });
    return (
        <Layout>
            <div className="EditPersonalDetails new-member-page">
                <Row>
                    <Col className="col-xl-10 offset-xl-1 offset-md-0">
                        <BreadcrumbTwo {...headingDetails} />
                        {props.location?.item &&
                        props.location.item.student_count < 2 ? (
                            <CreateMultipleMembers
                                teamData={props?.location?.item}
                                id={props?.location?.item?.team_id}
                            />
                        ) : (
                            <div>
                                <Form
                                    onSubmit={formik.handleSubmit}
                                    isSubmitting
                                >
                                    <div className="create-ticket register-blockt">
                                        <Row>
                                            <Col md={4}>
                                                <Label
                                                    className="name-req"
                                                    htmlFor="fullName"
                                                >
                                                    {t(
                                                        'teacher_teams.student_name'
                                                    )}
                                                </Label>
                                                <InputBox
                                                    className={'defaultInput'}
                                                    placeholder={t(
                                                        'teacher_teams.student_name_pl'
                                                    )}
                                                    id="fullName"
                                                    name="fullName"
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    value={
                                                        formik.values.fullName
                                                    }
                                                />
                                                {formik.touched.fullName &&
                                                formik.errors.fullName ? (
                                                    <small className="error-cls">
                                                        {formik.errors.fullName}
                                                    </small>
                                                ) : null}
                                            </Col>
                                            <Col
                                                md={2}
                                                className="mb-5 mb-xl-0"
                                            >
                                                <Label
                                                    className="name-req"
                                                    htmlFor="age"
                                                >
                                                    {t('teacher_teams.age')}
                                                </Label>

                                                <InputBox
                                                    className={'defaultInput'}
                                                    placeholder={t(
                                                        'teacher_teams.student_age'
                                                    )}
                                                    id="age"
                                                    name="age"
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.age}
                                                />

                                                {formik.touched.age &&
                                                formik.errors.age ? (
                                                    <small className="error-cls">
                                                        {formik.errors.age}
                                                    </small>
                                                ) : null}
                                            </Col>
                                            <Col md={3}>
                                                <Label
                                                    className="name-req"
                                                    htmlFor="grade"
                                                >
                                                    Class
                                                </Label>
                                                <div className="dropdown CalendarDropdownComp ">
                                                    {/* <InputBox
                                                    className={'defaultInput'}
                                                    placeholder={t(
                                                        'teacher_teams.student_grade'
                                                    )}
                                                    id="grade"
                                                    name="grade"
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.grade}
                                                /> */}
                                                    <select
                                                        name="grade"
                                                        className="form-control custom-dropdown"
                                                        value={
                                                            formik.values.grade
                                                        }
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                    >
                                                        <option value="">
                                                            Select Class..
                                                        </option>
                                                        <option value="6">
                                                            Class 6
                                                        </option>
                                                        <option value="7">
                                                            Class 7
                                                        </option>
                                                        <option value="8">
                                                            Class 8
                                                        </option>
                                                        <option value="9">
                                                            Class 9
                                                        </option>
                                                        <option value="10">
                                                            Class 10
                                                        </option>
                                                        <option value="11">
                                                            Class 11
                                                        </option>
                                                        <option value="12">
                                                            Class 12
                                                        </option>
                                                    </select>
                                                </div>
                                                {formik.touched.grade &&
                                                formik.errors.grade ? (
                                                    <small className="error-cls">
                                                        {formik.errors.grade}
                                                    </small>
                                                ) : null}
                                            </Col>
                                            <Col
                                                md={3}
                                                className="mb-5 mb-xl-0"
                                            >
                                                <Label
                                                    className="name-req"
                                                    htmlFor="gender"
                                                >
                                                    {t('teacher_teams.gender')}
                                                </Label>

                                                <select
                                                    name="gender"
                                                    className="form-control custom-dropdown"
                                                    value={formik.values.gender}
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                >
                                                    <option value="">
                                                        {t(
                                                            'teacher_teams.student_gender'
                                                        )}
                                                    </option>
                                                    <option value="Male">
                                                        {t(
                                                            'teacher_teams.student_gender_male'
                                                        )}
                                                    </option>
                                                    <option value="Female">
                                                        {t(
                                                            'teacher_teams.student_gender_female'
                                                        )}
                                                    </option>
                                                    <option value="OTHERS">
                                                        Prefer not to mention
                                                    </option>
                                                </select>

                                                {formik.touched.gender &&
                                                formik.errors.gender ? (
                                                    <small className="error-cls">
                                                        {formik.errors.gender}
                                                    </small>
                                                ) : null}
                                            </Col>
                                        </Row>
                                    </div>

                                    <hr className="mt-4 mb-4"></hr>
                                    <Row>
                                        <Col className="col-xs-12 col-sm-6">
                                            <Button
                                                label={t(
                                                    'teacher_teams.discard'
                                                )}
                                                btnClass="secondary"
                                                size="small"
                                                onClick={() =>
                                                    props.history.push(
                                                        '/teacher/teamlist'
                                                    )
                                                }
                                            />
                                        </Col>
                                        <Col className="submit-btn col-xs-12 col-sm-6">
                                            <Button
                                                label={t(
                                                    'teacher_teams.submit'
                                                )}
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
                                                disabled={
                                                    !(
                                                        formik.dirty &&
                                                        formik.isValid
                                                    )
                                                }
                                            />
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        )}
                    </Col>
                </Row>
            </div>
        </Layout>
    );
};

export default withRouter(CreateTeamMember);
