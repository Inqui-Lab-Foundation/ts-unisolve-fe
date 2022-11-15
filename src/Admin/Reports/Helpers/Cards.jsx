import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'reactstrap';
import { CSVLink } from 'react-csv';

const Cards = ({ heading, list }) => {
    const report = [
        {
            Name: 'Teacher-one',
            Address: 'Address-one',
            Contact: '9801775504'
        },
        {
            Name: 'Teacher-two',
            Address: 'Address-two',
            Contact: '9801775505'
        }
    ];
    const handleDownload = () => {
        const element = document.getElementById('CSVBtn');
        element.click();
    };
    return (
        <Card className="p-3 mb-5">
            <h3 className="text-muted">{heading}</h3>
            <ul>
                {list.map((item, i) => {
                    const slug = item.replaceAll(' ', '-');
                    return i < 2 ? (
                        <li key={i}>
                            <Link
                                to={`/admin/selected-report?report=${slug}`}
                                exact
                                className="d-flex"
                            >
                                {item}
                            </Link>
                        </li>
                    ) : (
                        <li key={i}>
                            <Link
                                to="#"
                                exact
                                className="d-flex"
                                onClick={() => {
                                    handleDownload();
                                }}
                            >
                                {item}
                            </Link>
                        </li>
                    );
                })}
            </ul>
            <div className="m-3 common-flex">
                <CSVLink
                    style={{ display: 'none' }}
                    id={'CSVBtn'}
                    data={report}
                    filename="Teacher-report.csv"
                />
            </div>
        </Card>
    );
};

export default Cards;
