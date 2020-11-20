import React from 'react';



const Advice = (props) => {

    return (<div className='advice'>
        <p> {props.note}</p>
        <p> {props.comment}</p>
    </div>
    )
}

export default Advice