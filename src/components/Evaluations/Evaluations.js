import React, {useState, useEffect} from 'react';
import ShowModal from '../../ShowModal';
import Navigation from '../Authorization/Navigation';
import { Redirect , Link} from 'react-router-dom';
import StudentService from '../../service/StudentService';
import AddEvaluationModal from '../Evaluations/AddEvaluationModal';
import '../Index.css';
import './AddEvaluationModal.css'

export default function Evaluations(props) {
    const studentId = props.match.params.studentId
    const [evaluations, setEvaluations] = useState([]);
    const {isShowing, toggle} = ShowModal();
    useEffect(() => {
      const service = new StudentService();
      service
        .getStudentDetails(studentId)
        .then((resp) => {
            console.log('what is in evalres',resp)
           if(resp.student.evaluations) {
            setEvaluations(resp.student.evaluations); 
           }
        })
        .catch((e) => console.log(e));
    }, [studentId]);
    return (
      <>
      <div>In evaluation</div>
        {props.isLoggedIn ? (
          <div className="main-container">
            <Navigation {...props}/>
            <div className="work-container">
              <div className="work-space">
                <button onClick={toggle}>Add Evaluation</button>
                <AddEvaluationModal studentId={studentId} evaluations={evaluations} setEvaluations={setEvaluations} isShowing={isShowing} hide={toggle} />
                {evaluations &&
                    evaluations.map((evaluation, index) => {
                    return (
                      <div key={index}>
                        <div>
                          {' '}
                          Students Progress Report:{' '}
                        </div>
                        <div> Evaluated Date: {evaluation.evalDate}</div>
                        <div> Remarks: {evaluation.remarks}</div>
                        <div> Last Color Code : {evaluation.clrCode}</div>
                       
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
  