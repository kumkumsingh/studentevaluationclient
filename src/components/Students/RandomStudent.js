import React, {useState, useEffect} from 'react';
import BatchService from '../../service/BatchService';

export default function RandomStudent(props) {

  const [randomStudent, setRandomStudent] = useState([]);
  useEffect(() => {
    const service = new BatchService();
      service
      .getRandomStudent(props.batchId)
      .then((resp) => {
          console.log("resp.randomStudent", resp)
          setRandomStudent(resp.randomStudent)
      })
      .catch((e) => console.log(e));
  }, [props]);
  const handleClose = () => {
    props.setAskQuestions(false)
  }
  return (
    <>
      <div className="show-popup-container">
         <img src="/delete-image.png" alt="close" className="random-student-close" onClick={handleClose}></img>
         {randomStudent 
          ? 
          <div className="flex-column flex-center">
                 <h2>Randomly Choosen Student</h2>
                <div>Name: {randomStudent.name}</div>
                <div>Last Color Code: {randomStudent.lstClrCode}</div>
                <img src={randomStudent.imgUrl } className="random-student-image" alt="students"></img>
           </div>
         : <div>No Students in this Batch</div>
         }
      </div>      
    </>
  );
}
