import React, {useState} from 'react'

import {sutra, chapter} from './sutra'

function calculateLevDistance(src, tgt) {
    var realCost;
    
    var srcLength = src.length,
        tgtLength = tgt.length,
        tempString, tempLength; // for swapping
    
    var resultMatrix = new Array();
        resultMatrix[0] = new Array(); // Multi dimensional
    
    // To limit the space in minimum of source and target,
    // we make sure that srcLength is greater than tgtLength
    if (srcLength < tgtLength) {
        tempString = src; src = tgt; tgt = tempString;
        tempLength = srcLength; srcLength = tgtLength; tgtLength = tempLength;
    }
    
    for (var c = 0; c < tgtLength+1; c++) {
        resultMatrix[0][c] = c;
    }
    
    for (var i = 1; i < srcLength+1; i++) {
        resultMatrix[i] = new Array();
        resultMatrix[i][0] = i;
        for (var j = 1; j < tgtLength+1; j++) {
            realCost = (src.charAt(i-1) == tgt.charAt(j-1))? 0: 1;
            resultMatrix[i][j] = Math.min(
                resultMatrix[i-1][j]+1,
                resultMatrix[i][j-1]+1,
                resultMatrix[i-1][j-1] + realCost // same logic as our previous example.
            ); 
        }
    }
    
    return resultMatrix[srcLength][tgtLength];
}

const App = () => {
    const regex = /[。，、；：？！「」『』:punct:!?., ]/g
    const [index, setIndex] = useState(1)
    const [recitation, setRecitation] = useState("")
    const [show, setShow] = useState(true)
    return (
        <div class="ui container">
            <br/>
            <h1 class="ui header">金剛般若波羅蜜經</h1>
            <p>姚秦天竺三藏鳩摩羅什 譯</p>
            {index>1?
            <button class="ui right labeled icon button" onClick={()=>{setIndex(index-1)}}>
                <i class="left arrow icon"></i>
                Prev
            </button>
            :
            <div/>
            }
            {index<32?
            <button class="ui right labeled icon button" onClick={()=>{setIndex(index+1)}}>
                <i class="right arrow icon"></i>
                Next
            </button>
            :
            <div></div>
            }
            {show?
            <button class="ui black button" onClick={()=>{setShow(!show)}}>
                <i class="eye slash icon"></i>
                隱藏經文
            </button>
            :
            <button class="ui green button" onClick={()=>{setShow(!show)}}>
                <i class="eye icon"></i>
                顯示經文
            </button>
            }
            <h2 class="ui header">{chapter[index-1]}</h2>
            {show?
            <h3 class="ui header">{sutra[index-1]}</h3>
            :
            <div/>
            }
            
            <div class="ui divider"></div>
            <div class="ui form">
                <div class="field">
                    <label><i class="paper plane outline icon"></i>背誦區：
                    </label>
                    <textarea onChange={(e)=>{setRecitation(e.target.value)}}></textarea>
                </div>
            </div>
            <div>待修改的字數：{calculateLevDistance(sutra[index-1].replace(regex,''), recitation.replace(regex,''))}</div>
            <div class="ui divider"></div>
            <h6>歡迎任何建議：chenbingjyue@gmail.com</h6>
        </div>
    )
}

export default App