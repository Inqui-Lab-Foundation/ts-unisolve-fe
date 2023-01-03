/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import Layout from '../../Admin/Layout';
import { Row, Col, Label, Container, Card } from 'reactstrap';
import { Button } from '../../stories/Button';
import {
    getNormalHeaders,
    openNotificationWithIcon
} from '../../helpers/Utils';
import axios from 'axios';
import { URL, KEY } from '../../constants/defaultValues';
import Check from './Pages/Check';
import { useDispatch, useSelector } from 'react-redux';
import { getDistrictData } from '../../redux/studentRegistration/actions';

const EditEvalProcess = (props) => {
    const evalID = JSON.parse(localStorage.getItem('eavlId'));

    useEffect(() => {
        dispatch(getDistrictData());
    }, []);

    const [selectedDistricts, setselectedDistricts] = useState([]);

    const dispatch = useDispatch();
    const fullDistrictsNames = useSelector(
        (state) => state?.studentRegistration?.dists
    );

    async function handledistricts() {
        const value = { district: selectedDistricts.toString() };
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        await axios
            .put(
                `${URL.updateEvalProcess + evalID.evaluation_process_id}`,
                JSON.stringify(value, null, 2),
                axiosConfig
            )
            .then((response) => {
                console.log(response);
                if (response.status == 200) {
                    openNotificationWithIcon(
                        'success',
                        'Districts Update Successfully'
                    );
                    props.history.push('/admin/evaluationProcess');
                }
            })
            .catch((err) => {
                return err.response;
            });
    }

    const handleclick = () => {
        handledistricts();
    };

    return (
        <Layout>
            <Container>
                <Card className="p-5 m-5">
                    <Row>
                        <Label className="mb-2 text-info">
                            Level Name :{' '}
                            <span className="text-muted">
                                {evalID && evalID.level_name}
                            </span>{' '}
                            No Of Evaluation :{' '}
                            <span className="text-muted">
                                {evalID && evalID.no_of_evaluation}
                            </span>
                        </Label>
                    </Row>
                    <Row>
                        <Label className="mb-2">Districts:</Label>
                        <Check
                            list={fullDistrictsNames}
                            value={selectedDistricts}
                            setValue={setselectedDistricts}
                        />
                    </Row>
                </Card>
                <Row>
                    <Col className="col-xs-12 col-sm-6">
                        <Button
                            label="Discard"
                            btnClass="secondary"
                            size="small"
                            onClick={() =>
                                props.history.push('/admin/evaluationProcess')
                            }
                        />
                    </Col>
                    <Col className="submit-btn col-xs-12 col-sm-6 text-right">
                        <Button
                            label="Save"
                            onClick={() => handleclick()}
                            btnClass={'primary'}
                            size="small"
                        />
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};
export default EditEvalProcess;
