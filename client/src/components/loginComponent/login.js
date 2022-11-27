import React,{useState} from "react";
import css from './login.module.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Alert from "./alert/alert.js";
const Login = ({setLoginUser})=>{
const Navigate = useNavigate();
const [alert, setalert] = useState(
    {
        msg:'',
        display:'none',
        color:''
    }

);
const settimeout=()=>{
    setTimeout(()=> {
        setalert({
            display:'none',
            msg:'',
            color:''
        })
    },5000);
}
const [input,setinput]=useState({
    sssmid: '',
    password: ''
})
const handleChange = (e)=>{
        setinput({...input,[e.target.name]: e.target.value});
}
const handleLogin = ()=>{
    console.log(input);
    axios.post(process.env.REACT_APP_LOCAL+"/login",input).then(res=>{
        res.data.flag?setLoginUser(res.data.fam):setalert({msg:res.data.message,color:'red',display:'block'});settimeout();
        if(res.data.fam.family[0].sssmid === 'admin'){
            setLoginUser(true);
            Navigate('/admin');
        }
        else{
            Navigate('/userpage');
        }
    })

    
}

    return<>
 <Alert color={alert.color} display={alert.display} title={alert.msg}/>
            <center>
                <div className={css.maincontainer}>

            <div className={css.container}>

                <input type="text" className={css.input} placeholder="SSSM-ID" name="sssmid" onChange={handleChange} />
                <br />
                <br />
                <br />
                <input type="text" name="password" className={css.input} placeholder="SSSM-ID" onChange={handleChange} />
                <br />
                <br />                <br />
                <button type="submit" className={css.button}
                onClick={handleLogin}>Login</button>
            </div>
                </div>

            </center>
    </>
}
export default Login;