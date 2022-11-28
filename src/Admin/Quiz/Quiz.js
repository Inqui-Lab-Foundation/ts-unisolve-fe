import { React, useEffect, useState } from 'react';
import { Card, Row, Col } from 'reactstrap';
import { Fragment } from 'react';
import Question from './Question';
import { Button } from '../../stories/Button';
import './quiz.scss';
import Confetti from 'react-confetti';
import ResultStar from '../../assets/media/quiz-result-star.png';

import { connect, useSelector } from 'react-redux';
import quizCheck from '../../assets/media/img/thumbs-up.png';
import quizClose from '../../assets/media/quiz-close.png';
import {
    getAdminRfQuizResponce,
    getAdminRefQuizQst
} from '../../redux/actions';
import { useTranslation } from 'react-i18next';
import succesImg from "../../assets/media/success1.jpeg";

const Quiz = (props) => {
    const { t } = useTranslation();
    const [selectOption, SetSelectOption] = useState('');
    const [type, SetType] = useState('');
    const [video] = useState(true);
    const language = useSelector(state=>state?.studentRegistration?.studentLanguage);


    useEffect(() => {
        props.getAdminRefQuizQstActions(props.refQstId,language);
    }, [props.refQstId,language]);

    const handleNxtQst = () => {
        props.getAdminRefQuizQstActions(props.refQstId,language);
    };
    const handleSelect = (answer) => {
        SetSelectOption(answer);
    };
    const handleSelectType = (answer) => {
        SetType(answer);
    };
    const handleSubmit = () => {
        const quiz_id = props.refQstId;
        if (type == 'DRAW') {
            const data = new FormData();
            data.append(
                'reflective_quiz_question_id',
                props.adminRefQuizQst.data[0].reflective_quiz_question_id
            );
            data.append('selected_option', 'ok');
            data.append('attachment', selectOption);
            props.getAdminRfQuizResponceAction(quiz_id, data,language);
            SetSelectOption();
            SetType();
        } else {
            const data = JSON.stringify({
                reflective_quiz_question_id:
                    props.adminRefQuizQst.data[0].reflective_quiz_question_id,
                selected_option: selectOption
            });
            props.getAdminRfQuizResponceAction(quiz_id, data,language);
            SetSelectOption();
            SetType();
        }
    };

    return (
        <Fragment>
            {video == true &&
                  props.adminRefQuizQst &&
                  props.adminRefQuizQst.count === null && <Confetti className="w-100" />}

            <Card className="quiz">
                {video == true &&
                props.adminRefQstResponce &&
                props.adminRefQstResponce.status === 200 ? (
                        <Fragment>
                            {/* <ProgressComp {...progressBar} /> */}
                            <div className="question-section">
                                <div className="score">
                                    {props.adminRefQstResponce &&
                                    props.adminRefQstResponce.data[0] &&
                                    props.adminRefQstResponce.data[0]
                                        .is_correct === true && (
                                        <div className="w-100">
                                            {' '}
                                            <figure className="w-5 text-center">
                                                <img
                                                    className="img-fluid mb-2"
                                                    src={quizCheck}
                                                    style={{width:"8rem"}}
                                                    alt="quiz"
                                                />
                                            </figure>
                                            {/* <FaCheck className="green mx-3" /> */}
                                            <p style={{ textAlign: 'center' }}>
                                                {props.adminRefQstResponce &&
                                                    props.adminRefQstResponce
                                                        .data[0] &&
                                                    props.adminRefQstResponce
                                                        .data[0].msg}
                                            </p>
                                        </div>
                                    )}
                                    {props.adminRefQstResponce &&
                                    props.adminRefQstResponce.data[0] &&
                                    props.adminRefQstResponce.data[0]
                                        .is_correct === false && (
                                        <div className="w-100">
                                            {' '}
                                            <figure className="w-100 text-center">
                                                <img
                                                    className="img-fluid"
                                                    src={quizClose}
                                                    alt="quiz"
                                                />
                                            </figure>
                                            <p style={{ textAlign: 'center' }}>
                                                {props.adminRefQstResponce &&
                                                    props.adminRefQstResponce
                                                        .data[0] &&
                                                    props.adminRefQstResponce
                                                        .data[0].msg}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <Row className="justify-content-between ">
                                    {props.adminRefQstResponce &&
                                    props.adminRefQstResponce.data[0] &&
                                    props.adminRefQstResponce.data[0]
                                        .is_correct === true && (
                                        <Col md={12} className="text-right">
                                            <Button
                                                btnClass="primary px-5"
                                                size="small"
                                                label={t('student.continue')}
                                                onClick={(e) => handleNxtQst(e)}
                                            />
                                        </Col>
                                    )}
                                    {props.adminRefQstResponce &&
                                    props.adminRefQstResponce.data[0] &&
                                    props.adminRefQstResponce.data[0]
                                        .is_correct === false && (
                                        <Col md={12} className="text-right">
                                            <Button
                                                btnClass="primary px-5 mx-sm-3 mx-1 mb-3"
                                                size="small"
                                                // Icon={BsPlusLg}
                                                label="Refer Video"
                                                onClick={() =>
                                                    props.handleClose(false)
                                                }
                                            />
                                            <Button
                                                btnClass="primary px-5"
                                                size="small"
                                                // Icon={BsPlusLg}
                                                label={t('student.continue')}
                                                onClick={(e) => handleNxtQst(e)}
                                            />
                                        </Col>
                                    )}
                                </Row>
                            </div>
                        </Fragment>
                    ) : video == true &&
                  props.adminRefQuizQst &&
                  props.adminRefQuizQst.count === null ? (
                            <div className="container new-result">
                                <div className="row justify-content-md-center ">
                                    <div className="col col-lg-9">
                                        {/* <Confetti className='w-100' /> */}
                                        <div className="results-heading">
                                            <img src={ResultStar} alt="star" />
                                        </div>
                                        <div className="congratulations">
                                            <div className="success_img text-center w-100">
                                                <img src={succesImg} alt=".." /><br />
                                            </div>
                                            {t('student_course.quiz_completed')}
                                        </div>
                                       
                                        <Button
                                            onClick={() => props.handleClose(false)}
                                            button="submit"
                                            label={t('student_course.continue course')}
                                            btnClass="primary mt-5 quiz-end"
                                            size="small"
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            video == true &&
                    props.adminRefQuizQst.status === 200 && (
                                <Fragment>
                                    <div className="question-section">
                                        <Question
                                            qsts={props.adminRefQuizQst.data}
                                            onSelectAnswer={handleSelect}
                                            onSelectType={handleSelectType}
                                        />

                                        <Row className="justify-content-between mt-5">
                                            <Col md={12} className="text-right">
                                                <Button
                                                    size="small"
                                                    label={t('teacher_teams.submit')}
                                                    onClick={(e) =>  !selectOption ? null :handleSubmit(e)}
                                                    btnClass={
                                                        !selectOption
                                                            ? 'default'
                                                            : 'primary'
                                                    }
                                                    disabled={!(selectOption)}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                </Fragment>
                            )
                        )}
            </Card>
        </Fragment>
    );
};

const mapStateToProps = ({ adminCourses }) => {
    const { adminRefQstResponce, adminRefQuizQst } = adminCourses;
    return { adminRefQstResponce, adminRefQuizQst };
};

export default connect(mapStateToProps, {
    getAdminRfQuizResponceAction: getAdminRfQuizResponce,
    getAdminRefQuizQstActions: getAdminRefQuizQst
})(Quiz);
// export default Quiz;
