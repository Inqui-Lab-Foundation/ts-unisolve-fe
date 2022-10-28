import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'reactstrap';

const Cards = ({ heading, list }) => {
    return (
        <Card className="p-3 mb-5">
            <h3 className="text-muted">{heading}</h3>
            <ul>
                {list.map((item, i) => {
                    const slug = item.replaceAll(" ","-");
                    return (
                        <li key={i}>
                            <Link
                                to={`/admin/selected-report?report=${slug}`}
                                exact
                                className="d-flex"
                            >
                                {item}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </Card>
    );
};

export default Cards;
