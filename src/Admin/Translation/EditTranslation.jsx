import React, { useState, useEffect } from 'react';
import Layout from '../Layout';
import { Container, Row, Col, Card, Label, Form } from 'reactstrap';
import { RichText } from '../../stories/RichText/RichText';
import { Button } from '../../stories/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { getCurrentUser, openNotificationWithIcon } from '../../helpers/Utils';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';

const EditTranslation = (props) => {
    const currentUser = getCurrentUser('current_user');
    const history = useHistory();
    const translationData =
        (history && history.location && history.location.item) || {};

    const [editorStateOfFromKey, setEditorStateOfFromKey] = useState(() =>
        EditorState.createEmpty()
    );
    const [editorStateOfToValue, setEditorStateOfToValue] = useState(() =>
        EditorState.createEmpty()
    );

    useEffect(()=>{
        setEditorStateOfFromKey(
            EditorState.createWithContent(
                ContentState.createFromBlockArray(
                    convertFromHTML(translationData.key ? translationData.key : '')
                )
            )
        );
        setEditorStateOfToValue(
            EditorState.createWithContent(
                ContentState.createFromBlockArray(
                    convertFromHTML(translationData.value ? translationData.value : '')
                )
            )
        );
    },[]);

    const handleEditorChangeOfFromKey = (state) => {
        setEditorStateOfFromKey(state);
        formik.setFieldValue(
            'from_key',
            state.getCurrentContent().getPlainText()
        );
    };

    const handleEditorChangeOfToValue = (state) => {
        setEditorStateOfToValue(state);
        formik.setFieldValue(
            'to_value',
            state.getCurrentContent().getPlainText()
        );
    };
 
    const formik = useFormik({
        initialValues: {
            from: translationData && translationData.from_locale,
            from_key: translationData && translationData.key,
            to: translationData && translationData.to_locale,
            to_value: translationData && translationData.value
        },

        validationSchema: Yup.object({
            from: Yup.string().required('required'),
            from_key: Yup.string().required('required'),
            to: Yup.string().required('required'),
            to_value: Yup.string().required('required')
        }),

        onSubmit: (values) => {
            const from = values.from;
            const from_key = values.from_key;
            const to = values.to;
            const to_value = values.to_value;
            const body = JSON.stringify({
                from_locale: from,
                key: from_key,
                to_locale: to,
                value: to_value,
                status: "ACTIVE"
            });

            var config = {
                method: 'put',
                url: process.env.REACT_APP_API_BASE_URL + '/translations/'+ translationData.translation_id,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${currentUser.data[0].token}`
                },
                data: body
            };
            axios(config)
                .then(function (response) {
                    if (response.status === 200) {
                        props.history.push('/admin/translation');
                        openNotificationWithIcon(
                            'success',
                            'Translation Update Successfully'
                        );
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
    });

    return (
        <Layout>
            <Container className="mt-5 pt-5 mb-5">
                <Form onSubmit={formik.handleSubmit} isSubmitting>
                    <Row>
                        <Col>
                            <div>
                                <h2>Edit Translation</h2>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Card className="mt-5 mb-5 p-5">
                            <Col>
                                <Label>From</Label>
                                <Col className="form-group" md={12}>
                                    <div className="dropdown CalendarDropdownComp ">
                                        <select
                                            name="from"
                                            className="form-control custom-dropdown"
                                            value={formik.values.from}
                                            onChange={formik.handleChange}
                                        >
                                            <option value="">
                                                Select Language..
                                            </option>
                                            <option value="en">English</option>
                                            <option value="tn">Tamil</option>
                                        </select>
                                    </div>

                                    {formik.errors.from ? (
                                        <small className="error-cls">
                                            {formik.errors.from}
                                        </small>
                                    ) : null}
                                </Col>
                            </Col>
                            <Col>
                                <Label className="mb-2 mt-5">From_Key</Label>
                                <Col className="form-group" md={12}>
                                    <div 
                                    // style={{ height: '211px' }}
                                    >
                                        <RichText
                                            name="answer"
                                            value={formik.values.from_key}
                                            handleEditorChange={
                                                handleEditorChangeOfFromKey
                                            }
                                            editorState={editorStateOfFromKey}
                                        />
                                    </div>
                                    {formik.errors.from_key ? (
                                        <small className="error-cls">
                                            {formik.errors.from_key}
                                        </small>
                                    ) : null}
                                </Col>
                            </Col>
                        </Card>
                    </Row>
                    <Row>
                        <Card className="mt-5 mb-5 p-5">
                            <Col>
                                <Label>To</Label>
                                <Col className="form-group" md={12}>
                                    <div className="dropdown CalendarDropdownComp ">
                                        <select
                                            name="to"
                                            className="form-control custom-dropdown"
                                            value={formik.values.to}
                                            onChange={formik.handleChange}
                                        >
                                            <option value="">
                                                Select Language..
                                            </option>
                                            <option value="en">English</option>
                                            <option value="tn">Tamil</option>
                                        </select>
                                    </div>

                                    {formik.errors.to ? (
                                        <small className="error-cls">
                                            {formik.errors.to}
                                        </small>
                                    ) : null}
                                </Col>
                            </Col>
                            <Col>
                                <Label className="mb-2 mt-5">To_Value</Label>
                                <Col className="form-group" md={12}>
                                    <div 
                                    // style={{ height: '211px' }}
                                    >
                                        <RichText
                                            name="to_value"
                                            value={formik.values.to_value}
                                            handleEditorChange={
                                                handleEditorChangeOfToValue
                                            }
                                            editorState={editorStateOfToValue}
                                        />
                                    </div>
                                    {formik.errors.to_value ? (
                                        <small className="error-cls">
                                            {formik.errors.to_value}
                                        </small>
                                    ) : null}
                                </Col>
                            </Col>
                        </Card>
                    </Row>
                    <Row>
                        <hr className="my-5 w-100 mb-4 clearfix" />
                        <div className="row mb-4 justify-content-between">
                            <div className="col-6">
                                <Button
                                    label="Discard"
                                    size="small"
                                    btnClass="primary"
                                    type="cancel"
                                    onClick={() => history.push('/admin/translation')}
                                />
                            </div>
                            <div className="col-6 text-right">
                                <Button
                                    label="Update"
                                    type="submit"
                                    btnClass={
                                        !(formik.dirty && formik.isValid)
                                            ? 'default'
                                            : 'primary'
                                    }
                                    size="small"
                                    disabled={!(formik.dirty && formik.isValid)}
                                />
                            </div>
                        </div>
                    </Row>
                </Form>
            </Container>
        </Layout>
    );
};

export default EditTranslation;
