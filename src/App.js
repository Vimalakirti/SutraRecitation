import React, {useState} from 'react'
import ed from 'edit-distance'
import {sutra, chapter} from './sutra'

const App = () => {
    const regex = /[。，、；：？！「」『』:punct:!?., ]/g
    const [index, setIndex] = useState(1)
    const [recitation, setRecitation] = useState("")
    const [show, setShow] = useState(true)
    const [showAnswer, setShowAnswer] = useState(false)
    
    var insert, remove, update;
    insert = remove = function(node) { return 1; }
    update = function(stringA, stringB) { return stringA !== stringB ? 1 : 0; }
    var lev = ed.levenshtein(sutra[index-1].replace(regex,''), recitation.replace(regex,''), insert, remove, update);
    console.log('Levenshtein', lev.distance, lev.pairs(), lev.alignment())

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
            <div class="ui divider"></div>
            {showAnswer?
            <div>
            <button class="ui black button" onClick={()=>{setShowAnswer(!showAnswer)}}>
                <i class="eye slash icon"></i>
                隱藏答案
            </button>
                <h3 class="ui header">待修改的字數：{lev.distance}</h3>
                <table class="ui celled table">
                <thead>
                    <tr>
                    <th></th>
                    <th>正確答案</th>
                    <th>原始作答</th>
                </tr></thead>
                <tbody>
                    {lev.pairs().map(function(name, index){
                    return (
                        <tr>
                            {name[0]==name[1]?
                            <i class='icon green check'></i>
                            :
                            <i class='icon red times'></i>
                            }
                            <td >{name[0]}</td>
                            <td >{name[1]}</td>
                        </tr>
                    );
                    })}
                </tbody>
                </table>
            </div>
            
            :
            <button class="ui blue button" onClick={()=>{setShowAnswer(!showAnswer)}}>
                <i class="eye icon"></i>
                顯示答案
            </button>
            }
            
            <div class="ui divider"></div>
            <h6>歡迎任何建議：chenbingjyue@gmail.com</h6>
        </div>
    )
}

export default App