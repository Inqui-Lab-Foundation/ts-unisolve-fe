/* eslint-disable indent */
import React, { useEffect } from 'react';
import './EvaluatedIdea.scss';
import Layout from '../Layout';
import DataTable, { Alignment } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
// import { Button } from '../../stories/Button';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getL1EvaluatedIdea } from '../store/evaluator/action';
import EvaluatedIdeaDetail from './EvaluatedIdeaDetail';
import { Card, Container, Row, Col } from 'reactstrap';
import Select from '../Helper/Select';
import { getDistrictData } from '../../redux/studentRegistration/actions';
import { ReasonsOptions } from '../Admin/Pages/ReasonForRejectionData';
import { cardData } from '../../Student/Pages/Ideas/SDGData';

const EvaluatedIdea = () => {
    const dispatch = useDispatch();
    const [reason, setReason] = React.useState('');
    const [district, setdistrict] = React.useState('');
    const [sdg, setsdg] = React.useState('');
    const [status, setstatus] = React.useState('');
    const evaluatedIdeaList = useSelector(
        (state) => state?.evaluator.evaluatedIdeaL1
    );

    const SDGDate = cardData.map((i) => {
        return i.goal_title;
    });

    const fullDistrictsNames = useSelector(
        (state) => state?.studentRegistration?.dists
    );
    const statusdata = [
        'Accepted',
        'Rejected'
    ];

    React.useEffect(() => {
        dispatch(getL1EvaluatedIdea(filterParams));
    }, [reason,district,sdg,status]);

    useEffect(() => {
        dispatch(getDistrictData());
    }, []);

    const filterParams =
        (status && '&evaluation_status='+ (status==='Accepted'? 'SELECTEDROUND1':'REJECTEDROUND1'))+
        (district && '&district=' + district) +
        (sdg && '&sdg=' + sdg) +
        (reason && '&rejected_reason=' + reason);

    const [isDetail, setIsDetail] = React.useState(false);
    const [ideaDetails, setIdeaDetails] = React.useState({});
    // const evaluatedIdeaList = [
    //     {
    //         team_name: 'Test Team 1',
    //         sdg: 'Idea Name 1',
    //         initiated_name: 'Test Name'
    //     }
    // ];
    const evaluatedIdea = {
        data: evaluatedIdeaList || [],
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
                width: '6%'
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
                width: '20%'
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
                width: '17%'
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
                                View Idea Details
                            </div>
                        </div>
                    ];
                },
                width: '17%',
                left: true
            }
        ]
    };
    return (
        <Layout>
            <div className="container evaluated_idea_wrapper pt-5 mb-50">
                <div className="row">
                    <div className="col-12 p-0">
                        {!isDetail && (
                            <div>
                                <h2 className="ps-2 pb-3">Evaluated Idea</h2>
                                <Container>
                                    <Row>
                                        <Col>
                                            <Card>
                                                <div className="my-3 text-center">
                                                    <h3 className="mb-sm-4 mb-3">
                                                        Status
                                                    </h3>
                                                    <Select
                                                        list={
                                                            statusdata
                                                        }
                                                        setValue={setstatus}
                                                        placeHolder={
                                                            'Please Select'
                                                        }
                                                        value={status}
                                                    />
                                                </div>
                                            </Card>
                                        </Col>
                                        <Col>
                                            <Card>
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
                                        {status==='Rejected' && <Col>
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
                                        </Col>}
                                    </Row>
                                </Container>
                            </div>
                        )}

                        {!isDetail ? (
                            <div className="bg-white border card pt-3 mt-5">
                                <DataTableExtensions
                                    print={false}
                                    export={false}
                                    {...evaluatedIdea}
                                >
                                    <DataTable
                                        data={evaluatedIdeaList || []}
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
                            <EvaluatedIdeaDetail
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

export default EvaluatedIdea;
