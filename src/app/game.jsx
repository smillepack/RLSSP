import React, { Component } from 'react'
import { game } from './reduxThings/reducers.js'
import { connect } from 'react-redux'

import style from '../style/style.css'
import { area } from './canvas/area.js'
import { sendElements } from './canvas/forGame.js'

import Rock     from '../svg/rock.svg'
import Paper    from '../svg/paper.svg'
import Scissors from '../svg/scissors.svg'  
import Lizard   from '../svg/lizard.svg' 
import Spock    from '../svg/spock.svg'
import Def      from '../svg/skull.svg'
import Win      from '../svg/trophy.svg'
import Draw     from '../svg/equals.svg'

const imgSrc = {
    rock: Rock,
    paper: Paper,
    scissors: Scissors,
    lizard: Lizard,
    spock: Spock,
    def: Def,
    win: Win,
    draw: Draw
}

class Game extends Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        area()

        let arrElement = document.querySelectorAll('.someElement')

        sendElements(arrElement)
    }   

    handleChange(e) {
        this.props.game( e.target.value )
        
        e.target.checked = false
        e.preventDefault()
    }

    render() {
        let history = [...this.props.gameHistory]
        
        return (
            <div className={'container'}>
                <header>
                
                    <div className={'headerLeft'}>
                        <div>{this.props.user}</div>
                        <div className={'row'}>                                                        
                                <img src={imgSrc["win"]} alt=""/>
                            <div className={'center'}>
                                win: {this.props.myWinCount} 
                            </div>
                        </div>
                        <div className={'row'}>                            
                                <img src={imgSrc["def"]} alt=""/>                            
                            <div className={'center'}>
                                def: {this.props.aiWinCount}
                            </div>
                        </div>                    
                    </div>

                    <div className={'headerRight'}>
                    
                        <div className={'gameState'}>
                            <img src={imgSrc[this.props.gameStatus]} alt=""/>                            
                        </div>
                        <div className={'gameStatus'}>
                         
                            <div className={'gameBattle'}>                            
                                <img src={imgSrc[this.props.myChoice]} alt=""/>
                            </div>
                            <div>VS</div>
                            <div className={'gameBattle'}>                            
                                <img src={imgSrc[this.props.aiChoice]} alt=""/>
                            </div>
                        </div>
                    </div>                                                                        
                </header>
                

                <canvas id={'canvas'} width={'330px'} height={'320px'}></canvas>

                <form onChange={this.handleChange} className={'formForElements'}>
                    <input className={'invisible'} type="radio" name="game" id="rd1" value="rock"  />
                    <label className={'someElement'} htmlFor="rd1" >
                        <img src={Rock} alt="rock"/>
                    </label>

                    <input className={'invisible'}  type="radio" name="game" id="rd2" value="lizard" />
                    <label className={'someElement'} htmlFor="rd2">
                        <img src={Lizard} alt="lizard"/>
                    </label>

                    <input className={'invisible'}  type="radio" name="game" id="rd3" value="spock" />
                    <label className={'someElement'} htmlFor="rd3">
                        <img src={Spock} alt="spock"/>
                    </label>

                    <input className={'invisible'}  type="radio" name="game" id="rd4" value="scissors" />
                    <label className={'someElement'} htmlFor="rd4">
                        <img src={Scissors} alt="scissors"/>
                    </label>    

                    <input className={'invisible'}  type="radio" name="game" id="rd5" value="paper" />
                    <label className={'someElement'} htmlFor="rd5">
                        <img src={Paper} alt="paper"/>
                    </label>
                </form>                                
                <div className={'gameHistoryText'}>History</div>
                <div className={'gameHistory'}>                    
                    {history.reverse().map(el => {
                        return (
                            <div key={Math.random()} className={el.gameStatus}>
                                <div>
                                    <img src={imgSrc[el.myChoice]} alt=""/>
                                </div>
                                <div className={'historyElCenter'}>
                                    <img src={imgSrc[el.gameStatus]} alt=""/>
                                </div>
                                <div>
                                    <img src={imgSrc[el.aiChoice]} alt=""/>
                                </div>
                            </div>                            
                        )
                    })}
                </div>
            </div>
        )
    }
}

Game = connect(state => {
    return { 
        user: state.appReducer.user || state.enterReducer.user,
        gameHistory: state.gameReducer.gameHistory,
        myWinCount: state.gameReducer.myWinCount,
        aiWinCount: state.gameReducer.aiWinCount,
        gameStatus: state.gameReducer.gameStatus,
        aiChoice: state.gameReducer.aiChoice,
        myChoice: state.gameReducer.myChoice
    }
}, { game })(Game)

export default Game