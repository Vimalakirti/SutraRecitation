import React, {useState} from 'react'
import { Dropdown } from 'semantic-ui-react'
import ed from 'edit-distance'
import {diamond_sutra, bequeathed_teachings_sutra, heart_sutra, universal_gate_chapter, bodhisattva_samantabhadra} from './sutra'

const sutraOptions = [
    {
      key: 'DiamondSutra',
      text: '金剛經',
      value: 'DiamondSutra',
    },
    {
      key: 'HeartSutra',
      text: '心經',
      value: 'HeartSutra',
    },
    {
        key: 'BequeathedTeachingsSutra',
        text: '佛遺教經',
        value: 'BequeathedTeachingsSutra',
    },
    {
      key: 'BodhisattvaSamantabhadra',
      text: '普賢行願品',
      value: 'BodhisattvaSamantabhadra',
    },
    {
      key: 'TheUniversalGate',
      text: '普門品',
      value: 'TheUniversalGate',
    }
]

const App = () => {
    const regex = /[　\n。，、；：？！「」『』:punct:!?., ]/g
    const [index, setIndex] = useState(1)
    const [recitation, setRecitation] = useState("")
    const [show, setShow] = useState(true)
    const [showAnswer, setShowAnswer] = useState(false)

    const [currentSutra, setCurrentSutra] = useState(diamond_sutra)
    const handleDropdown = (e, data) => {
        setIndex(1)
        switch(data.value){
            case "DiamondSutra":
                setCurrentSutra(diamond_sutra)
            break
            case "HeartSutra":
                setCurrentSutra(heart_sutra)
            break
            case "BequeathedTeachingsSutra":
                setCurrentSutra(bequeathed_teachings_sutra)
            break
            case "TheUniversalGate":
                setCurrentSutra(universal_gate_chapter)
            break
            case "BodhisattvaSamantabhadra":
                setCurrentSutra(bodhisattva_samantabhadra)
            break
            default:
                setCurrentSutra(diamond_sutra)
            break
        }
    }

    var insert, remove, update;
    insert = remove = function(node) { return 1; }
    update = function(stringA, stringB) { return stringA !== stringB ? 1 : 0; }
    var lev = ed.levenshtein(currentSutra.sutra[index-1].replace(regex,''), recitation.replace(regex,''), insert, remove, update);
    console.log('Levenshtein', lev.distance, lev.pairs(), lev.alignment())

    return (
        <div className="ui container">
            <br/>
            <Dropdown placeholder="請選擇經文" fluid selection options={sutraOptions} onChange={handleDropdown}/>
            <h1 className="ui header">{currentSutra.sutraName}</h1>
            <p>{currentSutra.translator}譯</p>
            {index>1?
            <button className="ui right labeled icon button" onClick={()=>{setIndex(index-1)}}>
                <i className="left arrow icon"></i>
                Prev
            </button>
            :
            <div/>
            }
            {index<currentSutra.numChapter?
            <button className="ui right labeled icon button" onClick={()=>{setIndex(index+1)}}>
                <i className="right arrow icon"></i>
                Next
            </button>
            :
            <div></div>
            }
            {show?
            <button className="ui black button" onClick={()=>{setShow(!show)}}>
                <i className="eye slash icon"></i>
                隱藏經文
            </button>
            :
            <button className="ui green button" onClick={()=>{setShow(!show)}}>
                <i className="eye icon"></i>
                顯示經文
            </button>
            }
            <h2 className="ui header">{currentSutra.chapter[index-1]}</h2>
            {show?
            <h3 className="ui header">{currentSutra.sutra[index-1]}</h3>
            :
            <div/>
            }
            
            <div className="ui divider"></div>
            <div className="ui form">
                <div className="field">
                    <label><i className="edit icon"></i>背誦區：
                    </label>
                    <textarea onChange={(e)=>{setRecitation(e.target.value)}}></textarea>
                    <label><i className="microphone icon"></i>小提醒：可以用手機的語音輸入法來默背哦
                    </label>
                </div>
            </div>
            <div className="ui divider"></div>
            {showAnswer?
            <div>
            <button className="ui black button" onClick={()=>{setShowAnswer(!showAnswer)}}>
                <i className="eye slash icon"></i>
                隱藏答案
            </button>
                <h3 className="ui header">待修改的字數：{lev.distance}</h3>
                <table className="ui celled table">
                <thead>
                    <tr>
                    <th></th>
                    <th className="positive">正確答案</th>
                    <th className="warning">原始作答</th>
                </tr></thead>
                <tbody>
                    {lev.pairs().map(function(name, index){
                    return (
                        <tr>
                            {name[0]===name[1]?
                            <i className='icon big green check'></i>
                            :
                            <i className='icon big red times'></i>
                            }
                            <td className="positive">{name[0]}</td>
                            <td className="warning">{name[1]}</td>
                        </tr>
                    );
                    })}
                </tbody>
                </table>
            </div>
            
            :
            <button className="ui blue button" onClick={()=>{setShowAnswer(!showAnswer)}}>
                <i className="eye icon"></i>
                顯示答案
            </button>
            }
            
            <div className="ui divider"></div>
            <h6>歡迎任何建議：chenbingjyue@gmail.com</h6>
        </div>
    )
}

export default App