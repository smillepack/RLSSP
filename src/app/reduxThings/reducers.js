import { configureStore, createSlice } from "@reduxjs/toolkit"
import { combineReducers } from 'redux'
import { setCookie } from '../workWithCookie.js'

import { ai, whoWins } from '../gameThings.js'
import { colorArrow } from '../canvas/forGame.js'

const appSlice = createSlice({
    name: 'app',
    initialState: { user: '', beHereBefore: false },
    reducers: {
        wasHere(state, action)  { 
            const { user } = action.payload

            return { ...state, beHereBefore: true, user } 
        }
    }
})

const enterNameSlice = createSlice({
    name: 'enterName',
    initialState: { user: '', text: '' },
    reducers: {
        changeText(state, action) { 
            const  value  = action.payload

            return { ...state, text: value  }
        },
        changeName: state => {
            if (state.text === '') return state
            
            setCookie('user', state.text, { 'max-age': 3600 })

            return { ...state, beHereBefore: true, user: state.text }
        }
    }
})

const gameSlice = createSlice({
    name: 'game',
    initialState: {
        gameStatus: '',
        myChoice: '',
        aiChoice: '',
        gameHistory: [],
        aiWinCount: 0,
        myWinCount: 0
    },
    reducers: {
        game(state, action) {
            const myChoice  = action.payload
            const aiChoice = ai() 
            const gameStatus = whoWins(myChoice, aiChoice)

            const aiWinCount = gameStatus == 'def' ? state.aiWinCount + 1:  state.aiWinCount
            const myWinCount = gameStatus == 'win' ? state.myWinCount + 1:  state.myWinCount
            const gameHistory =  [...state.gameHistory, { gameStatus, myChoice, aiChoice }]

            colorArrow(myChoice, aiChoice, gameStatus)

            return { ...state, gameStatus, myChoice, aiChoice, gameHistory, aiWinCount, myWinCount }
        }
    }
})

const appReducer = appSlice.reducer
const enterReducer = enterNameSlice.reducer
const gameReducer = gameSlice.reducer

const allReducers = combineReducers({
    appReducer,
    enterReducer,
    gameReducer
})

export const { wasHere } = appSlice.actions
export const { changeName, changeText } = enterNameSlice.actions
export const { game } = gameSlice.actions 

// export const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
export const store = configureStore({
    reducer: allReducers
})