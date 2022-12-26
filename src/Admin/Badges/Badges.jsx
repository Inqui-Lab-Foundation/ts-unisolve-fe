/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Button } from '../../stories/Button';
import { getNormalHeaders } from '../../helpers/Utils';
import Layout from '../../Admin/Layout';
import { getDistrictData } from '../../redux/studentRegistration/actions';
// import PageConstruction from '../../components/PageUnderConstrcution';
import { connect } from 'react-redux';
import { cardData } from '../../Student/Pages/Ideas/SDGData';
import { URL, KEY } from '../../constants/defaultValues';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DataTable, { Alignment } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';

const BadgesComp = (props) => {
    const [district, setDistrict] = useState('');
    const [sdg, setSdg] = useState('');
    const [count, setCount] = useState(0);
    const [chalRes, setChalRes] = useState([]);
    useEffect(() => {
        props.getDistrictsListAction();
    }, []);

    // const handleView = () => {};

    const handleGetDetails = () => {
        // console.log(e);
        let axiosConfig = getNormalHeaders(KEY.User_API_Key);
        axiosConfig['params'] = {
            district: district,
            sdg: sdg
        };
        axios
            .get(`${URL.getChallengeList}`, axiosConfig)
            .then((response) => {
                setCount(count + 1);
                if (response?.status === 200) {
                    setChalRes(response.data && response.data.data);
                }
            })
            .catch((err) => {
                console.log(err);
                return err.response;
            });

        // props.history.push({
        //     pathname: '/challenges'
        // });
        // var data = [];
        // data.push({ team_id: '6667' });
        // localStorage.setItem('data', JSON.stringify(data));
        // const language = {
        //     code: 'en',
        //     name: 'English',
        //     country_code: 'in'
        // };
        // localStorage.setItem('language', JSON.stringify(language));
    };

    const challengesData = {
        data: chalRes,
        columns: [
            {
                name: 'Initiated Name',
                selector: 'initiated_name',
                sortable: true,
                center: true,
                width: '10%'
            },
            {
                name: 'Team Id',
                selector: (row) => row.team.team_id,
                center: true,
                width: '8%'
            },
            {
                name: 'Team Name',
                selector: (row) => row.team.team_name,
                center: true,
                width: '15%'
            },
            {
                name: 'Mentor Name',
                selector: 'full_name',
                center: true,
                width: '15%'
            },
            {
                name: 'District',
                selector: 'dist',
                center: true,
                width: '10%'
            },
            {
                name: 'Sdg',
                selector: 'sdg',
                center: true,
                width: '10%'
            },
            {
                name: 'Status',
                selector: 'status',
                center: true,
                width: '10%'
            },
            {
                name: 'Actions',
                selector: 'actions ',
                center: true,
                width: '15%',
                cell: (row) => [
                    <>
                        <Link
                            exact="true"
                            key={row.team_id}
                            // onClick={() => handleView()}
                            style={{ marginRight: '7px' }}
                        >
                            <div className="btn btn-primary btn-lg mx-2">
                                View
                            </div>
                        </Link>
                    </>
                ]
            }
        ]
    };

    const handleSelect = (e, item) => {
        setCount(0);
        if (item == '1') {
            setDistrict(e);
        } else {
            setSdg(e);
        }
    };

    return (
        <Layout>
            <Container className="Challenge-page mt-5 mb-50 Challenges">
                <Row className="pt-3">
                    <Row className="mb-2 mb-sm-5 mb-md-5 mb-lg-0">
                        <Col className="col-auto">
                            <h2>CHALLENGES</h2>
                        </Col>
                        <Row className="mt-4 pt-3">
                            <Col className=" col-auto mx-auto my-auto ">
                                <div className="dropdown">
                                    <div className="d-flex justify-content-end">
                                        <div
                                            className={`d-flex ${'justify-content-right'}`}
                                        >
                                            <hr className="mt-4 mb-4"></hr>
                                            <label className="mb-2 ">
                                                District :{' '}
                                            </label>
                                            <select
                                                onChange={(e) =>
                                                    handleSelect(
                                                        e.target.value,
                                                        '1'
                                                    )
                                                }
                                                value={district}
                                                name="districts"
                                                id="districts"
                                                className="text-capitalize"
                                            >
                                                <option value="">
                                                    Select District
                                                </option>
                                                {props.dists &&
                                                props.dists.length > 0 ? (
                                                    props.dists.map(
                                                        (item, i) => (
                                                            <option
                                                                key={i}
                                                                value={item}
                                                            >
                                                                {item}
                                                            </option>
                                                        )
                                                    )
                                                ) : (
                                                    <option value="">
                                                        There are no Districts
                                                    </option>
                                                )}
                                            </select>
                                        </div>
                                        {/* <br /> */}
                                        <Col className=" mx-auto ">
                                            <div className="d-flex justify-content-end">
                                                <label className="mx-auto">
                                                    Sdg :{' '}
                                                </label>
                                                <select
                                                    onChange={(e) =>
                                                        handleSelect(
                                                            e.target.value,
                                                            '2'
                                                        )
                                                    }
                                                    name="sdg"
                                                    id="sdg"
                                                    className="text-capitalize"
                                                >
                                                    <option value="">
                                                        Select Sdg
                                                    </option>
                                                    {cardData &&
                                                    cardData.length > 0 ? (
                                                        cardData.map(
                                                            (item, i) => (
                                                                <option
                                                                    key={i}
                                                                    value={
                                                                        item.goal_title
                                                                    }
                                                                >
                                                                    {
                                                                        item.goal_title
                                                                    }
                                                                </option>
                                                            )
                                                        )
                                                    ) : (
                                                        <option value="">
                                                            There are no Sdg
                                                        </option>
                                                    )}
                                                </select>
                                            </div>
                                        </Col>
                                        {/* <hr className="mt-4 mb-4"></hr> */}
                                        {district != '' && sdg != '' && (
                                            <div className="d-flex justify-content-end">
                                                <Button
                                                    label="Get Challenges"
                                                    btnClass="primary mx-3"
                                                    size="small"
                                                    shape="btn-square"
                                                    onClick={handleGetDetails}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        {count != 0 && (
                            <div>
                                <DataTableExtensions
                                    print={false}
                                    export={false}
                                    // style={{ fontSize: '10' }}
                                    {...challengesData}
                                >
                                    <DataTable
                                        // data={SRows}
                                        // style={{ fontSize: 8 }}
                                        noHeader
                                        defaultSortField="id"
                                        defaultSortAsc={false}
                                        pagination
                                        highlightOnHover
                                        fixedHeader
                                        subHeaderAlign={Alignment.Center}
                                    />
                                </DataTableExtensions>
                            </div>
                        )}
                    </Row>
                </Row>
            </Container>
        </Layout>
    );
};

const mapStateToProps = ({ studentRegistration }) => {
    const { dists } = studentRegistration;
    return {
        dists
    };
};
export default connect(mapStateToProps, {
    getDistrictsListAction: getDistrictData
})(BadgesComp);
