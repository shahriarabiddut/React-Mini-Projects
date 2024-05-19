import { useState } from "react";
import data from "./data";


export default function Accordion(){
    let i = 1;
    const [selected ,setSelected] = useState(null);
    const [enableMultiSelection ,setEnableMultiSelection] = useState(false);
    const [multiple ,setMultiple] = useState([]);
    function handleSingleSelection(getCurrentId){
        setSelected(getCurrentId === selected?null:getCurrentId);
    }
    function handleMultiSelection(getCurrentId){
        let cpyMultiple = [...multiple];
        const findIndexOfCurrentId = cpyMultiple.indexOf(getCurrentId);
        if(findIndexOfCurrentId === -1) cpyMultiple.push(getCurrentId);
        else cpyMultiple.splice(findIndexOfCurrentId,1);
        setMultiple(cpyMultiple);
    }
    return [
        <div className="wrapper">
            <button onClick={()=> setEnableMultiSelection(!enableMultiSelection)}>Multi Selection</button>
            <div className="accordion">
                {
                    data && data.length>0?
                    data.map((dataItem)=>
                        (<div className="item">
                            <div onClick={ enableMultiSelection?()=>handleMultiSelection(dataItem.id):()=>handleSingleSelection(dataItem.id)} className="title">
                                <h3>{i++}.{dataItem.question} <span>+</span> </h3> 
                            </div>
                            {
                                enableMultiSelection?multiple.indexOf(dataItem.id) !== -1 && ( <div className="content">{dataItem.answer}</div>)
                                : selected === dataItem.id && ( <div className="content">{dataItem.answer}</div>)
                                
                            }
                        </div>))
                    : <div> No Data Found</div>
                }
            </div>
        </div>
    ];
}