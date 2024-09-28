
import React, { useEffect, useState } from "react";

const TypingEffect = ({text,speed})=>{
    const[displayText,setDisplayText] = useState('');

    useEffect(()=>{
        let index = 0;
        const interval = setInterval(()=>{
            if(index<text.length){
                setDisplayText((prev)=>prev+ text.charAt(index++));

            }
            else{
                clearInterval(interval)
            }
        },speed)
    },[text,speed]);

    return (
        
        <div className="text-xl font-semibold">
        {displayText}
          <span className="blinking-cursor"></span>
          </div>
      
    )

}
export default TypingEffect;