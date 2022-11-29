import { Fragment, useLayoutEffect, useRef } from 'react';
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap';
import { Button } from '../../../stories/Button';
import Layout from '../../Layout';
import jsPDF from 'jspdf';
import { getCurrentUser } from '../../../helpers/Utils';
import TeacherCertificate from '../../../assets/media/img/teacher_certificate_V2.png';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
    getStudentDashboardStatus,
    studentPostSurveyCertificate,
    updateStudentCertificate
} from '../../../redux/studentRegistration/actions';
import CommonPage from '../../../components/CommonPage';
import moment from 'moment';

const Certificate = ({ type, currentUser,postSurveyStatus,certDate }) => {
    const { t } = useTranslation();
    const pdfRef = useRef(null);
    const partRef = useRef(null);
    const dispatch = useDispatch();
    const handleCertificateDownload = () => {
        const content = type ? partRef.current : pdfRef.current;
        const doc = new jsPDF('l', 'px', [210, 297]);
        doc.html(content, {
            callback: function (doc) {
                doc.save('certificate.pdf');
            }
        });
        dispatch(updateStudentCertificate(currentUser?.data[0]?.student_id));
    };
    const certDateCheck =()=>{
        const check = type ? certDate?.course_completed_date && moment(certDate?.course_completed_date).format("DD-MM-YYYY") : certDate?.post_survey_completed_date && moment(certDate?.post_survey_completed_date).format("DD-MM-YYYY");
        return check ? " on "+ check : "";
    };
    return (
        <Card className="course-sec-basic p-5 m-4" style={{backgroundColor:`${postSurveyStatus ? "":"lightgrey"}`}}>
            <CardBody>
                <CardTitle className=" text-left pt-4 pb-4" tag="h2">
                    {type
                        ? t('teacher_certificate.participate_certificate')
                        : t('teacher_certificate.certificate')}
                </CardTitle>
                <p>
                    {type
                        ? t('teacher_certificate.part_certificate_desc')
                        : t('teacher_certificate.certificate_desc')}
                </p>

                <div ref={type ? partRef : pdfRef} className="common-flex">
                    <div className='position-relative' style={{width:"fit-content"}}>
                        <span
                            className="text-capitalize"
                            style={{
                                position: 'absolute',
                                top: '8rem',
                                left: '2.3rem',
                                fontSize: '0.8rem'
                            }}
                        >
                            {currentUser?.data[0]?.full_name + certDateCheck()}  
                        </span>
                        <img
                            src={type ? TeacherCertificate : TeacherCertificate}
                            alt="certificate"
                            className='img-fluid mx-auto'
                            style={{
                                width: '297px',
                                height: '209px'
                            }}
                        />
                    </div>
                </div>
                <div className="text-center">
                    <Button
                        button="submit"
                        disabled={!postSurveyStatus}
                        label={
                            type
                                ? t('teacher_certificate.download_participate')
                                : t('teacher_certificate.download')
                        }
                        btnClass={`${postSurveyStatus ? "primary":"default" } mt-4`}
                        size="small"
                        style={{ marginRight: '2rem' }}
                        onClick={handleCertificateDownload}
                    />
                </div>
            </CardBody>
        </Card>
    );
};

const MyCertificate = () => {
    const { t } = useTranslation();
    const language = useSelector((state) => state?.studentRegistration?.studentLanguage);
    const  postSurveyStatusGl  = useSelector((state) => state?.studentRegistration?.postSurveyStatusGl);
    const dashboardStatus = useSelector((state) => state?.studentRegistration?.dashboardStatus);
    let {all_topics_count,topics_completed_count} = dashboardStatus ? dashboardStatus : {all_topics_count:null,topics_completed_count:null};
    const currentUser = getCurrentUser('current_user');
    const dispatch = useDispatch();
    useLayoutEffect(() => {
        if(!dashboardStatus)
            dispatch(getStudentDashboardStatus(currentUser.data[0].user_id, language));
        if(!postSurveyStatusGl)
            dispatch(studentPostSurveyCertificate(language));
    }, [language]);
    const enablePostSurvey = postSurveyStatusGl && postSurveyStatusGl === "COMPLETED";
    return (
        <Layout>
            <Container className="presuervey mb-50 mt-5 ">
                <Fragment>
                    {all_topics_count === topics_completed_count || enablePostSurvey  ? (
                        <Row>
                            <Col className='d-lg-flex'> 
                                <Certificate
                                    type={'participate'}
                                    currentUser={currentUser}
                                    postSurveyStatus={all_topics_count === topics_completed_count}
                                    certDate={dashboardStatus}
                                />
                                <Certificate currentUser={currentUser} certDate={dashboardStatus} postSurveyStatus={enablePostSurvey}/>
                            </Col>
                        </Row>
                    ) : (
                        <CommonPage text={t('dummytext.student_my_cer')} />
                    )
                    }
                </Fragment>
            </Container>
        </Layout>
    );
};

export default MyCertificate;
