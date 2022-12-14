import React from 'react';
import { Card } from 'reactstrap';
import Layout from '../Layout';
import { Button } from '../../stories/Button';
import { useHistory } from 'react-router-dom';

const Instructions = () => {
    const history = useHistory();
    return (
        <Layout>
            <Card className="m-5 p-5">
                <h1>Instructions</h1>
                <div className='text-right'>
                    <Button
                        label={"let's start"}
                        btnClass="primary mx-3"
                        size="small"
                        shape="btn-square"
                        onClick={() =>
                            history.push('/evaluator/submitted-ideas')
                        }
                    ></Button>
                </div>
            </Card>
        </Layout>
    );
};

export default Instructions;
