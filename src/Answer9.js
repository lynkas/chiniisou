import {Tiles} from "./consts";

export default ({tileSet, enabled, selected, answer, onClick})=>{
    return <div>
        {tileSet.map((item,index)=>{
            return <div
                key={index}
                onClick={()=>enabled&&onClick?.(index)}
                style={{display:"inline-block", cursor:"pointer",userSelect:"none",...selected[index]?{borderBottom:"orange 4px solid"}:{borderBottom:"transparent 4px solid"}}}>
                    <div style={answer[index]?{}:{color:"lightgray", opacity:0.2}}>
                        {tileSet[index]}
                    </div>
                </div>
        })}
    </div>
}
