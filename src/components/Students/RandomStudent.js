import React, {useState, useEffect} from 'react';
import BatchService from '../../service/BatchService';

export default function RandomStudent(props) {

  const [randomStudent, setRandomStudent] = useState([]);
  useEffect(() => {
    const service = new BatchService();
      service
      .getRandomStudent(props.batchId)
      .then((resp) => {
        if (resp) {
          setRandomStudent(resp.randomStudent)
        }
      })
      .catch((e) => console.log(e));
  }, [props]);
  console.log('checking random student', randomStudent);
  const handleClose = () => {
    props.setAskQuestions(false)
  }
  return (
    <>
      <div className="">
         <img src="/delete-image.png" alt="close" onClick={handleClose}></img>
         <div>{randomStudent.name}</div>
         <div>{randomStudent.lstClrCode}</div>
         <img src={randomStudent.imgUrl } alt="students"></img>
      </div>      
    </>
  );
}
