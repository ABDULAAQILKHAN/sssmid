//import react from 'react';
import css from './alert.module.css';

const Alert = (prop)=>{
const style = {
    backgroundColor: prop.color,
    display: prop.display
}
    return<>
        <div className={css.alertContainer} style={style}>
            <h4 className={css.alertTitle}>{prop.title}</h4>
        </div>
    </>

}

export default Alert;