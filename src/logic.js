export const generate = ()=>{
    const mountain = [0,0,0,0,0,0,0,0,0]
    let count=0
    while (count<13){
        const draw = Math.floor(Math.random()*9)
        if (mountain[draw]<4){
            mountain[draw]+=1
            count+=1
        }
    }
    return mountain
}

export const drawTiles = (mountain)=>{
    const canDraw = []
    for (let i = 0; i < mountain.length; i++) {
        if (mountain[i]===4){
            continue
        }
        const testCase = [...mountain]
        testCase[i]+=1
        if (niconico(testCase)||win(testCase)) {
            canDraw.push(i)
        }
    }
    return canDraw
}


const win = (mountain, at=0) => {
    if (at>=9)return pair(mountain)
    const count = mountain[at]
    if (count===0) return win(mountain,at+1)
    const tri = triplet(mountain,at)
    const seq = sequence(mountain,at)
    return (tri&&win(tri,at))||(seq&&win(seq,at))||win(mountain,at+1)
}

const niconico = (mountain)=>{
    return mountain.filter(item=>item===2).length===7
}

const triplet = (mountain, at) => {
    if (mountain[at]<3){return false}
    const result = [...mountain]
    result[at]-=3
    return result
}

const sequence = (mountain, at)=>{
    if (at>6) return false
    if (mountain[at]*mountain[at+1]*mountain[at+2]===0){
        return false
    }
    const result = [...mountain]
    result[at]-=1
    result[at+1]-=1
    result[at+2]-=1
    return result
}

const pair = (mountain)=>{
    return mountain.filter(item=>item===2).length===1 && mountain.filter(item=>item===0).length===8
}
