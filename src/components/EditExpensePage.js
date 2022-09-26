import React from 'react';
import { useParams } from 'react-router-dom';

export default () => {
    const props = useParams();

    return (
        <div>
            Editing expense with id of {props.id}
        </div> 
    );
};