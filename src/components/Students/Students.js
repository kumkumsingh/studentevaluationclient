import React, {useState, useEffect} from 'react';
import ShowModal from '../../ShowModal';
import Navigation from '../Navigation/Navigation';
import {Redirect, Link} from 'react-router-dom';
import BatchService from '../../service/BatchService';
import StudentService from '../../service/StudentService';
import AddStudentModal from '../Students/AddStudentModal';
import EvaluationChart from './EvaluationChart';
import RandomStudent from './RandomStudent';
import './Student.css';

export default function Students(props) {
  const batchId = props.match.params.batchId;
  const [batchName, setBatchName] = useState('')
  const [students, setStudents] = useState([]);
  const {isShowing, toggle} = ShowModal();
  const [evaluationChart, setEvaluationChart] = useState(false);
  const [askQuestions , setAskQuestions] = useState(false);

  useEffect(() => {
    const service = new BatchService();
    service
      .getBatchDetails(batchId)
      .then((resp) => {
        if (resp.batch){
          setBatchName(resp.batch.batchName)
        }
        if (resp.batch.students) {
          setStudents(resp.batch.students);
        }
      })
      .catch((e) => console.log(e));
  }, [batchId]);

  const showEvaluationChart = (e) => {
    setEvaluationChart(true);
  };
  const showRandomStudent = (e) => {
    setAskQuestions(true);
  };
  const deleteStudent = (studentId) =>{
    const service = new StudentService();
    service
    .deleteStudent(studentId)
    .then((resp) => {
      setStudents(resp.batch.students)
    })
    .catch((e) => console.log(e));

  }
  return (
    <>
      {props.isLoggedIn ? (
        <div className="main-container">
          <Navigation {...props} />
          <div className="work-container">
            <div className="work-space">
              <div className="title border-line"><h1>Batch Name : {batchName}</h1></div>           
              {batchId && (
                  <div className="work-item">
                    <div className="flex-row">
                      <div className="flex-column">
                        <button className="button" onClick={toggle}>Add Student</button>
                        <button className="button" onClick={(e) => showEvaluationChart(e)}>
                          Show Evaluation Chart
                        </button>
                        <button className="button" onClick={showRandomStudent}>
                          Ask Questions
                        </button>
                      </div>
                      <div>
                        <AddStudentModal
                          batchId={batchId}
                          students={students}
                          setStudents={setStudents}
                          isShowing={isShowing}
                          hide={toggle}
                        />
                        {askQuestions ? <RandomStudent batchId={batchId} setAskQuestions={setAskQuestions}/> : null}
                        {evaluationChart ? (
                          <EvaluationChart batchId={batchId} setEvaluationChart={setEvaluationChart} />
                        ) : null}
                      </div>
                    </div>
                  </div>
                )} 
              <div className="work-item">
                {students && (
                    <div className="student-title">
                      <div className="student-item">
                        <h3>Student Name </h3>
                      </div>
                      <div className="student-item">
                        <h3>Last Color Code</h3>
                      </div>
                      <div className="student-item">
                        <h3>Image</h3>
                      </div>
                      <div className="student-item">
                        <h3>Remove Student</h3>
                      </div>                  
                    </div>
                )}
                {students &&
                  students.map((student, index) => {
                    return (
                      <div key={index}>
                        <div className="student-row">
                          <div className="student-item">
                            <Link
                              className="link"
                              to={`/student/${student._id}/evaluations`}
                            >
                              {student.name}
                            </Link>
                          </div>
                          <div className="student-item">
                            {student.lstClrCode}
                          </div>
                          <div className="student-item">
                            <img
                              className="student-image"
                              src={student.imgUrl}
                              alt="N\A"
                            ></img>
                          </div>
                          <div className="student-item align-center">
                            <img
                              className="delete-image"
                              src={'/delete.png'}
                              alt="delete user"
                              onClick={() => deleteStudent(student._id)}
                            ></img>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>              
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
