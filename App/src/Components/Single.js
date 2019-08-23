import React from 'react';

const Single = (props) => {
    return (
        <div>
            <h3>{props.notes.title}</h3>
            <div>{props.notes.details}</div>
        </div>
    );
}

export default Single;