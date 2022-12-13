/* eslint-disable indent */
import React from 'react';
import './IdeaList.scss';
import Layout from '../Layout';
import DataTable, { Alignment } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import Select from '../Helper/Select';
import IdeaDetail from './IdeaDetail';
import { getSubmittedIdeaList } from '../store/evaluator/action';
import { useDispatch, useSelector } from 'react-redux';

const IdeaList = () => {
    const topRef = React.useRef();
    const dispatch = useDispatch();
    const [ideaDetails, setIdeaDetails] = React.useState({});
    const ideaTypeData = ['Total Idea', 'Processed Idea', 'Yet to Processd'];
    // eslint-disable-next-line no-unused-vars
    const [ideaType, setIdeaType] = React.useState('Yet to Processd');
    const [isIdeaDetail, setIsIdeaDetail] = React.useState(false);
    const [currentRow, setCurrentRow] = React.useState(1);
    const [skipButtonText, setSkipButtonText] = React.useState('Next Idea');

    const idea_list = useSelector(
        (state) => state?.evaluator.submittedIdeaList
    );

    React.useEffect(() => {
        switch (ideaType) {
            case 'Total Idea':
                dispatch(getSubmittedIdeaList('SUBMITTED'));
                break;
            case 'Processed Idea':
                dispatch(getSubmittedIdeaList('SELECTEDROUND1'));
                break;
            case 'Yet to Processd':
                dispatch(getSubmittedIdeaList('SUBMITTED'));
                break;
        }

        // if (!idea_list) {
        //     dispatch(getSubmittedIdeaList('SELECTEDROUND1'));
        // }
        
    }, [ideaType]);
    React.useEffect(()=>{
        if (idea_list && idea_list?.length>0 && ideaType==='Yet to Processd') {
            setIdeaDetails(idea_list[0]);
            setIsIdeaDetail(true);
        }
    },[idea_list]);

    React.useEffect(() => {
        topRef.current.scrollIntoView({
            top: 0,
            behavior: 'smooth'
        });
    }, [isIdeaDetail]);

    const handleSkip = (currentColumnNo) => {
        if (idea_list && currentColumnNo < idea_list?.length) {
            setIdeaDetails(idea_list[currentColumnNo]);
            setIsIdeaDetail(true);
            setCurrentRow(currentColumnNo + 1);
            if (idea_list?.length - currentColumnNo == 1) {
                setSkipButtonText('Back To List');
            }
        } else {
            setSkipButtonText('Next Idea');
            setIdeaDetails({});
            setIsIdeaDetail(false);
            setCurrentRow(1);
        }
    };

    const submittedList = {
        data: idea_list || [],
        columns: [
            {
                name: 'SL.NO',
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
                selector: row =>  row.team_name||'',
                sortable: true,
                width: '20%'
            },
            {
                name: 'Idea Name',
                selector: row =>  row.sdg,
                width: '40%'
            },
            {
                name: 'Actions',
                cell: (params, index) => {
                    return [
                        <div className="d-flex" key={params}>
                            <div
                                className="btn btn-primary btn-lg mr-5 mx-2"
                                onClick={() => {
                                    setIsIdeaDetail(true);
                                    setIdeaDetails(params);
                                    setCurrentRow(index + 1);
                                    if (idea_list?.length - index == 1) {
                                        setSkipButtonText('Back To List');
                                    }else{
                                        setSkipButtonText('Next Idea');
                                    }
                                }}
                            >
                                View Idea Details
                            </div>
                        </div>
                    ];
                },
                width: '30%',
                left: true
            }
        ]
    };
    return (
        <Layout>
            <div
                className="container idea_list_wrapper pt-5 mb-50"
                ref={topRef}
            >
                {!isIdeaDetail ? (
                    <div className="row">
                        <div className="col-12 p-0">
                            <div className="submitted_lists bg-white border card pt-3">
                                <div className="d-flex ms-auto me-md-5 me-3 p-2 align-items-center">
                                    <p className="text-muted fs-3 m-0 me-2">
                                        Select Idea Type
                                    </p>
                                    <Select
                                        placeHolder={'Select Idea Type'}
                                        list={ideaTypeData}
                                        value={ideaType}
                                        setValue={setIdeaType}
                                    />
                                </div>
                                    <DataTableExtensions
                                        print={false}
                                        export={false}
                                        {...submittedList}
                                    >
                                        <DataTable
                                            data={idea_list || []}
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
                ) : isIdeaDetail ? (
                    <IdeaDetail
                        ideaDetails={ideaDetails}
                        setIsIdeaDetail={setIsIdeaDetail}
                        handleSkip={handleSkip}
                        currentRow={currentRow}
                        skipButtonText={skipButtonText}
                    />
                ) : (
                    <h2 className="my-auto text-center">No Data Available.</h2>
                )}
            </div>
        </Layout>
    );
};

export default IdeaList;
