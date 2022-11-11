import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { Doughnut } from 'react-chartjs-2';
import 'antd/dist/antd.css';
import { Progress } from 'reactstrap';
import { Table } from 'antd';
import { getAdminTeamsList, getTeamMemberStatus } from '../store/teams/actions';
import { useSelector } from 'react-redux';
import { useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                '#00008b',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                '#00008b',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
        }
    ]
};
export const options = {
    indexAxis: 'y',
    elements: {
        bar: {
            borderWidth: 1
        }
    },
    responsive: true,
    plugins: {
        legend: {
            position: 'left'
        },
        title: {
            display: true,
            text: 'Student progress'
        }
    }
};

export default function DoughnutChart({ user }) {
    const dispatch = useDispatch();
    const { teamsList, teamsMembersStatus } = useSelector(
        (state) => state.teams
    );
    const [teamId, setTeamId] = useState(null);
    useEffect(() => {
        dispatch(getTeamMemberStatus(teamId));
    }, [teamId]);
    const percentageBWNumbers = (a, b) => {
        return (((a - b) / a) * 100).toFixed(2);
    };

    useLayoutEffect(() => {
        dispatch(getAdminTeamsList(user[0].mentor_id));
    }, [user[0].mentor_id]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'full_name'
        },
        {
            title: 'Progress',
            dataIndex: 'address',
            render: (_, record) => (
                <Progress
                    key={'25'}
                    className="progress-height"
                    animated
                    value="25"
                >
                    {Math.round(
                        100 -
                            percentageBWNumbers(
                                record.all_topics_count,
                                record.topics_completed_count
                            )
                    )}
                    %
                </Progress>
            )
        }
    ];
    return (
        <>
            <div style={{ width: '50%' }} className="select-team">
                {
                    <div className="row flex-column p-4">
                        <label htmlFor="teams" className="mb-3">
                            Choose a Team:
                        </label>

                        <select
                            onChange={(e) => setTeamId(e.target.value)}
                            name="teams"
                            id="teams"
                        >
                            <option value="">Select Team</option>
                            {teamsList && teamsList.length > 0 ? (
                                teamsList.map((item, i) => (
                                    <option key={i} value={item.team_id}>
                                        {item.team_name}
                                    </option>
                                ))
                            ) : (
                                <option value="">No Data found</option>
                            )}
                        </select>
                    </div>
                }
                {teamsMembersStatus.length > 0 ? (
                    <Table
                        bordered
                        pagination={false}
                        dataSource={teamsMembersStatus}
                        columns={columns}
                    />
                ) : (
                    <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ minHeight: '25rem' }}
                    >
                        <h2 className='text-primary'>Please Select a Team*</h2>
                    </div>
                )}
            </div>
            {/* <div style={{ width: '50%' }}>
                <Doughnut options={options} data={data} />
            </div> */}
        </>
    );
}
