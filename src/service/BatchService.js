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
      // To get how many students are red , green and yellow in class in percentages value
      getEvaluationChartDetails = (batchId) => {
        return this.service.get(`/batch/${batchId}/percentage`)
               .then(response => response.data)
      }

      // To pick radnom student in class to ask question based on algorithm.
      getRandomStudent = (batchId) => {
        return this.service.get(`/batch/${batchId}/random`)
               .then(response => response.data)
      }
       // To delete paricular batch
       deleteBatch = (batchId) => {
        return this.service.delete(`/batch/${batchId}`)
               .then(response => response.data)
      }
  }
  
  export default BatchService