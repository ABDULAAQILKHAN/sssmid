import React,{useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import css from './insigts.module.css';
const Insigts = ()=>{
    const Nav = useNavigate();
    const [data, setdata] = useState();
    const [male,setmale] = useState();
    const [female,setfemale] = useState();
    const [other,setother] = useState();
    useEffect(()=>{
        fetch(process.env.REACT_APP_ONLINE+'/insigts').then(
            res=>res.json()
        ).then(json=>{
            setdata(json);
            setmale(json.male);
            setfemale(json.female)
            setother(json.other);
            setdata(json.userr.length)
            })

        },[])
    return<>
    <center>

        <h3>Admin </h3>
    <button onClick={() => Nav("/login")}>
        Logout
    </button>
    <div className={css.container}>
        
            <div className={css.male}>
                <p>{male}</p>
                <p className={css.title}>Male</p>
            </div>
            <div className={css.female}>
                <p>{female}</p>
                <p className={css.title}>Female</p>
            </div>
            <div className={css.other}>
                <p>{other}</p>
                <p className={css.title}>Other</p>
            </div>
            <div className={css.data}>
                <p>{data}</p>
                <p className={css.title}>Total</p>
            </div>
           
    </div>
    </center>
    </>
}

export default Insigts;