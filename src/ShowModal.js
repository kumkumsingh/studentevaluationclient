import { useState } from 'react'

 const ShowModal = () =>{
     const[isShowing , setIsShowing] = useState(false);
     function toggle(){
        setIsShowing(!isShowing)
     }
    return {
    isShowing, 
    toggle
    }
    
}
export default ShowModal