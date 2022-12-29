import { Fragment } from 'react';
import { Card, Container } from 'reactstrap';
import Congo from '../assets/media/survey-success.jpg';
import IdeaSuccessImg from '../assets/media/idea-success.jpg';
import { Button } from '../stories/Button';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

const CommonPage = ({ text, showButton, showChallenges }) => {
    const { t } = useTranslation();
    const history = useHistory();
    const handleClick = () => {
        history.push('/student/post-survey');
    };

    return (
        <Container className="presuervey mb-50 mt-5 ">
            <Fragment>
                <Card className="course-sec-basic p-5">
                    <div className="text-center">
                        <div>
                            <img
                                className={`${
                                    showButton ? 'w-50' : 'w-25'
                                } img-fluid `}
                                src={showButton ? IdeaSuccessImg : Congo}
                            ></img>
                        </div>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: text ? text : 'Coming Soon...'
                            }}
                        >
                            {/* <h2 className="common-flex">
                                {text ? text : 'Coming Soon...'}
                            </h2> */}
                        </div>
                    </div>
                    {showButton && (
                        <div className="d-sm-flex justify-content-between mb-3 text-center">
                            <Button
                                type="button"
                                btnClass="primary mt-4 mx-4"
                                onClick={() => showChallenges()}
                                size="small"
                                label={t('student.view_idea')}
                            />
                            <Button
                                label={t('student.continue')}
                                btnClass="primary mt-4 mx-4"
                                size="small"
                                onClick={() => handleClick()}
                            />
                        </div>
                    )}
                </Card>
            </Fragment>
        </Container>
    );
};

export default CommonPage;
