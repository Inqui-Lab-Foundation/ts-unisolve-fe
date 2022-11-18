import React, { useState } from 'react';
import './style.scss';
import Layout from '../../Layout.jsx';
import { Container } from 'reactstrap';
import { getCurrentUser } from '../../../helpers/Utils';
import { useTranslation } from 'react-i18next';
import CommonPage from '../../../components/CommonPage';

const SDG = () => {
    const currentUser = getCurrentUser('current_user');
    const { t } = useTranslation();
    console.log(currentUser);
    const comingSoonText = t('dummytext.student_idea_sub');
    const [showPage, setshowPage] = useState(true);
    console.log(setshowPage);
    return (
        <Layout>
            {showPage ? (
                <CommonPage text={comingSoonText} />
            ) : (
                <Container className="mb-50 mt-5 ">
                    <h2>Sustainable Development Goals</h2>
                    <hr />
                </Container>
            )}
        </Layout>
    );
};

export default SDG;
