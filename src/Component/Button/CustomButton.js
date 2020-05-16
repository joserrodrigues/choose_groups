import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { } from './CustomButton.css'

const CustomButton = (props) => {

    let backgroundColor = '#ED145B';
    if(props.backgroundColor != null){
        backgroundColor = props.backgroundColor;
    }
    let color = '#000000';
    if(props.color != null){
        color = props.backgroundColor;
    }    

    let fontSize = '15px';
    if(props.fontSize != null){
        fontSize = props.fontSize;
    }        

    let iconMargin = '0px';
    let padding = '15px';
    if(props.text !== null && props.text !== ""){
        iconMargin = '8px';
        padding = '10px';
    }
    const styles = {
        cursor: 'pointer',
        paddingTop: '10px',        
        paddingBottom: '10px',        
        paddingLeft: padding,
        paddingRight: padding, 
        borderRadius: '.25rem', 
        display:'inline-block',
        backgroundColor: backgroundColor,
        color: color,
        textTransform: 'uppercase',
        fontSize: fontSize,
    }


    return (
        <div className='customButton' style={styles}
            onClick={props.onClick}>
            <FontAwesomeIcon icon={props.icon} style={{ marginRight: iconMargin}} />
            {props.text}
            {/* {renderIf(props.text !== "")(() => (
                <Button>{props.text}</Button>
            ))}  */}
        </div>
    )
}

export default CustomButton
