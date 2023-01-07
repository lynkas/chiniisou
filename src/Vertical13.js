export default ({data,tileSet})=>{

    return <div style={{display:"inline-block"}}>
        {data.map((count,index)=><div key={index} style={{display:"inline-block", flexDirection:"column"}}>
            {Array(4).fill(0).map((_, i) =>
                <div style={4-count > i ?  {color: "lightgray", opacity:0.2}:{} } key={"a" + i}>
                {tileSet[index]}
            </div>)}
        </div>)}
    </div>
}
