import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import StudentService from '../../service/StudentService';
import UploadService from '../../service/UploadService';
import ReactDOM from 'react-dom';

export default function AddStudentModal(props) {
  const [imgUrl, setImgUrl] = useState('');
  const {register, handleSubmit, errors} = useForm();
  const batchId = props.batchId;
  const onSubmit = (data) => {
    const service = new StudentService();
    service
      .addStudent(data.name, imgUrl, batchId)
      .then((resp) => {
        const newStudents = [...props.students, resp.student];
        props.hide();
        props.setStudents(newStudents);
      })
      .catch((e) => console.log(e));
  };
  const handleImageChange = (e) => {
    const data = new FormData();
    const uploadService = new UploadService();
    data.append('profilePicture', e.target.files[0]);
    uploadService
      .uploadFile(data)
      // profile picture is uploaded into s3 and s3 location is sent as the response
      .then((resp) => setImgUrl(resp.profilePicture))
      .catch((err) => console.log('Error', err));
  };
  return (
    <div>
      {props.isShowing &&
        ReactDOM.createPortal(
          <React.Fragment>
            <div className="show-popup-wrapper">
              <div className="show-popup-container">
                <img
                  src="/delete-image.png"
                  className="top-corner"
                  alt="vector delete"
                  onClick={props.hide}
                ></img>
                <form
                  className="form-container"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <input
                    className="input"
                    type="text"
                    placeholder="Student Name"
                    name="name"
                    ref={register({
                      required: 'STUDENT NAME REQUIRED',
                    })}
                  ></input>
                  <input
                    className="input"
                    type="file"
                    name="imgUrl"
                    onChange={(e) => handleImageChange(e)}
                    ref={register({
                      required: 'IMAGE REQUIRED',
                    })}
                  ></input>
                  {errors.name && <p>{errors.name.message}</p>}
                  {errors.imgUrl && <p>{errors.imgUrl.message}</p>}
                  <input
                    className="input submit-bt"
                    type="submit"
                    value="Add Student"
                  ></input>
                </form>
              </div>
            </div>
          </React.Fragment>,
          document.body
        )}
    </div>
  );
}
