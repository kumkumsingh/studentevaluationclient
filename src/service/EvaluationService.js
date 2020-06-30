
import axios from 'axios'
class EvaluatonService {
    // Create a new instance of axios and send cookies by using withCredentials true  
    constructor() {
    //  this.service will bind the service to the class
      this.service = axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        withCredentials: true
      })
    }
    addEvaluation = (evalDate, clrCode , remarks , studentId) => {
      return this.service.post(`/evaluation`, {evalDate, clrCode, remarks  , studentId})
             .then(response => response.data)
    }
  }
  
  export default EvaluatonService
