/* eslint-disable indent */
import React, { useEffect } from 'react';
import './ViewSelectedIdea.scss';
import Layout from '../Pages/Layout';
import DataTable, { Alignment } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import moment from 'moment';
import ViewDetail from './ViewDetail';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { URL, KEY } from '../../../constants/defaultValues';
import { getNormalHeaders } from '../../../helpers/Utils';
import { Button } from '../../../stories/Button';
import Select from '../../Helper/Select';
import { Card, Col, Container, Row } from 'reactstrap';
import { cardData } from '../../../Student/Pages/Ideas/SDGData.js';
import { useSelector } from 'react-redux';
import { getDistrictData } from '../../../redux/studentRegistration/actions';
import { useDispatch } from 'react-redux';
import { ReasonsOptions } from '../Pages/ReasonForRejectionData';

const ViewSelectedIdea = () => {
    const { search } = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const title = new URLSearchParams(search).get("title");
    const status = new URLSearchParams(search).get("status");
    const evaluation_status = new URLSearchParams(search).get("evaluation_status");
    const [isDetail, setIsDetail] = React.useState(false);
    const [ideaDetails, setIdeaDetails] = React.useState({});
    const [tableDate, settableDate] = React.useState({});
    const [reason, setReason] = React.useState('');
    const [district, setdistrict] = React.useState('');
    const [sdg, setsdg] = React.useState('');

    const SDGDate = cardData.map((i) => {
        return i.goal_title;
    });
    const fullDistrictsNames = useSelector(
        (state) => state?.studentRegistration?.dists
    );

    const dataParam =  title === 'Submitted' ? 'status='+status : 'evaluation_status='+evaluation_status;
    const filterParams = (district && '&district='+district) + (sdg && '&sdg='+sdg) + (reason &&'&rejected_reason='+reason);
    console.log(filterParams);

    useEffect(() => {
        dispatch(getDistrictData());
    },[]);
    
    useEffect(() => {
        handleideaList();
    }, [reason,district,sdg]);

    async function handleideaList() {
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        await axios
            .get(`${URL.getidealist}${dataParam}${filterParams}`, axiosConfig)
            .then(function (response) {
                if (response.status === 200) {
                    settableDate(
                        response.data &&
                            response.data.data[0] &&
                            response.data.data[0].dataValues
                    );
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const evaluatedIdea = {
        data: tableDate && tableDate.length > 0 ? tableDate : [],
        columns: [
            {
                name: 'No',
                cell: (params, index) => {
                    return [
                        <div className="ms-3" key={params}>
                            {index + 1}
                        </div>
                    ];
                },
                sortable: true,
                width: '7%'
            },
            {
                name: 'Team Name',
                selector: (row) => row.team_name || '',
                sortable: true,
                width: '15%'
            },
            {
                name: 'Idea Name',
                selector: (row) => row.sdg,
                width: '15%'
            },
            {
                name: 'Submitted By',
                selector: (row) => row.initiated_name,
                width: '15%'
            },
            {
                name: 'Evaluated At',
                selector: (row) =>
                    row.evaluated_at
                        ? moment(row.evaluated_at).format('DD-MM-YY h:mm:ss a')
                        : row.evaluated_at,
                width: '15%'
            },
            {
                name: 'Evaluated Name',
                cell: (row) => {
                    return [row.evaluated_name ? row.evaluated_name : ''];
                },
                width: '15%'
            },
            {
                name: 'Status',
                // selector: (row) => row.evaluation_status && row.evaluation_status=='SELECTEDROUND1'?'Accepted':row.evaluation_status=='REJECTEDROUND1'?'Rejected':'',
                cell: (row) => {
                    return [
                        <div className="d-flex" key={row}>
                            {row.evaluation_status &&
                                row.evaluation_status == 'SELECTEDROUND1' && (
                                    <span className="text-success">
                                        Accepted
                                    </span>
                                )}
                            {row.evaluation_status == 'REJECTEDROUND1' && (
                                <span className="text-danger">Rejected</span>
                            )}
                        </div>
                    ];
                },
                width: '10%'
            },
            {
                name: 'Actions',
                cell: (params) => {
                    return [
                        <div className="d-flex" key={params}>
                            <div
                                className="btn btn-primary btn-lg mr-5 mx-2"
                                onClick={() => {
                                    setIdeaDetails(params);
                                    setIsDetail(true);
                                }}
                            >
                                View
                            </div>
                        </div>
                    ];
                },
                width: '8%',
                left: true
            }
        ]
    };

    const evaluatedIdeaforsub = {
        data: tableDate && tableDate.length > 0 ? tableDate : [],
        columns: [
            {
                name: 'No',
                cell: (params, index) => {
                    return [
                        <div className="ms-3" key={params}>
                            {index + 1}
                        </div>
                    ];
                },
                sortable: true,
                width: '10%'
            },
            {
                name: 'Team Name',
                selector: (row) => row.team_name || '',
                sortable: true,
                width: '21%'
            },
            {
                name: 'Idea Name',
                selector: (row) => row.sdg,
                width: '21%'
            },
            {
                name: 'Submitted By',
                selector: (row) => row.initiated_name,
                width: '21%'
            },
            {
                name: 'Status',
                cell: (row) => row.status,
                width: '11%'
            },
            {
                name: 'Actions',
                cell: (params) => {
                    return [
                        <div className="d-flex" key={params}>
                            <div
                                className="btn btn-primary btn-lg mr-5 mx-2"
                                onClick={() => {
                                    setIdeaDetails(params);
                                    setIsDetail(true);
                                }}
                            >
                                View
                            </div>
                        </div>
                    ];
                },
                width: '12%',
                left: true
            }
        ]
    };
    const sel =
        title === 'Submitted' ? evaluatedIdeaforsub : evaluatedIdea;
    return (
        <Layout>
            <div className="container evaluated_idea_wrapper pt-5 mb-50">
                <div className="row">
                    <div className="col-12 p-0">
                        {!isDetail && (
                            <div>
                                <h2 className="ps-2 pb-3">
                                    {title} Ideas
                                </h2>

                                <Container>
                                    <Row>
                                        <Col>
                                            <Card>
                                                {' '}
                                                <div className="my-3 text-center">
                                                    <h3 className="mb-sm-4 mb-3">
                                                        District
                                                    </h3>
                                                    <Select
                                                        list={
                                                            fullDistrictsNames
                                                        }
                                                        setValue={setdistrict}
                                                        placeHolder={
                                                            'Please Select'
                                                        }
                                                        value={district}
                                                    />
                                                </div>
                                            </Card>
                                        </Col>
                                        <Col>
                                            <Card>
                                                <div className="my-3 text-center">
                                                    <h3 className="mb-sm-4 mb-3">
                                                        SDG
                                                    </h3>
                                                    <Select
                                                        list={SDGDate}
                                                        setValue={setsdg}
                                                        placeHolder={
                                                            'Please Select'
                                                        }
                                                        value={sdg}
                                                    />
                                                </div>
                                            </Card>
                                        </Col>
                                        {title === 'Rejected'?
                                        <Col>
                                        <Card>
                                            <div className="my-3 text-center">
                                                <h3 className="mb-sm-4 mb-3">
                                                    Reason for rejection.
                                                </h3>
                                                <Select
                                                    list={ReasonsOptions}
                                                    setValue={setReason}
                                                    placeHolder={
                                                        'Please Select'
                                                    }
                                                    value={reason}
                                                />
                                            </div>
                                        </Card>
                                    </Col> :''}
                                        <Col>
                                            <div className="text-right pb-4">
                                                <Button
                                                    btnClass="primary"
                                                    size="small"
                                                    label="Back"
                                                    onClick={() =>
                                                        history.goBack()
                                                    }
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        )}

                        {!isDetail ? (
                            <div className="bg-white border card pt-3 mt-5">
                                <DataTableExtensions
                                    print={false}
                                    export={false}
                                    {...sel}
                                >
                                    <DataTable
                                        data={tableDate || []}
                                        defaultSortField="id"
                                        defaultSortAsc={false}
                                        pagination
                                        highlightOnHover
                                        fixedHeader
                                        subHeaderAlign={Alignment.Center}
                                        paginationRowsPerPageOptions={[
                                            10, 20, 30
                                        ]}
                                        paginationPerPage={10}
                                    />
                                </DataTableExtensions>
                            </div>
                        ) : (
                            <ViewDetail
                                ideaDetails={ideaDetails}
                                setIsDetail={setIsDetail}
                            />
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ViewSelectedIdea;
