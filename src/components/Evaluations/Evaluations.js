import React, {useState, useEffect} from 'react';
import ShowModal from '../../ShowModal';
import Navigation from '../Navigation/Navigation';
import { Redirect } from 'react-router-dom';
import StudentService from '../../service/StudentService';
import AddEvaluationModal from '../Evaluations/AddEvaluationModal';
// import '../Index.css';
import './Evaluations.css'

export default function Evaluations(props) {
    const studentId = props.match.params.studentId
    const [evaluations, setEvaluations] = useState([]);
    const {isShowing, toggle} = ShowModal();
    const [studentName, setStudentName ] = useState('');
    useEffect(() => {
      const service = new StudentService();
      service
        .getStudentDetails(studentId)
        .then((resp) => {
            setStudentName(resp.student.name) 
            // console.log('what is in evalres',resp)
           if(resp.student.evaluations) {
            setEvaluations(resp.student.evaluations); 
           }
        })
        .catch((e) => console.log(e));
    }, [studentId]);

    return (
      <>
        {props.isLoggedIn ? (
          <div className="main-container">
            <Navigation {...props}/>
            <div className="work-container">
              <div className="work-space">
              <div className="title border-line"><h1>{studentName}'s Evaluation</h1></div>

                <button className="button" onClick={toggle}>Add Evaluation</button>
                <AddEvaluationModal studentId={studentId} evaluations={evaluations} setEvaluations={setEvaluations} isShowing={isShowing} hide={toggle} />
                {evaluations && 
                  <div className="evaluation-title flex-row">
                        <div className="evaluation-item"><h3>Evaluated Date</h3></div>
                        <div className="evaluation-item"><h3> Remarks</h3></div>
                        <div className="evaluation-item"><h3>Last Color Code</h3></div>
                  </div>
                }
                {evaluations &&
                    evaluations.map((evaluation, index) => {
                    return (
                      <div className="evaluation-row flex-row" key={index}>
                        <div className="evaluation-item">{evaluation.evalDate}</div>
                        <div className="evaluation-item">{evaluation.remarks}</div>
                        <div className="evaluation-item">{evaluation.clrCode}</div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        ) : (
          <>
            <Redirect to="/login" />
          </>
        )}
      </>
    );
  }
  