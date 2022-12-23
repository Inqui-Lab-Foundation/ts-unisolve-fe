/* eslint-disable indent */
import React from 'react';
import './dashboard.scss';
import Layout from '../Pages/Layout';

const eadmindashboard= () => {
  return (
    <Layout>
       <div className="container dashboard-wrapper mt-5 mb-50">
                <h2 className="mb-5">Dashboard</h2>
                <div className="dashboard">
                  <p>admin evaluator</p>
                </div>
            </div>
    </Layout>
  );
};

export default eadmindashboard;