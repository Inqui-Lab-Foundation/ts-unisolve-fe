/* eslint-disable indent */
import { React, useEffect, useState } from 'react';
import { Card, Row, Col } from 'reactstrap';
import { Fragment } from 'react';
import Question from './Question';
import { Button } from '../../stories/Button';
import './quiz.scss';
import Confetti from 'react-confetti';
import ResultStar from '../../assets/media/quiz-result-star.png';
import { connect, useSelector } from 'react-redux';
import DoubleBounce from '../../components/Loaders/DoubleBounce';
import { useTranslation } from 'react-i18next';
// import hardIcon from '../../assets/media/img/quiz_icon_hard.png';
// import mediumIcon from '../../assets/media/img/quiz_icon_medium.png';
// import easyIcon from '../../assets/media/img/quiz_icon_easy.png';

import {
    getAdminQuizQuestions,
    getAdminQuizResponce,
    getAdminCourseDetails
} from '../../redux/actions';
import QuizResponse from './QuizResponse';
//import { getCurrentUser } from '../../helpers/Utils';
const DetaledQuiz = (props) => {
    const { t } = useTranslation();
    const quizId = props.quizId;
    const [adminQst, SetAdminQst] = useState({});
    const [type, SetType] = useState('');
    const [loading, Setloading] = useState(false);
    const [selectOption, SetSelectOption] = useState('');
    const [condition, SetCondition] = useState(true);
    const [video, SetVideo] = useState(true);
    const [qst, SetQst] = useState({});
    const language = useSelector((state) => state?.studentRegistration?.studentLanguage);
    // const currentUser = getCurrentUser('current_user');
    // const role = currentUser.data[0].role;
    useEffect(() => {
        props.getAdminQuizQuestionsActions(quizId, language);
    }, [props.quizId, language]);

    useEffect(() => {
        SetAdminQst(props.adminCourseQst.data);
        SetQst(props.adminCourseQst.data);
    }, [props.adminCourseQst]);

    const handleSelect = (answer) => {
        SetSelectOption(answer);
    };
    const handleSelectType = (answer) => {
        SetType(answer);
    };
    const handleSubmit = () => {
        if (type == 'DRAW') {
            const quiz_id = adminQst[0].quiz_id;
            const data = new FormData();
            data.append('quiz_question_id', adminQst[0].quiz_question_id);
            data.append('selected_option', 'ok');
            data.append('attachment', selectOption);
            props.getAdminQuizResponceAction(quiz_id, data, language);
            SetSelectOption();
            SetType();
        } else {
            const quiz_id = adminQst[0].quiz_id;
            const body = JSON.stringify({
                quiz_question_id: adminQst[0].quiz_question_id,
                selected_option: selectOption
            });
            props.getAdminQuizResponceAction(quiz_id, body, language);
            SetSelectOption();
            SetType();
        }
    };
    const goToTop = () => {
        window.scrollTo(0, 0);
    };
    const handleNxtQst = () => {
        Setloading(true);
        setTimeout(() => {
            Setloading(false);
            SetCondition(true);
            props.getAdminQuizQuestionsActions(props.quizId, language);
            SetSelectOption();
            SetType();
            goToTop();
        }, 500);
    };
    const handlevideo = (id) => {
        SetVideo(false);
        props.handleNxtVideo(id);
        props.setBackToQuiz(true);
        props.setHideQuiz(false);
        props.setQuizTopic(id?.title);
    };

    return (
        <Fragment>
            {video == true &&
                props.adminCourseQst &&
                props.adminCourseQst.count === null && (
                    <Confetti className="w-100" />
                )}

            {condition == true &&
            props.adminCourseQst &&
            props.adminCourseQst.status === 200 ? (
                <Fragment>
                    {/* <ProgressComp
                        level={
                            props.adminCourseQst.data &&
                            props.adminCourseQst.data[0] &&
                            props.adminCourseQst.data[0].level
                        }
                        {...progressBar}
                    /> */}
                </Fragment>
            ) : null}

            <Card className="quiz">
                {video == true &&
                props.adminCourseQst &&
                props.adminCourseQst.count === null ? (
                    <div className="container new-result">
                        <div className="row justify-content-md-center ">
                            <div className="col col-lg-9">
                                <div className="results-heading">
                                    <span></span>
                                </div>
                                <div className="mt-4 d-flex justify-content-center align-items-center">
                                    <span>{t('student.quiz_completed')}</span>
                                </div>
                                <div className="results-heading mt-4">
                                    <img src={ResultStar} alt="star" />
                                </div>
                                <div className="row py-3 mb-3 ">
                                    <div className="text-right">
                                        {props.instructions === 'yes' ? (
                                            <Button
                                                label={t('student.continue')}
                                                btnClass="primary w-auto"
                                                size="small"
                                                type="submit"
                                                onClick={() => {
                                                    props.handleQuiz();
                                                    props.setInstructions(
                                                        false
                                                    );
                                                    props.setHandbook(true);
                                                }}
                                            />
                                        ) : (
                                            <Button
                                                label={t('student.continue')}
                                                btnClass="primary w-auto"
                                                size="small"
                                                type="submit"
                                                onClick={props.handleQuiz}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : loading == true ? (
                    <DoubleBounce />
                ) : (
                    <Fragment>
                        <div className="question-section">
                            <div className="score"></div>
                            <Row>
                                <Col xs={10}>
                                    <p>
                                        {t('teacher.question')}
                                        {/* #
                                        {props.adminCourseQst.data &&
                                            props.adminCourseQst.data[0] &&
                                            props.adminCourseQst.data[0]
                                                .question_no} */}
                                    </p>
                                </Col>
                                {/* <Col xs={2}>
                                    {role && role === 'STUDENT' && (
                                        <div className="quiz_ques_img d-flex justify-content-end">
                                            <img
                                                src={
                                                    (props?.adminCourseQst
                                                        ?.data &&
                                                    props?.adminCourseQst
                                                        ?.data[0] &&
                                                    props?.adminCourseQst?.data[0]?.level?.toLowerCase() ===
                                                        'hard'
                                                        ? hardIcon
                                                        : props?.adminCourseQst
                                                              ?.data &&
                                                          props?.adminCourseQst
                                                              ?.data[0] &&
                                                          props?.adminCourseQst?.data[0]?.level?.toLowerCase() ===
                                                              'medium'
                                                        ? mediumIcon
                                                        : easyIcon) || ''
                                                }
                                                alt="..."
                                            />
                                        </div>
                                    )}
                                </Col> */}
                            </Row>

                            <Question
                                responceData={props.adminQstResponce}
                                adminQuizDetails={qst}
                                quizId={quizId}
                                onSelectAnswer={handleSelect}
                                onSelectType={handleSelectType}
                            />

                            {video == true &&
                            props.adminQstResponce &&
                            props.adminQstResponce.status === 200 ? (
                                <div className="question-section">
                                    <div className="score">
                                        {props.adminQstResponce &&
                                            props.adminQstResponce.data[0] &&
                                            props.adminQstResponce.data[0]
                                                .is_correct === true && (
                                                <div className="w-100">
                                                    <QuizResponse
                                                        response={
                                                            props
                                                                .adminQstResponce
                                                                .data[0]
                                                        }
                                                    />
                                                </div>
                                            )}
                                        <br />
                                        {props.adminQstResponce &&
                                            props.adminQstResponce.data[0] &&
                                            props.adminQstResponce.data[0]
                                                .is_correct === false && (
                                                <QuizResponse
                                                    response={
                                                        props.adminQstResponce
                                                            .data[0]
                                                    }
                                                />
                                            )}
                                        <br />
                                    </div>

                                    <Row className="justify-content-between mt-5">
                                        {props.adminQstResponce &&
                                            props.adminQstResponce.data[0] &&
                                            props.adminQstResponce.data[0]
                                                .is_correct === true && (
                                                <Col
                                                    md={12}
                                                    className="text-right"
                                                >
                                                    <Button
                                                        btnClass="primary px-5"
                                                        size="small"
                                                        label="Continue"
                                                        onClick={(e) =>
                                                            handleNxtQst(e)
                                                        }
                                                    />
                                                </Col>
                                            )}
                                        {props.adminQstResponce &&
                                            props.adminQstResponce.data[0] &&
                                            props.adminQstResponce.data[0]
                                                .is_correct === false && (
                                                <Col
                                                    md={12}
                                                    className="text-right"
                                                >
                                                    {props.adminQstResponce &&
                                                        props.adminQstResponce
                                                            .data[0] &&
                                                        props.adminQstResponce
                                                            .data[0]
                                                            .redirect_to !=
                                                            null && (
                                                            <Button
                                                                btnClass="primary px-5 mx-sm-3 mx-1 mb-3"
                                                                size="small"
                                                                // Icon={BsPlusLg}
                                                                label={t('teacher.refer_video')}
                                                                onClick={() =>
                                                                    handlevideo(
                                                                        props.adminQstResponce &&
                                                                            props
                                                                                .adminQstResponce
                                                                                .data[0] &&
                                                                            props
                                                                                .adminQstResponce
                                                                                .data[0]
                                                                                .redirect_to
                                                                    )
                                                                }
                                                            />
                                                        )}
                                                    <Button
                                                        btnClass="primary px-5"
                                                        size="small"
                                                        label={t(
                                                            'teacher.continue'
                                                        )}
                                                        onClick={(e) =>
                                                            handleNxtQst(e)
                                                        }
                                                    />
                                                </Col>
                                            )}
                                    </Row>
                                </div>
                            ) : null}

                            {props.adminQstResponce &&
                            props.adminQstResponce.status === 200 ? null : (
                                <Row className="justify-content-between mt-5">
                                    <Col md={12} className="text-right">
                                        <Button
                                            size="small"
                                            label={t('teacher.submit')}
                                            onClick={(e) => handleSubmit(e)}
                                            btnClass={
                                                !selectOption
                                                    ? 'default'
                                                    : 'primary'
                                            }
                                        />
                                    </Col>
                                </Row>
                            )}
                        </div>
                    </Fragment>
                )}
            </Card>
        </Fragment>
    );
};

// export default DetaledQuiz;
const mapStateToProps = ({ adminCourses }) => {
    const { adminCourseQst, adminQstResponce } = adminCourses;
    return { adminCourseQst, adminQstResponce };
};

export default connect(mapStateToProps, {
    getAdminQuizQuestionsActions: getAdminQuizQuestions,
    getAdminQuizResponceAction: getAdminQuizResponce,
    getAdminCourseDetailsActions: getAdminCourseDetails
})(DetaledQuiz);
