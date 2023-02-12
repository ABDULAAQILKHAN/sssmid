import React,{useState,useEffect} from "react";
import Login from './components/loginComponent/login.js';
//import Form from './components/adminComponent/form.js';
//import Alldata from './components/adminComponent/alldata.js';
import Admin from './components/adminComponent/admin.js';
import Userpage from './components/user/userpage.js';
//import Insigts from './components/adminComponent/insigths.js';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
function App() {
  const [loginuser, setLoginUser] = useState({});





  useEffect(()=>{
   
console.log("admins"+loginuser)
  },[loginuser])
  return (
  
<>
<BrowserRouter >

<Routes>
 <Route exact path="/" element={<Login setLoginUser={setLoginUser}/>}></Route>

  <Route exact path="/userpage" element={<Userpage {...loginuser}/>}></Route>

<Route exact path="/login" element={<Login setLoginUser={setLoginUser}/>}></Route>

<Route exact path="/admin/*" element={<Admin loginuser/>}></Route>


</Routes>





</BrowserRouter>


</>
    

  );
}

export default App;
