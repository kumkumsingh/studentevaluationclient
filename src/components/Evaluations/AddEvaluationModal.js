import React , {useState} from 'react';
import {useForm} from 'react-hook-form';
import EvaluationService from '../../service/EvaluationService';
import ReactDOM from 'react-dom';
import './AddEvaluationModal.css';

export default function AddEvaluationModal(props) {
    const [clrCode , setClrCode ] = useState("")
    const { register, handleSubmit, errors } = useForm();
    const studentId = props.studentId
    const onSubmit = (data) => {
      const service = new EvaluationService();
      service
        .addEvaluation(data.evalDate, clrCode , data.remarks , studentId)
        .then((resp) => {
            const newEvaluations = [...props.evaluations, resp.evaluation]
            props.hide()
            props.setEvaluations(newEvaluations)
          })
        .catch((e) => console.log(e));
    };
   const handleRatingChange = (e) =>{
    switch (e.target.name) {
        case "clrCodeGreen":
          setClrCode(e.target.value);
          break;
        case "clrCodeYellow":
            setClrCode(e.target.value);
          break;
        case "clrCodeRed":
            setClrCode(e.target.value);
          break;
        default:
          break;
      }
    }
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
                      type="date"
                      placeholder="Evaluation Date"
                      name="evalDate"
                      ref={register({ 
                        required: "EVALUATION DATE REQUIRED" }
                    )}
                    ></input>
                    <div>Choose one of the Rating:</div>
                    <input type="radio" name="clrCodeGreen" value="Green" onChange = { e =>handleRatingChange(e)}></input><div>:Green</div><br></br>
                    <input type="radio" name="clrCodeYellow" value="Yellow" onChange = { e =>handleRatingChange(e)}></input><div>:Yellow</div><br></br>
                    <input type="radio" name="clrCodeRed" value="Red" onChange = { e =>handleRatingChange(e)}></input><div>:Red</div><br></br>
                    <input
                      className="input"
                      type="text"
                      placeholder="Add Remarks"
                      name="remarks"
                      ref={register({
                        required: "REMARKS REQUIRED"
                      })}
                    ></input>
                    {errors.evalDate && <p>{errors.evalDate.message}</p>}
                    {errors.remarks && <p>{errors.remarks.message}</p>}
                    <input className="input submit-bt" type="submit" value="Add Evaluation"></input>
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