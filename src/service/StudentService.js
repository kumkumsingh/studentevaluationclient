import axios from 'axios'
class StudentService {
    // Create a new instance of axios and send cookies by using withCredentials true  
    constructor() {
    //  this.service will bind the service to the class
      this.service = axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        withCredentials: true
      })
    }
    addStudent = (name, imgUrl , batchId) => {
      return this.service.post(`/students`, {name, imgUrl, batchId })
             .then(response => response.data)
    }
   
    // to get all the evaluation details of a student
    getStudentDetails = (studentId) => {
      return this.service.get(`/students/${studentId}`)
      .then(response => response.data)     
    }
  }
  
  export default StudentService