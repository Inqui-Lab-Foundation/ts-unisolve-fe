import React from 'react';
import Layout from '../../Admin/Layout';
import { useHistory, withRouter } from 'react-router-dom';
import { Container, Row, Card, CardBody, CardText } from 'reactstrap';
import { BreadcrumbTwo } from '../../stories/BreadcrumbTwo/BreadcrumbTwo';
import { Button } from '../../stories/Button';

const CommonUserProfile = (props) => {
    const history = useHistory();
    
    const headingDetails = {
        title: 'User List Details',

        options: [
            {
                title: 'User List',
                path: '/admin/userlist'
            },
            {
                title: 'User List Profile'
            }
        ]
    };

    return (
        <Layout>
            <Container className="mt-5 pt-5 dynamic-form">
                <Row>
                    <div className="col-6">
                        <BreadcrumbTwo {...headingDetails} />
                    </div>
                    <div className="col-6 text-end">
                        <Button btnClass={"primary"} size="small" onClick={()=>history.push('/admin/userlist')} label="Back"/>
                    </div>
                </Row>
                <Row>
                    <Card className="py-5">
                        <CardBody>

                            {/* <h2 className="mb-4">Personal Details</h2> */}
                            
                            <CardText>
                                <span className='mx-3'><b>Name:</b></span>
                                <b>
                                    {props.location.data &&
                                                props.location.data.full_name ? props.location.data &&
                                                props.location.data.full_name : "-"}
                                </b>
                            </CardText>
                            <CardText>
                                <span className='mx-3'><b>Mobile:</b></span>
                                <b>
                                    {props.location.data &&
                                                props.location.data.mobile ? props.location.data &&
                                                props.location.data.mobile : "-"}
                                </b>
                            </CardText>
                            <CardText>
                                <span className='mx-3'><b>Email:</b></span>
                                <b>
                                    
                                    {props.location.data &&
                                                props.location.data?.email ? props.location.data &&
                                                props.location.data?.email : "-"}
                                </b>
                            </CardText>
                            {/* <Table bordered className="w-25">
                                <tbody>
                                    <tr>
                                        <th scope="row" className="w-25">
                                            ID
                                        </th>
                                        <td>
                                            {props.location.data &&
                                                props.location.data.mentor_id}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">NAME</th>
                                        <td>
                                            {props.location.data &&
                                                props.location.data.full_name}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">MOBILE</th>
                                        <td>
                                            {props.location.data &&
                                                props.location.data.mobile}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">STATUS</th>
                                        <td>
                                            {props.location.data &&
                                                props.location.data.status}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">CITY</th>
                                        <td>
                                            {props.location.data &&
                                                props.location.data.city}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">DISTRICT</th>
                                        <td>
                                            {props.location.data &&
                                                props.location.data.district}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">STATE</th>
                                        <td>
                                            {props.location.data &&
                                                props.location.data.state}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">COUNTRY</th>
                                        <td>
                                            {props.location.data &&
                                                props.location.data.country}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table> */}
                        </CardBody>
                    </Card>
                </Row>
                <Row className='my-5'>
                    <Card className="py-5">
                        <CardBody>

                            <h2 className="mb-4">Institution  Details</h2>
                            
                            
                            <CardText>
                                <span className='mx-3'><b>UDISE Code:</b></span>
                                <b>
                                    {props.location.data &&
                                                props.location.data?.organization_code ? props.location.data &&
                                                props.location.data?.organization_code : "-"}
                                </b>
                            </CardText>
                            <CardText>
                                <span className='mx-3'><b>School Name:</b></span>
                                <b>
                                    {props.location.data &&
                                                props.location.data?.organization_name ? props.location.data &&
                                                props.location.name?.organization_code : "-"}
                                </b>
                            </CardText>
                            <CardText>
                                <span className='mx-3'><b>City:</b></span>
                                <b>
                                    {props.location.data &&
                                                props.location.data?.city ? props.location.data &&
                                                props.location.name?.city : "-"}
                                </b>
                            </CardText>
                            <CardText>
                                <span className='mx-3'><b>District:</b></span>
                                <b>
                                    {props.location.data &&
                                                props.location.data?.district ? props.location.data &&
                                                props.location.name?.district : "-"}
                                </b>
                            </CardText>
                            
                        </CardBody>
                    </Card>
                </Row>
            </Container>
        </Layout>
    );
};

export default withRouter(CommonUserProfile);
