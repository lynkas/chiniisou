import {Tiles} from "./consts";

export default ({data, tileSet})=>{
    const render=(tiles)=>{
        return tiles.map((count,index)=>tileSet[index].repeat(count))
    }
    return <div>
        {render(data)}
    </div>
}
