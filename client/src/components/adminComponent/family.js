import { React,useState,useEffect } from "react";
import css from './family.module.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "./form.js";
import Alert from '../loginComponent/alert/alert.js';

const Family = ({...family} )=>{
    const nav = useNavigate();
    //const [sssmid, setsssmid] = useState()
    const correct = <i className="fa-solid fa-check"></i>;
    const wrong = <i className="fa-solid fa-xmark"></i>;
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
    const [member,setmember] = useState({
        name: '',
        relation: '',
        age: 0,
        gender: '',
        sssmid: '',
        adhaar: false,
        pan: false
    
    })
    const [flag, setflag] = useState(false);
    const [id,setid] = useState();
    //const [predata, setpredata] = useState();
useEffect(()=>{
    if(!family){
        nav('/admin')
    }
    else{
        setid(family._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
},[])

const handleChange = e=>{
    setmember({...member,[e.target.name]: e.target.value});
}
const handleCheck = e =>{
    // eslint-disable-next-line
    if(!e.target.value==''){
        setmember({...member,[e.target.name]:true})
    }
}

    return<>
    <Alert color={alert.color} display={alert.display} title={alert.msg}/>
        <div className={css.maincontainer}>

    
        <div className={css.display}>
            <h3>{"Family-Id:"+family._id}</h3>
            
            <table className={css.table}>
                <thead>
                    <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Relation</th>
                <th>Gender</th>
                <th>SSSM-Id</th>
                <th>Adhaar status</th>
                <th>Pan status</th>
                    </tr>
                </thead>
                <tbody>
                {
              
                 family.family.map((item)=>{
                         //console.log(item.name)
                         return<>
                          
         <tr>
            
             <td>{item.name}</td>
             <td>{item.age}</td>
             <td>{item.relation}</td>
             <td>{item.gender}</td>
             <td>{item.sssmid}</td>
             <td>{item.adhaar?correct:wrong}</td>
             <td>{item.pan?correct:wrong}</td>
         </tr>
                         </>
                     })
                 
                    }
                </tbody>

            </table>
        </div>
        <div className={css.edit}>
            <h3>Click the Name below to Edit</h3>
        <table className={css.table}>
                <thead>
                    <tr>
                    <th>Name</th>
                <th>Age</th>
                <th>Relation</th>
                <th>Gender</th>
                <th>SSSM-Id</th>
                <th>Adhaar status</th>
                <th>Pan status</th>
                <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
              
                 family.family.map((item)=>{
                         //console.log(item.name)
                         return<>
                          
         <tr>
             <td><input onChange={handleChange} className={css.inputs} type="text" placeholder={item.name} name="name" /></td>
             <td><input onChange={handleChange} className={css.inputs} type="text" placeholder={item.age} name="age" /></td>
             <td><input onChange={handleChange} className={css.inputs} type="text" placeholder={item.relation} name="relation"/></td>
             <td>             
                <select className={css.Selectinput} name="gender" onChange={handleChange} placeholder={item.gender}defaultValue="male">
                    <option value="male" >Male</option>
                    <option value="female" >Female</option>
                    <option value="other" >Other</option>
                </select></td>
             <td><input onChange={handleChange} className={css.inputs} type="text" placeholder={item.sssmid} name="sssmid"/></td>
             <td><input onChange={handleCheck}  className={css.inputs}value="adhaar" type="checkbox" name="adhaar"/></td>
             <td><input onChange={handleCheck}  className={css.inputs}value="pan" type="checkbox"  name="pan"/></td>
             <td>
                <button className={css.updatebtn} onClick={()=>{
    //console.log(member);    
    //setid(family._id);

    //console.log(member.adhaar,member.pan);

    //console.log(id)
    //console.log(member)
    //console.log(predata)
    const updatedata = {
        id: id,
        member: member,
        item: item
    }
   /// console.log(updatedata);
   axios.post('/updatemember',updatedata).then((res)=>{
        //alert(res.data.msg);
        //resetting all member values
        if (res.data.flag) {
            setalert({
                msg: res.data.msg,
                display: 'block',
                color: 'green'
            });
            settimeout();
            setmember({
                name: '',
                relation: '',
                age: 0,
                gender: '',
                sssmid: '',
                adhaar: false,
                pan: false
            });
        }
    })

                }}>Update</button>

                <button className={css.deletemembtn} onClick={()=>{
                 //setsssmid(item.sssmid);
                 //const sssmid = item.sssmid;  
                 //console.log(id,item.sssmid)
                 //const sssmid = item.sssmid;
                 const data = {
                    sssmid : item.sssmid,
                    id : id
                 }
                 console.log(id);
                 axios.post('/deletemember',data).then(res=>{
                        setalert({msg:res.data.msg,color: 'red',display: 'block'});
                        settimeout();
                    })
                    //console.log(id,sssmid)
                }}>Delete Member</button>
             </td>
         </tr>
                         </>
                     })
                 
                    }
                </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={8}>
                                <button className={css.deletefambtn}onClick={()=>{
                                    let flag = window.confirm('Are you sure you want to delete the family');
                                    if (flag) {
                                        axios.put("/deletefamily",family).then(res=>{setalert({msg:res.data.msg,display:'block',color:'red'})
                                        settimeout();
                                        nav('/admin')
                                    })
                                        
                                    }
                                }}>Delete Family</button>
                            </td>
                        </tr>
                    </tfoot>
            </table>

        </div>
        <br />
        {flag? <><button onClick={()=>{setflag(false)}}>Remove Form</button><br /><Form port="/familypage" id={id}/></>: <button className={css.btn} onClick={()=>{setflag(true)}}>Add Member</button>}
        </div>
    </>
}
export default Family;
