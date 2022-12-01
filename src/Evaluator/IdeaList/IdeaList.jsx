/* eslint-disable indent */
import React from 'react';
import './IdeaList.scss';
import Layout from '../Layout';
import DataTable, { Alignment } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
// import { Button } from '../../stories/Button';

const IdeaList = () => {
    const [ideaDetail, setIdeaDetail] = React.useState({});
    const ideaArray = [
        {
            id: 1,
            teamName: 'Prince Team',
            ideaName: 'My idea 1',
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
                name: 'Actions',
                cell: (params) => {
                    return [
                        <div
                            className="btn btn-success btn-lg mr-5 mx-2"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            key={params}
                            onClick={() => viewIdeaDetail(params)}
                        >
                            View Idea Details
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
                    <h2 className="mb-4">Submitted Ideas</h2>
                    <div className="row mb-md-4 mb-3">
                        <div className="col-lg-3 col-sm-5 p-0">
                            <div className="card p-5">
                                <h3 className="m-0">
                                    Processed:{' '}
                                    <span className="fs-1 text-success">
                                        12
                                    </span>
                                </h3>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-5">
                            <div className="card p-5">
                                <h3 className="m-0">
                                    Yet to Processed:{' '}
                                    <span className="fs-1 text-danger">50</span>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 p-0">
                            <div className="submitted_lists">
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
                                    <h2>Team Name: {ideaDetail?.teamName}</h2>
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
