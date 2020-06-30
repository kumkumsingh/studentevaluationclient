import axios from 'axios'
class BatchService {
    // Create a new instance of axios and send cookies by using withCredentials true  
    constructor() {
    //  this.service will bind the service to the class
      this.service = axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        withCredentials: true
      })
    }
    
    addBatch = (batchName, stDate, endDate) => {
      return this.service.post('/batch', {batchName, stDate, endDate})
             .then(response => response.data)
    }

   // To get all the student details in a batch 
    getBatchDetails = (batchId) => {
      return this.service.get(`/batch/${batchId}`)
             .then(response => response.data)
    }
  }
  
  export default BatchService