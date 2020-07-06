import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import EvaluationService from '../../service/EvaluationService';
import ReactDOM from 'react-dom';

export default function AddEvaluationModal(props) {
  const [clrCode, setClrCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const {register, handleSubmit, errors} = useForm();
  const studentId = props.studentId;
  //creating new evaluation
  const onSubmit = (data) => {
    const service = new EvaluationService();
    service
      .addEvaluation(data.evalDate, clrCode, data.remarks, studentId)
      .then((resp) => {
        const newEvaluations = [...props.evaluations, resp.evaluation];
        props.hide();
        props.setEvaluations(newEvaluations);
      })
      .catch((e) => setErrorMessage(e.response.data.message));
  };
  const handleRatingChange = (e) => {
    switch (e.target.name) {
      case 'clrCodeGreen':
        setClrCode(e.target.value);
        break;
      case 'clrCodeYellow':
        setClrCode(e.target.value);
        break;
      case 'clrCodeRed':
        setClrCode(e.target.value);
        break;
      default:
        break;
    }
  };
  return (
    <div>
      {props.isShowing &&
        ReactDOM.createPortal(
          <React.Fragment>
            <div className="show-popup-wrapper">
              <div className="show-popup-container flex-center">
                <img
                  src="/delete-image.png"
                  className="top-corner"
                  alt="vector delete"
                  onClick={props.hide}
                ></img>
                <form
                  className="form-container flex-column"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="flex-row">
                    <div className="form-item flex-row flex-center">
                      Evaluation Date{' '}
                    </div>
                    <input
                      className="input-date form-item"
                      type="date"
                      placeholder="Evaluation Date"
                      name="evalDate"
                      ref={register({
                        required: 'EVALUATION DATE REQUIRED',
                      })}
                    ></input>
                  </div>
                  <div className="flex-row">
                    <div className="form-item">Rating </div>
                    <div className="flex-column">
                      <div className="flex-row">
                        <input
                          className="form-item"
                          type="radio"
                          name="clrCodeGreen"
                          value="Green"
                          onChange={(e) => handleRatingChange(e)}
                        ></input>
                        <div className="form-item evaluation-green-txt">
                          Green
                        </div>
                      </div>
                      <div className="flex-row">
                        <input
                          className="form-item"
                          type="radio"
                          name="clrCodeYellow"
                          value="Yellow"
                          onChange={(e) => handleRatingChange(e)}
                        ></input>
                        <div className="form-item evaluation-yellow-txt">
                          Yellow
                        </div>
                      </div>
                      <div className="flex-row">
                        <input
                          className="form-item"
                          type="radio"
                          name="clrCodeRed"
                          value="Red"
                          onChange={(e) => handleRatingChange(e)}
                        ></input>
                        <div className="form-item evaluation-red-txt">Red</div>
                      </div>
                    </div>
                  </div>

                  <input
                    className="input-text form-item"
                    type="text"
                    placeholder="Add Remarks"
                    name="remarks"
                    ref={register({
                      required: 'REMARKS REQUIRED',
                    })}
                  ></input>
                  {errors.evalDate && <p>{errors.evalDate.message}</p>}
                  {errors.remarks && <p>{errors.remarks.message}</p>}
                  <input
                    className="input submit-bt"
                    type="submit"
                    value="Add Evaluation"
                  ></input>
                  {errorMessage && (
                    <div className="error-msg">* {errorMessage}</div>
                  )}
                </form>
              </div>
            </div>
          </React.Fragment>,
          document.body
        )}
    </div>
  );
}
