import './App.css';
import {useEffect, useRef, useState} from "react";
import {drawTiles, generate} from "./logic";
import {Tiles} from "./consts";
import Vertical13 from "./Vertical13";
import Lined13 from "./Lined13";
import Answer9 from "./Answer9";

const dftArray = ()=>Array(9).fill(0)
const colorList = ["m","p","s"]
const App = ()=>{
    const [tiles,setTiles] = useState(()=>generate());
    const [draw,setDraw] = useState([]);
    const [selected, setSelected] = useState(dftArray())
    const [fontSize, setFontSize] = useState(parseFloat(window.localStorage.getItem("fontSize"))??1)
    const [chooseColorIndex,setChooseColorIndex] = useState(0)
    const [vertical,setVertical] = useState(false)
    const [answerMode,setAnswerMode] = useState(false)
    const [showAnswer,setShowAnswer] = useState(false)
    const theButton = useRef()
    const [color,setColor] = useState(()=>{
        try{
            const data =  JSON.parse(window.localStorage.getItem("enableColor"))
            if (data) return data
            throw Error()
        }catch (e) {
            window.localStorage.setItem("enableColor",JSON.stringify([1,1,1]))
        }
        return [1,1,1]
    })
    const [minDraw,setMinDraw] = useState(0)

    useEffect(()=>{
        const listener=(e)=>{
            if (e.repeat)return
            const last = e.code[e.code.length-1]
            if((e.code.startsWith("Numpad")||e.code.startsWith("Digit"))&&"123456789".includes(last)){
                // setSelected(Array(9).fill(1))
                setSelected(a=>{
                    const newA = [...a]
                    newA[parseInt(last)-1]=!newA[parseInt(last)-1]
                    return newA
                })
                return true
            }
            if (e.code.endsWith("Enter")){
                theButton.current?.click()
                return true

            }
        }
        document.addEventListener("keypress", listener , false)
        return ()=>{
            document.removeEventListener("keypress", listener )
        }
    },[setSelected])

    const generateNew= ()=>{
        setShowAnswer(false)
        setSelected(dftArray())
        while (true){
            const candidate = generate()
            const solution = drawTiles(candidate)
            if (solution.length>=minDraw){
                const enabledIndex = color.map((enabled,index)=>enabled?index:null).filter(item=>item!==null)
                setChooseColorIndex(enabledIndex[Math.floor(Math.random()*enabledIndex.length)])
                setTiles(candidate)
                const result = dftArray()
                solution.forEach(item=>result[item]+=1)
                setDraw(result)
                return
            }
        }
    }

    useEffect(()=>{generateNew()},[color,minDraw])

    const updateColor = (update)=>{
        window.localStorage.setItem("enableColor",JSON.stringify(update))
        setColor([...update])
    }

    const usedColor = colorList[chooseColorIndex]

    return <div style={{width:"100%"}}>
        <div style={{margin:"0 16px"}}>
            <div style={{width:"100%", display:"grid", gridTemplateColumns:"1fr auto"}}>

                <div style={{textAlign:"center",display:"flex", gap:"16px"}} >
                    <div>
                        <div>Font Size</div>
                        <input type="range" value={fontSize} min={1} max={10} step={0.01} onChange={
                            (e)=>{
                                window.localStorage.setItem("fontSize", e.target.value)
                                setFontSize(e.target.value)
                            }
                        }/>
                    </div>
                    <div>
                        {colorList.map((item,index)=>
                            <div key={index} style={{display:"inline-block"}}>
                                <div>{item}</div>
                                <div><input
                                    disabled={color?.[index]&&color.filter(item=>item).length===1}
                                    type="checkbox"
                                    checked={color?.[index]??false}
                                    onChange={(e)=>{
                                        color[index]=e.target.checked
                                        updateColor([...color])
                                    }}/></div>
                            </div>
                        )}
                    </div>
                    <div>
                        <div>Min Draw</div>
                        <div>
                            <input type="number" value={minDraw} min={0} max={9} onChange={(e)=>setMinDraw(parseInt(e.target.value))}/>
                        </div>
                    </div>
                    <div>
                        <div>Vertical</div>
                        <div>
                            <input type="checkbox" checked={vertical}  onChange={(e)=>setVertical(e.target.checked)}/>
                        </div>
                    </div>
                    <div>
                        <div>AnswerMode</div>
                        <div>
                            <input type="checkbox" checked={answerMode}  onChange={(e)=>{
                                setAnswerMode(e.target.checked)
                                setSelected(dftArray())
                            }}/>
                        </div>
                    </div>

                </div>
                <div>
                    <span style={{fontSize:"2rem",fontFamily:"sans-serif"}}>这能听个啥</span>
                </div>
            </div>

        </div>
        <div style={{textAlign:"center"}}>
            <div style={{fontSize:`${fontSize}rem`}}>
                <div>
                    {vertical?<Vertical13 data={tiles} tileSet={Tiles[colorList[chooseColorIndex]]} />:
                        <Lined13 data={tiles} tileSet={Tiles[colorList[chooseColorIndex]]} />}
                </div>
                <div style={{border:"3px gray dashed"}}>
                    <Answer9 tileSet={Tiles[colorList[chooseColorIndex]]} enabled={true} answer={((answerMode&&showAnswer)||!answerMode)?draw:Array(9).fill(1)} selected={answerMode?selected:dftArray()} onClick={(index)=>{
                        selected[index]=!selected[index]
                        setSelected([...selected])}} />
                </div>
                <div>

                    <button
                        ref={theButton}
                        style={{fontSize:`${fontSize/2.5}rem`}}
                        onClick={!answerMode||(answerMode&&showAnswer)?generateNew:()=>setShowAnswer(true)}>
                        {!answerMode||(answerMode&&showAnswer)?<span>redo</span>:<span>check answer</span>}
                    </button>
                </div>

            </div>
        </div>
    </div>

}
export default App;
