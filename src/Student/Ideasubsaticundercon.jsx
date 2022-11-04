import { Fragment } from 'react';
import { Card, Container } from 'reactstrap';
import Layout from '../Student/Layout';
import Congo from '../assets/media/survey-success.jpg';

const IdeasubUC = () => {
    return (
        <Layout>
            <Container className="presuervey mb-50 mt-5 ">
                <Fragment>
                    <Card className="course-sec-basic p-5">
                        <div className="text-center">
                            <div>
                                <img
                                    className="img-fluid w-25"
                                    src={Congo}
                                ></img>
                            </div>
                            <div>
                                <h2 className="common-flex">
                                    Dear Participant, we hope you are having a
                                    great learning experience along with your
                                    team.
                                    <br /><br/>
                                    You can submit your idea once the Idea
                                    Submissions are open. Your Guide Teacher
                                    will share the details about this and assist
                                    you and your team.
                                    <br/><br/>
                                    All the best! : )
                                </h2>
                            </div>
                        </div>
                    </Card>
                </Fragment>
            </Container>
        </Layout>
    );
};

export default IdeasubUC;
