import React from 'react';
import ShowModal from '../../ShowModal';
import AddBatchModal from '../Batch/AddBatchModal';
import './Batch.css';
import '../Index.css';
import Navigation from '../Authorization/Navigation';
import { Redirect } from "react-router-dom";

let moment = require('moment');

export default function Batch(props) {

  const batch = props.user.batches
  const {isShowing, toggle} = ShowModal();
  return (
    <>
      <div>{` The value of isLoggedIn ${props.isLoggedIn}`}</div>
      {props.isLoggedIn ? (
        <div className="main-container">
          <Navigation />
          <div className="work-container">
            <div className="work-space">
              {batch && <div>{batch.batchName}</div>}
              <button onClick={toggle}>
                Add Batch
              </button>
              <AddBatchModal setUser={props.setUser} isShowing={isShowing} hide={toggle} />
              {batch &&
                batch.map((batch, index) => {
                  return (
                      <div key={index}>
                        <div> Batch Name : {batch.batchName} </div>
                        <div>
                          {' '}
                          Start Date :{' '}
                          {moment(batch.stDate).format('MM-DD-YYYY')}
                        </div>
                        <div>
                          {' '}
                          End Date :{' '}
                          {moment(batch.endDate).format('MM-DD-YYYY')}{' '}
                        </div>
                      </div>
                  );
                })}
            </div>
          </div>
        </div>
      ) 
      : 
      <>
        <Redirect to="/login" />
      </>
      }
    </>
  )
}
