import React from 'react';
import {useForm} from 'react-hook-form';
import BatchService from '../../service/BatchService';
import ReactDOM from 'react-dom';
import './AddBatchModal.css';

export default function AddBatchModal(props) {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    const service = new BatchService();
    service
      .addBatch(data.batchName, data.stDate , data.endDate)
      .then((resp) => {
        props.setUser(resp.user)
        })
      .catch((e) => console.log(e));
  };
  return (
    <div>
      { props.isShowing 
        && ReactDOM.createPortal(
            <React.Fragment>
              <div className="show-popup-wrapper">
                <div className="show-popup-container">
                  <button onClick={props.hide} className="top-corner">
                    Close
                  </button>
                  <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
                  <input
                    className="input"
                    type="text"
                    placeholder="Batch Name"
                    name="batchName"
                    ref={register({ 
                      required: "BATCH NAME REQUIRED" }
                  )}
                  ></input>
                  <input
                    className="input date"
                    type="date"
                    name="stDate"
                    placeholder="Start Date"
                    ref={register({
                      required: "START DATE REQUIRED"
                    })}
                  ></input>
                  <input
                    className="input date"
                    type="date"
                    name="endDate"
                    placeholder="End Date"
                    ref={register({
                      required: "END DATE REQUIRED"
                    })}
                  ></input>
                  {errors.batchName && <p>{errors.batchName.message}</p>}
                  {errors.stDate && <p>{errors.stDate.message}</p>}
                  {errors.endDate && <p>{errors.endDate.message}</p>}
                  <input className="input submit-bt" type="submit" value="Add Class"></input>
                </form> 
                </div>
              </div>
            </React.Fragment>,
            document.body
          )
        }
    </div>
  );
}
