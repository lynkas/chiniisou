export default ({data, tileSet, draw})=>{
    return <div>
        {data.map(tri=>{
            return <div style={{display:"inline-block", paddingRight:"1rem"}}>
                {tri.map(index=><span style={draw===index?{color:"deeppink"}:{}}>{tileSet[index]}</span>)}
            </div>
        })}
    </div>
}
