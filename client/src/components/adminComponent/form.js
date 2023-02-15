import axios from "axios";
import React,{useState} from "react";
import css from './form.module.css';
import Alert from '../loginComponent/alert/alert.js';
const Login = (prop)=>{
const [number,setnumber] = useState(1);
const [finalFlag, setfinalFlag] = useState(false);
const [input,setinput]=useState({
    name: '',
    relation: '',
    age: 0,
    gender: 'male',
    sssmid: '',
    adhaar: false,
    pan: false
    
});
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
const [member,setmember] = useState([])
const handleChange = (e)=>{
        setinput({...input,[e.target.name]: e.target.value});
}
const handleCheck = (e)=>{
    // eslint-disable-next-line
    if(!e.target.value==''){
        
        setinput({...input,[e.target.name]:true})
    }
}
const handleSave = ()=>{
    if(input.name === '' || input.relation === '' || input.age===0 || input.sssmid===''){
        setfinalFlag(false);
        setalert({
            display:'block',
            msg: 'Fill all fields',
            color: 'red'
        })
        settimeout();
       // alert("Cannot save blank values")
    }else{
        setfinalFlag(true);
        setmember([...member,input]);
        setinput({
            name: '',
            relation: '',
            age: 0,
            gender: 'male',
            sssmid: '',
            adhaar: false,
            pan: false
        });
        setalert({
            display:'block',
            msg:'Member Saved',
            color: 'green'
        });
        settimeout();
    }
console.log(input);
}
const finalSubmit = ()=>{
    console.log("input",input);
    console.log("member",member);
    let data = {
        member: member,
        id: prop.id
    }
    if(finalFlag){
        axios.post(process.env.REACT_APP_ONLINE+prop.port,data).then(res=>{
                setalert({msg:res.data.msg,color:'green',display:'block'});settimeout();
            
        })

    }else{
        setalert({
            display:'block',
            msg: "Check form again",
            color: 'red'
        })
        settimeout();
    }
}
let array = new Array(number).fill(number);

    return<>
 <Alert color={alert.color} display={alert.display} title={alert.msg}/>
            <center>
                {array.map((item,i)=>{
                    
                    return<>
            <div className={css.container}>
                    <h3>{"Form "+i}</h3>
                <input type="text" className={css.input} placeholder="Name" name="name" onChange={handleChange} />
                <br />
                <br />
                <br />
                <input type="text" name="relation" className={css.input} placeholder="Relation" onChange={handleChange} />
                <br />
                <br />
                <br />
                <input type="number" name="age" className={css.input} placeholder="Age" onChange={handleChange} />
                <br />
                <br />
                <br />
                
                <select className={css.Selectinput} name="gender" onChange={handleChange}>
                    <option selected>Gender</option>
                    <option value="male" >Male</option>
                    <option value="female" >Female</option>
                    <option value="other" >Other</option>
                </select>
                <br />
                <br />
                <br />
                <input type="text" name="sssmid" className={css.input} placeholder="SSSM-ID" onChange={handleChange} />
                <br />
                <br />
                <br />
                <table className={css.table}>
                    <thead>

                    </thead>
                    <tbody>
                    <tr>
                        <td>
                <label htmlFor="">Adhaar status</label>

                        </td>
                        <td>

                <input type="checkbox" name="adhaar" value="adhaar" className={css.checkbox} onChange={handleCheck} />
                        </td>
                    </tr>
                    <tr>
                        <td>

                <label htmlFor="">Pan status</label>
                        </td>
                        <td>

                <input type="checkbox" name="pan" value="pan" className={css.checkbox} onChange={handleCheck} />
                        </td>
                    </tr>
                    </tbody>
                    <tfoot>

                    </tfoot>
                </table>
                <br />
                <br />
                <button type="submit" className={css.button}
                onClick={()=>{
                    console.log(member[i].name);
                }}>Clear Form</button>
                <button type="submit" className={css.button}
                onClick={handleSave}>Save Member</button>
            </div>
                    
                    </>
                })}
                                <br />
                                
            <button className={css.button} onClick={()=>{setnumber(number+1)}}>Form +1</button>
            <button className={css.button} onClick={()=>{setnumber(number-1)}}>Form -1</button><br />
            <button className={css.button} onClick={finalSubmit}>Final Submit</button>
            </center>
    </>
}
export default Login;