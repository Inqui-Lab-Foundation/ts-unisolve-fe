/* eslint-disable indent */
import React from 'react';
import './IdeaList.scss';
import Layout from '../Layout';
import DataTable, { Alignment } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import Select from '../Helper/Select';
// import { Button } from '../../stories/Button';
import RatingModal from './RatingModal';

const IdeaList = () => {
    const [ideaDetail, setIdeaDetail] = React.useState({});
    const ideaTypeData=['Total Idea', 'Processed Idea', 'Yet to Processd'];
    // eslint-disable-next-line no-unused-vars
    const [ideaType, setIdeaType] = React.useState('');

    //---for rading modal---
    const [ratingModalShow, setRatingModalShow] = React.useState(false);
    const ideaArray = [
        {
            id: 1,
            teamName: 'Prince Team',
            ideaName: 'My idea 1',
            creationDate:'27-12-2022',
            idea: [
                {
                    id: 1,
                    question: 'Question one',
                    answer: 'answer one'
                },
                {
                    id: 2,
                    question: 'Question two',
                    answer: 'answer two'
                },
                {
                    id: 3,
                    question: 'Question three',
                    answer: 'answer three'
                },
                {
                    id: 4,
                    question: 'Question four',
                    answer: 'answer four'
                }
            ]
        },
        {
            id: 2,
            teamName: 'Aditya Team',
            ideaName: 'My idea 2',
            creationDate:'28-12-2022',
            idea: [
                {
                    id: 1,
                    question: 'Question one',
                    answer: 'answer one'
                },
                {
                    id: 2,
                    question: 'Question two',
                    answer: 'answer two'
                },
                {
                    id: 3,
                    question: 'Question three',
                    answer: 'answer three'
                },
                {
                    id: 4,
                    question: 'Question four',
                    answer: 'answer four'
                }
            ]
        },
        {
            id: 3,
            teamName: 'Vishnu Team',
            ideaName: 'My idea 3',
            creationDate:'29-12-2022',
            idea: [
                {
                    id: 1,
                    question: 'Question one',
                    answer: 'answer one'
                },
                {
                    id: 2,
                    question: 'Question two',
                    answer: 'answer two'
                },
                {
                    id: 3,
                    question: 'Question three',
                    answer: 'answer three'
                },
                {
                    id: 4,
                    question: 'Question four',
                    answer: 'answer four'
                }
            ]
        }
    ];
    const submittedList = {
        data: ideaArray,
        columns: [
            {
                name: 'Team Name',
                selector: 'teamName',
                sortable: true,
                width: '20%'
            },
            {
                name: 'Idea Name',
                selector: 'ideaName',
                width: '20%'
            },
            {
                name: 'Creation Date',
                selector: 'creationDate',
                width: '20%'
            },
            {
                name: 'Actions',
                cell: (params) => {
                    return [
                        <div
                            className="btn btn-primary btn-lg mr-5 mx-2"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            key={params}
                            onClick={() => viewIdeaDetail(params)}
                        >
                            View Idea Details
                        </div>,
                        <div
                        className="btn btn-warning btn-lg mr-5 mx-2"
                        key={params}
                        onClick={() => setRatingModalShow(true)}
                    >
                        Add Score
                    </div>
                    ];
                },
                width: '40%',
                left: true
            }
        ]
    };
    const viewIdeaDetail = (data) => {
        setIdeaDetail(data);
    };
    // const handleSubmit = () => {
    //     // setIsAcceptBtn(false);
    // };
    return (
        <>
            <Layout>
                <div className="container idea_list_wrapper mt-5 mb-50">
                    {/* <h2 className="mb-4">Submitted Ideas</h2> */}
                    <div className="row mb-md-4 mb-3">
                        <div className="tiles_card p-2">
                            <div className="p-4 w-100 h-100 card text-center border justify-content-center">
                                <h3 className="m-0">
                                    <span className="fs-1 text-primary">
                                        100
                                    </span><br/>
                                    Total Idea
                                </h3>
                            </div>
                        </div>
                        <div className="tiles_card p-2">
                            <div className="p-4 w-100 h-100 card text-center border justify-content-center">
                                <h3 className="m-0">
                                    <span className="fs-1 text-success">
                                        40
                                    </span><br/>
                                    Processed
                                </h3>
                            </div>
                        </div>
                        <div className="tiles_card p-2">
                            <div className="p-4 w-100 h-100 card text-center border justify-content-center">
                                <h3 className="m-0">
                                    <span className="fs-1 text-danger">60</span><br/>
                                    Yet to Processed
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 p-0">
                            <div className="submitted_lists bg-white border card pt-3">
                                <div className="d-flex ms-auto me-md-5 me-3 p-2 align-items-center">
                                        <p className="text-muted fs-3 m-0 me-2">Select Idea Type</p>
                                        <Select
                                            placeHolder={'Select Idea Type'}
                                            list={ideaTypeData}
                                            setValue={setIdeaType}
                                        />
                                    
                                </div>
                                <DataTableExtensions
                                    print={false}
                                    export={false}
                                    {...submittedList}
                                >
                                    <DataTable
                                        data={ideaArray}
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
                        </div>
                    </div>
                </div>
                
            </Layout>
            {/* <!-- Modal --> */}
            <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="w-100">
                                <h5
                                    className="modal-title text-center text-capitalize"
                                    id="staticBackdropLabel"
                                >
                                    {ideaDetail?.ideaName}
                                </h5>
                            </div>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-12 p-0">
                                        {ideaDetail?.idea?.map(
                                            (item, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="card p-4 my-4 border"
                                                    >
                                                        <h2>
                                                            {item?.question}
                                                        </h2>
                                                        <p>{item?.answer}</p>
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer justify-content-center">
                            <div>
                                <button
                                    className="btn btn-lg px-4 py-2 btn-success me-3"
                                    data-bs-dismiss="modal"
                                    // onClick={() => {}}
                                >
                                    <span className="fs-4">Accept</span>
                                </button>
                                <button
                                    className="btn btn-lg px-4 py-2 btn-danger me-3"
                                    data-bs-dismiss="modal"
                                    // onClick={() => {}}
                                >
                                    <span className="fs-4">Reject</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {ratingModalShow && (
                <RatingModal
                    show={ratingModalShow}
                    setShow={setRatingModalShow}
                    onHide={() => setRatingModalShow(false)}
                />
            )}
        </>
    );
};

export default IdeaList;

// <div className="col-md-6 p-0">
//   <div className="p-4 card rating-card mt-4">
//       <h2>Rate this Idea to continue.</h2>
//       <input
//           type="range"
//           list="tickmarks"
//           defaultValue={'0'}
//           min="0"
//           max="5"
//           step="1"
//           className="slider"
//           onChange={(e) =>
//               console.warn(e.target.value)
//           }
//       />

//       <datalist id="tickmarks">
//           <option
//               value="0"
//               label="0"
//           ></option>
//           <option
//               value="1"
//               label="1"
//           ></option>
//           <option
//               value="2"
//               label="2"
//           ></option>
//           <option
//               value="3"
//               label="3"
//           ></option>
//           <option
//               value="4"
//               label="4"
//           ></option>
//           <option
//               value="5"
//               label="5"
//           ></option>
//       </datalist>
//   </div>
//   <Button
//       label={'Submit'}
//       btnClass="primary mt-4"
//       size="small"
//       onClick={() => handleSubmit()}
//   />
// </div>
