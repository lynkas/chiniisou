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
    const finalTiles = []
    for (let i = 0; i < mountain.length; i++) {
        if (mountain[i]===4){
            continue
        }
        const testCase = [...mountain]
        testCase[i]+=1
        {
            const [ok, fTiles] =niconico(testCase)
            if (ok){
                canDraw.push(i)
                finalTiles.push(fTiles)
                continue
            }

        }
        {
            const [ok, fTiles] =win(testCase)
            if (ok) {
                canDraw.push(i)
                finalTiles.push(fTiles)
                continue
            }
        }
    }
    return [canDraw,finalTiles]
}


const win = (mountain, at=0, tiles=[]) => {
    if (at>=9)return pair(mountain,tiles)
    const count = mountain[at]
    if (count===0) return win(mountain,at+1,tiles)

    {
        const [tri, triTiles] = triplet(mountain, at, tiles)
        if (tri){
            return win(tri,at,triTiles)
        }
    }
    {
        const [seq, seqTiles] = sequence(mountain,at,tiles)
        if (seq){
            return win(seq,at,seqTiles)
        }
    }
    return win(mountain,at+1, tiles)
}

const niconico = (mountain)=>{
    return [mountain.filter(item=>item===2).length===7,mountain.map((count,index)=>{
        if (count===0)return []
        return [index,index]
    }).filter(item=>item.length!==0)]

}

const triplet = (mountain, at, tiles=[]) => {
    if (mountain[at]<3){return [false,tiles]}
    const result = [...mountain]
    result[at]-=3
    return [result,[...tiles, [at,at,at]]]
}

const sequence = (mountain, at, tiles=[])=>{
    if (at>6) return [false,tiles]
    if (mountain[at]*mountain[at+1]*mountain[at+2]===0){
        return [false, tiles]
    }
    const result = [...mountain]
    result[at]-=1
    result[at+1]-=1
    result[at+2]-=1
    return [result, [...tiles, [at,at+1,at+2]]]
}

const pair = (mountain, tiles)=>{
    if (mountain.filter(item=>item===2).length===1 && mountain.filter(item=>item===0).length===8){
        const id = mountain.indexOf(2)
        return [true,[...tiles,[id,id]]]
    }
    return [false,tiles]
}
