var canvas = document.querySelector("canvas")
var ctx = canvas.getContext("2d")


var atmosArray=[[0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,100,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0]]


var atmosArrayAdv=[[{},{},{},{},{},{},{},{},{},{}],
                   [{},{},{},{},{},{},{},{},{},{}],
                   [{},{},{},{},{},{},{},{},{},{}],
                   [{},{},{},{},{},{},{},{},{},{}],
                   [{},{},{},{},{},{},{},{},{},{}],
                   [{},{},{},{},{},{},{},{},{},{}],
                   [{},{},{},{},{},{},{},{},{},{}],
                   [{},{},{},{},{},{},{},{},{},{}],
                   [{},{},{},{},{},{},{},{},{},{}],
                   [{},{},{},{},{},{},{},{},{},{}]]
for (let y = 0; y < atmosArrayAdv.length; y++) {
    for (let x = 0; x < atmosArrayAdv[y].length; x++) {
        if(x-1<0){
            var left=-1
        }else{
            var left=atmosArray[y][x-1]
        }
        if(x+1>=atmosArrayAdv[y].length){
            var right=-1
        }else{
            var right=atmosArray[y][x+1]
        }
        if(y-1<0){
            var up=-1
        }else{
            var up=atmosArray[y-1][x]
        }
        if(y+1>=atmosArrayAdv.length){
            var down=-1
        }else{
            var down=atmosArray[y+1][x]
        }
        atmosArrayAdv[y][x]={center:atmosArray[y][x],left,right,up,down}
    }
    
    
}
function drawVals(){
    ctx.fillStyle="#000000"
    ctx.fillRect(0,0,640,640)
    ctx.fillStyle="#ffffff"
    for (let j = 0; j < atmosArray.length; j++) {
        for (let i = 0; i < atmosArray[j].length; i++) {
            ctx.fillText(Math.round(atmosArray[j][i]*100)/ 100,i*64+10,j*64+16)
            
        }
        
    }
}
function setPressure(x,y,val){
    atmosArrayAdv[y][x].center=val
    atmosArray[y][x]=val
    if(atmosArrayAdv[y][x].up!=-1){
        atmosArrayAdv[y-1][x].down=val
    }
    if(atmosArrayAdv[y][x].down!=-1){
        atmosArrayAdv[y+1][x].up=val
    }
    if(atmosArrayAdv[y][x].left!=-1){
        atmosArrayAdv[y][x-1].right=val
    }
    if(atmosArrayAdv[y][x].right!=-1){
        atmosArrayAdv[y][x+1].left=val
    }
}

function step(){
    var withPressure=[]
    for (let y = 0; y < atmosArrayAdv.length; y++) {
        for (let x = 0; x < atmosArrayAdv[y].length; x++) {
            if(atmosArrayAdv[y][x].center!=-1){
                if (atmosArrayAdv[y][x].center>0) {
                    withPressure.push([y,x])
                }
            }
        }
    }
    for (let i = 0; i < withPressure.length; i++) {
        var el = withPressure[i]
        var y=el[0]
        var x=el[1]
        var sum=0
        var c=1
        sum+=atmosArrayAdv[y][x].center
        if(atmosArrayAdv[y][x].up!=-1){
            sum+=atmosArrayAdv[y][x].up
            c++
        }
        if(atmosArrayAdv[y][x].down!=-1){
            sum+=atmosArrayAdv[y][x].down
            c++
        }
        if(atmosArrayAdv[y][x].left!=-1){
            sum+=atmosArrayAdv[y][x].left
            c++
        }
        if(atmosArrayAdv[y][x].right!=-1){
            sum+=atmosArrayAdv[y][x].right
            c++
        }
        var finalVal=sum/c
        setPressure(x,y,finalVal)
        drawVals()
        if(atmosArrayAdv[y][x].up!=-1){
            setPressure(x,y-1,finalVal)
            drawVals()
        }
        if(atmosArrayAdv[y][x].down!=-1){
            setPressure(x,y+1,finalVal)
            drawVals()
        }
        if(atmosArrayAdv[y][x].left!=-1){
            setPressure(x-1,y,finalVal)
            drawVals()
        }
        if(atmosArrayAdv[y][x].right!=-1){
            setPressure(x+1,y,finalVal)
            drawVals()
        }
    }
}
setInterval(() => {
    drawVals()
}, 1000/30);
setInterval(() => {
    step()
}, 1000);