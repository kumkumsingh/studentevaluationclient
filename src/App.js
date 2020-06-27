import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import { Signup , Login , ErrorBoundary} from "./components/index"; 

export default function App() {
  return (
    <React.Fragment>
       <Suspense fallback={<h2>Loading...</h2>}>
         <ErrorBoundary>
            <Route path="/" exact component={(props) => <Signup {...props} />} />
            <Route path="/login" exact component={Login} />
         </ErrorBoundary>
      </Suspense>
    </React.Fragment>
  )
}

