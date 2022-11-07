import React,{useState,useEffect} from 'react'
import Insigts from './insigths.js';
import Form from './form.js';
import Alldata from './alldata.js';
import Familypage from './family.js';
import { Routes,Route } from 'react-router-dom';
import css from './admin.module.css';
const Comp = ()=>{
    const [flag,setflag] = useState(false);
    //const nav = useNavigate()

    return<>
    <center>

        <Insigts/>
    </center>
        {flag? <><button className={css.btn} onClick={()=>{setflag(false)}}>Remove</button><br /><Form port='/newdata'/></>: <button className={css.btn} onClick={()=>{setflag(true)}}>Add</button>}

    </>
}

const Admin = (loginuser)=>{
   // const nav = useNavigate();
    const [family, setfamily] = useState({});
    const [adminuser,setadminuser] = useState(false)
    useEffect(()=>{
        console.log(loginuser)
        if (loginuser) {
            
            setadminuser(true);
        }
            // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    return<>
    <center>
    <Routes>
      

    <Route exact path="/*" element={adminuser?<><Comp/><Alldata setfamily={setfamily}/></>:<></>}></Route>
{/*
    <Route exact path="/" element={flag? <><button className={css.btn} onClick={()=>{setflag(false)}}>Remove</button><br /><Form/></>: <button className={css.btn} onClick={()=>{setflag(true)}}>Add</button>}></Route>


*/}
        

        <Route exact path='/familypage' element={<Familypage {...family}/>}></Route>
    </Routes>
        
        
        

    </center>
    </>
}
export default Admin;