import React,{useEffect,useState} from 'react';
import css from './userpage.module.css';
//import { useNavigate } from 'react-router-dom';

const Userpage = ({...loginuser})=>{
//const navigate = useNavigate();
const correct = <i className="fa-solid fa-check"></i>;
const wrong = <i className="fa-solid fa-xmark"></i>;
//const [flag,setflag] = useState(false);

const [savedUser,setsavedUser] = useState(loginuser);
const [data,setdata] = useState(savedUser);


useEffect(() => {
if(savedUser == null ){
        localStorage.setItem('loggedUser',JSON.stringify(loginuser))
        //setflag(true)
        setsavedUser(JSON.parse(localStorage.getItem("loggedUser")));
        setdata(savedUser)
        
    }

    
    
        
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    //console.log(data)

    return<>
                <center>

<div className={css.maincontainer}>
<div className={css.container}>


<h3>{"Family-ID: "+data._id}</h3>

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
            data.family.map((item,i)=>{
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
                <tfoot>
        
                </tfoot>
            </table>
            
    </div>
</div>

    </center>
    </>
}

export default Userpage;