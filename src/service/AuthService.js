import axios from 'axios'

class AuthService {
  // Create a new instance of axios and send cookies by using withCredentials true  
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    })
  }

  signup = (name, email, password) => {
    return this.service.post('/auth/signup', {userName: name, email, password})
           .then(response => response.data)
  }

  login = (userName, password) => {
    return this.service.post('/auth/login', {userName, password})
           .then(response => response.data)
  }

  isAuthenticated = () => {
    return this.service.get('/auth/isLoggedIn')
    .then(response => response.data)
  }

  logout = () => {
      return this.service.get('/auth/logout')
      .then(response => response.data)
  }
}

export default AuthService