import React from 'react';
import ShowModal from '../../ShowModal';
import AddBatchModal from '../Batch/AddBatchModal';
import './Batch.css';
// import '../Index.css';
import Navigation from '../Navigation/Navigation';
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
              <div className="title border-line"><h1>Batch Overview</h1></div>
                {batch && <div>{batch.batchName}</div>}
                <button className="button" onClick={toggle}>
                  Add Batch
                </button>
                <AddBatchModal setUser={props.setUser} isShowing={isShowing} hide={toggle}/>
                {batch &&
                  <div className="batch-overview table-row-title">
                    <div className="batch-overview-item"><h3>Batch Name</h3></div>
                    <div className="batch-overview-item"><h3>Start Date</h3></div>
                    <div className="batch-overview-item"><h3>End Date</h3></div>
                    <div className="batch-overview-item"><h3>Delete Batch</h3></div>
                  </div>
                  }
                { batch && 
                  batch.map((batch, index) => {
                    return (
                        <div className="batch-overview table-row" key={index}>
                          <div className="batch-overview-item"> <Link className="link" to={`/batch/${batch._id}/students`}>{batch.batchName}</Link> </div>
                          <div className="batch-overview-item">
                            {moment(batch.stDate).format('MM-DD-YYYY')}
                          </div>
                          <div className="batch-overview-item">
                            {moment(batch.endDate).format('MM-DD-YYYY')}
                          </div>
                          <div className="batch-overview-item align-center">
                            <img
                                className="delete-image"
                                src={'/delete.png'}
                                alt="delete batch"
                                // onClick={() => deleteStudent(student._id)}
                              ></img>
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
