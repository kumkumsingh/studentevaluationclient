import axios from 'axios'

class UserService {
  // Create a new instance of axios and send cookies by using withCredentials true  
  constructor() {
  //  this.service will bind the service to the class
    this.service = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    })
  }

  editProfile = (userName, firstName, lastName, email) => {
    return this.service.put('/users', {userName, firstName, lastName, email})
           .then(response => response.data)
  }
  //To store s3 location in the server 
  editProfilePicture = (profilePicture) => {
    return this.service.put ('/users/profilepicture', {profilePicture} )
     .then(response => response.data)
  }

  //this is to upload into s3
  uploadProfilePicture = (profilePicture) => {
    return this.service.post('/upload/profilepicture', profilePicture)
    .then(response => response.data)
  }
}

export default UserService