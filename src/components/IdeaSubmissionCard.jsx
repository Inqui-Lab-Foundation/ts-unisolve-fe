import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Button } from '../stories/Button';

const IdeaSubmissionCard = ({handleClose,show,response}) => {
    const submittedResponse = response[0]?.response;
    const [answers, setAnswers] = useState([]);
    useEffect(() => {
        if (submittedResponse && submittedResponse !== {}) {
            const data = Object.entries(submittedResponse);
            const answerFormat = data.map((item) => {
                return {
                    question: item[1].question,
                    answer: item[1]?.selected_option
                };
            });
            setAnswers(answerFormat);
        }
    }, [submittedResponse]);
    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="assign-evaluator ChangePSWModal teacher-register-modal"
            backdrop="static"
        >
            <Modal.Header closeButton onHide={handleClose}>
                <Modal.Title
                    id="contained-modal-title-vcenter"
                    className="w-100 d-block text-center"
                >
                    {response[0].sdg}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {answers.length>0 && answers.map((item,i)=>    
                    <Card key={i} className="p-2 mb-3">
                        <CardTitle className='fw-bold'>{item.question}</CardTitle>
                        <CardBody>{item.answer}</CardBody>
                    </Card>
                )
                }
            </Modal.Body>
            <Modal.Footer>
                <Button size="small" label={"Close"} btnClass="primary ms-auto" onClick={handleClose}/>
            </Modal.Footer>
        </Modal>
    );
};

export default IdeaSubmissionCard;
