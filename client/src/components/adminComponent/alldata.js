import React,{useState,useEffect} from 'react';
import css from './alldata.module.css';
import { useNavigate } from 'react-router-dom';





const Alldata = ({setfamily})=>{
    const nav = useNavigate();
   // const [user, setuser] = useState();
    const [data, setdata] = useState([]);
    const [Search,setSearch] = useState('');
    //console.log(Search);
    const correct = <i className="fa-solid fa-check"></i>;
const wrong = <i className="fa-solid fa-xmark"></i>;
    useEffect(()=>{
        fetch(process.env.REACT_APP_LOCAL+'/alldata').then(
            res=>res.json()
        ).then(json=>{
            setdata(json);
            //console.log(json)
            })
        },[])

let dataFilter = data.filter(item=>{

            return Object.keys(item).some((key) => [key].toString().toLowerCase().includes(Search.toString().toLowerCase()))

         });




    return<>
        <center>


    <div className={css.container}>
            <input type="text" className={css.input} placeholder="Search: Family-ID" onChange={(e)=>setSearch(e.target.value)}/>
            {
            dataFilter.map((item,i)=>{
                return<>

                    <h3 key={item._id+2}>{item._id === '6310bfe0de05c81980070a3a'?"":'Family ID: '+ item._id}</h3>
                    {item._id === '6310bfe0de05c81980070a3a'?<></>:  <><table key={item.Id+1} className={css.table} onClick={()=>{setfamily(item);
                            nav('/admin/familypage')}}>  
        <thead>
            <tr key={item._id}>
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
                        item.family.map((item,i)=>{
                            //console.log(item.name)
                            return<>
                             
            <tr key={item.sssmid}>
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
                </>}
                  
                </>
   
            })
            }

        </div>
        </center>
    </>
}
export default Alldata;