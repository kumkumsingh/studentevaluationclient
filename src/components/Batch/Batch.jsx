import React from 'react';
import ShowModal from '../../ShowModal';
import AddBatchModal from '../Batch/AddBatchModal';
import './Batch.css';
import '../Index.css';
import Navigation from '../Authorization/Navigation';
import { Redirect , Link } from "react-router-dom";

let moment = require('moment');

export default function Batch(props) {

  const batch = props.user.batches
  const {isShowing, toggle} = ShowModal();
  return (
    <>
      {/* <div>{` The value of isLoggedIn ${props.isLoggedIn}`}</div> */}
      {props.isLoggedIn ? (
        <div className="main-container">
          <Navigation {...props} />
          <div className="work-container">
            <div className="work-space">
              {batch && <div>{batch.batchName}</div>}
              <button onClick={toggle}>
                Add Batch
              </button>
              <AddBatchModal setUser={props.setUser} isShowing={isShowing} hide={toggle}/>
              {batch &&
                batch.map((batch, index) => {
                  return (
                      <div className="batch-overview" key={index}>
                        <div className="batch-overview-item"> <Link to={`/batch/${batch._id}/students`}>{batch.batchName}</Link> </div>
                        <div className="batch-overview-item">
                          {' '}
                          {moment(batch.stDate).format('MM-DD-YYYY')}
                        </div>
                        <div className="batch-overview-item">
                          {' '}
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
