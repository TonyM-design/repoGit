import React from 'react';



const Advices = (note, comment) => {
    console.log(note);
    console.log(comment);
    return (<div className='advice'>
        <h1> {note}</h1>
        <h1> {comment}</h1>

    </div>
    )

}

export default Advices;