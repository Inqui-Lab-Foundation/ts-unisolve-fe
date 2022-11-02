import { Descriptions } from 'antd';
import React, { useState } from 'react';
import { Button } from '../../../stories/Button';
import Checkbox from './Checkbox';
import { allDistricts, allStatus, allTypes } from './reportConstants';
import Select from './Select';
import { CSVLink } from 'react-csv';

const FilterCard = () => {
    const [district, setDistrict] = useState(null);
    const [type, setType] = useState([]);
    const [status, setStatus] = useState(null);
    const headers = [
        { label: 'First Name', key: 'firstname' },
        { label: 'Last Name', key: 'lastname' },
        { label: 'Email', key: 'email' }
    ];

    const data = [
        {
            firstname: 'Ahmed',
            lastname: 'Tomi',
            email: 'ah@smthing.co.com'
        },
        {
            firstname: 'Raed',
            lastname: 'Labes',
            email: 'rl@smthing.co.com'
        },
        {
            firstname: 'Yezzi',
            lastname: 'Min l3b',
            email: 'ymin@cocococo.com'
        }
    ];
    // const handleDownload = () => {
    console.log(status, district, type);

    // };
    return (
        <>
            <Descriptions
                bordered
                className="mt-3 text-left p-4"
                column={{ xxl: 1, xl: 1, lg: 1, md: 3, sm: 2, xs: 1 }}
            >
                <Descriptions.Item label="District">
                    <Select list={allDistricts} setValue={setDistrict} />
                </Descriptions.Item>
                <Descriptions.Item label="Type">
                    {Object.entries(allTypes).map((item, i) => (
                        <Checkbox
                            key={i}
                            setValue={setType}
                            selectedValues={type}
                            value={item}
                        />
                    ))}
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                    <Select list={allStatus} setValue={setStatus} />
                </Descriptions.Item>
            </Descriptions>
            <div className="m-3 common-flex">
                <CSVLink data={data} headers={headers}>
                    <Button
                        label={'Download Report'}
                        btnClass="primary"
                        size={'small'}
                        type="submit"
                        // onClick={handleDownload}
                    />
                </CSVLink>
            </div>
        </>
    );
};

export default FilterCard;
