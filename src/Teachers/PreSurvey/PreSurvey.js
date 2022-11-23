import React, { useEffect, useState } from 'react';
import '../PostSurvey/style.scss';
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap';
import { Button } from '../../stories/Button';
import { useFormik } from 'formik';
// import * as Yup from 'yup';
import Layout from '../Layout';
import { URL, KEY } from '../../constants/defaultValues';
import {
    getNormalHeaders,
    openNotificationWithIcon
} from '../../helpers/Utils';
import axios from 'axios';
import Congo from '../../assets/media/survey-success.jpg';
import { useHistory } from 'react-router-dom';
import getStart from '../../assets/media/getStart.png';
import { useSelector } from 'react-redux';
import { getLanguage } from '../../constants/languageOptions';
import { useTranslation } from 'react-i18next';
import DoubleBounce from '../../components/Loaders/DoubleBounce';

const PreSurvey = () => {
    const { t } = useTranslation();
    const [preSurveyList, setPreSurveyList] = useState([]);
    const [quizSurveyId, setQuizSurveyId] = useState(0);
    const [preSurveyStatus, setPreSurveyStatus] = useState('');
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const language = useSelector((state) => state?.mentors.mentorLanguage);

    const history = useHistory();

    const formik = useFormik({
        initialValues: {},
        onSubmit: async (values) => {
            const axiosConfig = getNormalHeaders(KEY.User_API_Key);

            let responsesData = Object.keys(values).map((eachValues) => {
                let selected = values[eachValues].split(' -- ');
                return {
                    quiz_survey_question_id: selected[0],
                    selected_option: selected[1]
                };
            });

            let submitData = {
                responses: responsesData
            };
            if (preSurveyList.length != submitData.responses.length) {
                openNotificationWithIcon(
                    'warning',
                    'Please Attempt All Questions..!!',
                    ''
                );
            } else {
                return await axios
                    .post(
                        `${URL.getPreSurveyList
                        }/${quizSurveyId}/responses?${getLanguage(language)}`,
                        JSON.stringify(submitData, null, 2),
                        axiosConfig
                    )
                    .then((preSurveyRes) => {
                        if (preSurveyRes?.status == 200) {
                            openNotificationWithIcon(
                                'success',
                                'Presurvey has been submitted successfully'
                            );
                            setPreSurveyStatus('COMPLETED');
                            setTimeout(() => {
                                history.push('/teacher/dashboard');
                            }, 500);

                            formik.resetForm();
                        }
                    })
                    .catch((err) => {
                        return err.response;
                    });
            }
        }
    });

    useEffect(() => {
        setLoading(true);
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        axios
            .get(
                `${URL.getPreSurveyList}?role=MENTOR&${getLanguage(language)}`,
                axiosConfig
            )

            .then((preSurveyRes) => {
                if (preSurveyRes?.status == 200) {
                    console.log(
                        '🚀 ~ file: PreSurvey.js ~ line 76 ~ .then ~ preSurveyRes',
                        preSurveyRes
                    );
                    setQuizSurveyId(
                        preSurveyRes.data.data[0].dataValues[0].quiz_survey_id
                    );
                    setPreSurveyStatus(
                        preSurveyRes.data.data[0].dataValues[0].progress
                    );
                    let allQuestions = preSurveyRes.data.data[0].dataValues[0];
                    setPreSurveyList(allQuestions.quiz_survey_questions);
                    setLoading(false);
                }
            })
            .catch((err) => {
                setLoading(false);
                return err.response;
            });
    }, [language]);

    const handleStart = () => {
        setShow(true);
    };

    return (
        <Layout>
            <Container className="presuervey mb-50 mt-5 ">
                <Col>
                    <Row className=" justify-content-center">
                        <div className="aside  p-4 bg-white">
                            {loading ? <DoubleBounce /> :
                                preSurveyStatus && preSurveyStatus !== 'COMPLETED' && !show ? <CardBody>
                                    <Row>
                                        <Col md={4}>
                                            <figure>
                                                <img
                                                    src={getStart}
                                                    className="img-fluid"
                                                    alt="get started"
                                                />
                                            </figure>
                                        </Col>
                                        <Col md={8}>
                                            <h2>
                                                {t(
                                                    'teacher_get_started.heading'
                                                )}
                                            </h2>
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: t(
                                                        'teacher_get_started.desc'
                                                    )
                                                }}
                                            ></div>
                                            <Button
                                                label={t('get_started.btn')}
                                                btnClass="primary my-3"
                                                size="small"
                                                onClick={handleStart}
                                            />
                                        </Col>
                                    </Row>
                                </CardBody>
                                    : (
                                        <CardBody>
                                            <h2>{t('teacher.pre_survey')}</h2>

                                            {preSurveyStatus != 'COMPLETED' && (
                                                <Form
                                                    className="form-row"
                                                    onSubmit={formik.handleSubmit}
                                                    isSubmitting
                                                >
                                                    {preSurveyList.map(
                                                        (eachQuestion, i) => {
                                                            return (
                                                                <Row key={i}>
                                                                    <Card className="card mb-4 my-3 comment-card px-0 px-5 py-3">
                                                                        <div className="question quiz mb-0">
                                                                            <b>
                                                                                {i + 1}.{' '}
                                                                                {
                                                                                    eachQuestion.question
                                                                                }
                                                                            </b>
                                                                        </div>
                                                                        <div className="answers">
                                                                            <FormGroup
                                                                                tag="fieldset"
                                                                                className="w-100"
                                                                                id="radioGroup1"
                                                                                label="One of these please"
                                                                                value={
                                                                                    formik
                                                                                        .values
                                                                                        .radioGroup1
                                                                                }
                                                                                error={
                                                                                    formik
                                                                                        .errors
                                                                                        .radioGroup1
                                                                                }
                                                                                touched={
                                                                                    formik
                                                                                        .touched
                                                                                        .radioGroup1
                                                                                }
                                                                                onChange={
                                                                                    formik.handleChange
                                                                                }
                                                                                onBlur={
                                                                                    formik.handleBlur
                                                                                }
                                                                            >
                                                                                <FormGroup
                                                                                    check
                                                                                >
                                                                                    <Label
                                                                                        check
                                                                                    >
                                                                                        <Input
                                                                                            type="radio"
                                                                                            name={`radioGroup${i}`}
                                                                                            id="radioOption1"
                                                                                            value={`${eachQuestion.quiz_survey_question_id} -- ${eachQuestion.option_a}`}
                                                                                        />{' '}
                                                                                        {
                                                                                            eachQuestion.option_a
                                                                                        }
                                                                                    </Label>
                                                                                </FormGroup>
                                                                                <FormGroup
                                                                                    check
                                                                                >
                                                                                    <Label
                                                                                        check
                                                                                    >
                                                                                        <Input
                                                                                            type="radio"
                                                                                            name={`radioGroup${i}`}
                                                                                            id="radioOption2"
                                                                                            value={`${eachQuestion.quiz_survey_question_id} -- ${eachQuestion.option_b}`}
                                                                                        />{' '}
                                                                                        {
                                                                                            eachQuestion.option_b
                                                                                        }
                                                                                    </Label>
                                                                                </FormGroup>
                                                                                <FormGroup
                                                                                    check
                                                                                >
                                                                                    <Label
                                                                                        check
                                                                                    >
                                                                                        <Input
                                                                                            type="radio"
                                                                                            name={`radioGroup${i}`}
                                                                                            id="radioOption3"
                                                                                            value={`${eachQuestion.quiz_survey_question_id} -- ${eachQuestion.option_c}`}
                                                                                        />{' '}
                                                                                        {
                                                                                            eachQuestion.option_c
                                                                                        }
                                                                                    </Label>
                                                                                </FormGroup>

                                                                                <FormGroup
                                                                                    check
                                                                                >
                                                                                    <Label
                                                                                        check
                                                                                    >
                                                                                        <Input
                                                                                            type="radio"
                                                                                            name={`radioGroup${i}`}
                                                                                            id="radioOption4"
                                                                                            value={`${eachQuestion.quiz_survey_question_id} -- ${eachQuestion.option_d}`}
                                                                                        />{' '}
                                                                                        {
                                                                                            eachQuestion.option_d
                                                                                        }
                                                                                    </Label>
                                                                                </FormGroup>
                                                                            </FormGroup>
                                                                        </div>
                                                                    </Card>
                                                                </Row>
                                                            );
                                                        }
                                                    )}

                                                    <div className="text-right">
                                                        <Button
                                                            type="submit"
                                                            btnClass={
                                                                !(
                                                                    formik.dirty &&
                                                                    formik.isValid
                                                                )
                                                                    ? 'default'
                                                                    : 'primary'
                                                            }
                                                            disabled={
                                                                !(
                                                                    formik.dirty &&
                                                                    formik.isValid
                                                                )
                                                            }
                                                            size="small"
                                                            label="SUBMIT"
                                                        />
                                                    </div>
                                                </Form>
                                            )}

                                            {preSurveyStatus == 'COMPLETED' && (
                                                <div style={{ textAlign: 'center' }}>
                                                    <figure>
                                                        <img
                                                            className="img-fluid w-25"
                                                            src={Congo}
                                                        ></img>
                                                    </figure>
                                                    <div>
                                                        <h2>
                                                            {t(
                                                                'teacher_presurvey.completed_text'
                                                            )}
                                                        </h2>
                                                    </div>
                                                </div>
                                            )}
                                        </CardBody>
                                    )}
                        </div>
                    </Row>
                </Col>
            </Container>
        </Layout>
    );
};

export default PreSurvey;
