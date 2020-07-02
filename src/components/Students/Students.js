import React, {useState, useEffect} from 'react';
import ShowModal from '../../ShowModal';
import Navigation from '../Authorization/Navigation';
import {Redirect, Link} from 'react-router-dom';
import BatchService from '../../service/BatchService';
import AddStudentModal from '../Students/AddStudentModal';
import ProgressBarChart from '../Students/ProgressBarChart'
import '../Index.css';
import './Student.css'

export default function Students(props) {
  const batchId = props.match.params.batchId
  const [students, setStudents] = useState([]);
  const {isShowing, toggle} = ShowModal();
  useEffect(() => {
    const service = new BatchService();
    service
      .getBatchDetails(batchId)
      .then((resp) => {
         if(resp.batch.students) {
            setStudents(resp.batch.students); 
         }
      })
      .catch((e) => console.log(e));
  }, [batchId]);
  return (
    <>
      {props.isLoggedIn ? (
        <div className="main-container">
          <Navigation {...props}/>
          <div className="work-container">
            <div className="work-space">
              {students && <div>{students.name}</div>}
              <button onClick={toggle}>Add Student</button>
              <AddStudentModal batchId={batchId} students={students} setStudents={setStudents} isShowing={isShowing} hide={toggle} />
              <Link  to={`/batch/${batchId}/progress`}>Show Progress Bar</Link> 
                <button>Ask Questions</button>
              {students &&
                students.map((student, index) => {
                  return (
                    <div key={index}>
                      <div>
                        {' '}
                        Student Name :{' '}
                        <Link to={`/student/${student._id}/evaluations`}>{student.name}</Link>{' '}
                      </div>
                      <div> Last Color Code : {student.lstClrCode}</div>
                      <div> Image : <img src={student.imgUrl} alt='N\A'></img> </div>
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
