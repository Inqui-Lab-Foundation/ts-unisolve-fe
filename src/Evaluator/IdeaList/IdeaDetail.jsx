/* eslint-disable indent */
import React from 'react';
import { Button } from '../../stories/Button';

const IdeaDetail = (props) => {
    // eslint-disable-next-line no-unused-vars
    const [teamResponse, setTeamResponse] = React.useState([]);

    React.useEffect(() => {
        if (props?.ideaDetails?.response) {
            setTeamResponse(
                Object.entries(props?.ideaDetails?.response).map((e) => e[1])
            );
        }
    }, [props]);
    return (
        <div className="row idea_detail_card">
            <div className="col-12 p-0 d-flex">
                <h2 className="mb-md-4 mb-3">
                    Idea Name:{' '}
                    <span className="text-capitalize fs-3">
                        {props?.ideaDetails?.sdg?.toLowerCase() || ''}
                    </span>
                </h2>
                <div className="ms-auto me-3">
                    <Button
                        btnClass="primary"
                        size="small"
                        label={props?.skipButtonText}
                        onClick={()=>props?.handleSkip(Number(props?.currentRow))}
                    />
                </div>
            </div>
            
            <div className="col-lg-8 order-lg-0 order-1 p-0 h-100">
                {teamResponse?.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="mb-4 my-3 comment-card px-5 py-3 card me-md-3"
                        >
                            <div className="question quiz mb-0">
                                <b
                                    style={{
                                        fontSize: '1.6rem'
                                    }}
                                >
                                    {item?.question_no || ''}.{' '}
                                    {item?.question || ''}
                                </b>
                            </div>
                            <div className="bg-light rounded p-5">
                                <p
                                    style={{
                                        fontSize: '1.4rem'
                                    }}
                                >
                                    {(typeof item?.selected_option == 'object'
                                        ? item?.selected_option?.map(
                                              (data, i) => {
                                                  return (
                                                      <div key={i}>
                                                          {data || ''}
                                                      </div>
                                                  );
                                              }
                                          )
                                        : item?.selected_option) || ''}
                                </p>
                            </div>
                        </div>
                    );
                })}
                <div className='d-flex'>
                <Button
                        btnClass="primary"
                        size="small"
                        label="Back to List"
                        onClick={() => {
                            props?.setIsIdeaDetail(false);
                        }}
                    />
                <div className="d-flex ms-auto">
                    <button
                        className="btn btn-lg px-5 py-2 btn-success me-3 rounded-pill"
                        data-bs-dismiss="modal"
                        // onClick={() => {}}
                    >
                        <span className="fs-4">Accept</span>
                    </button>
                    <button
                        className="btn btn-lg px-5 py-2 btn-danger me-3 rounded-pill"
                        data-bs-dismiss="modal"
                        // onClick={() => {}}
                    >
                        <span className="fs-4">Reject</span>
                    </button>
                </div>
                </div>
            </div>
            <div className="col-lg-4 order-lg-1 order-0 p-0 h-100 mt-3">
                <div className="level-status-card card border p-md-5 p-3 mb-3 me-lg-0 me-md-3">
                    L1 Status & TimeStamp
                </div>
                <div className="level-status-card card border p-md-5 p-3 mb-3 me-lg-0 me-md-3">
                    L2 Status & TimeStamp
                </div>
                <div className="level-status-card card border p-md-5 p-3 mb-3 me-lg-0 me-md-3">
                    Final Status & TimeStamp
                </div>
            </div>
        </div>
    );
};

export default IdeaDetail;
