import axios from 'axios'

class UploadService {
  // Create a new instance of axios and send cookies by using withCredentials true  
  constructor() {
  //  this.service will bind the service to the class
    this.service = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    })
  }

  //this is to upload into s3
  uploadFile = (profilePicture) => {
    return this.service.post('/upload/profilepicture', profilePicture)
    .then(response => response.data)
  }
}

export default UploadService