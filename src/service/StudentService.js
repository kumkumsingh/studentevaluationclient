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
    
    addStudent = (batchName, stDate, endDate) => {
      return this.service.post('/batch', {batchName, stDate, endDate})
             .then(response => response.data)
    }

  }
  
  export default StudentService