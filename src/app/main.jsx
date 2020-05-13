import React from 'react'
import EnterName from './enterName.jsx'
import Game from './game.jsx'

import { getCookie, deleteCookie } from './workWithCookie.js' 
import { connect } from 'react-redux'
import { wasHere } from './reduxThings/reducers.js'

class Main extends React.Component {
    componentDidMount() {
        if ( getCookie('user') !== undefined ) {
            this.props.wasHere({ user: getCookie('user') })
        } 
    }

    render() {
        return (
            <>
                { this.props.beHereBefore ? <Game /> : <EnterName  /> }
            </>            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.appReducer.beHereBefore ? state.appReducer.name : state.enterReducer.name ,
        beHereBefore: state.appReducer.beHereBefore ? true : state.enterReducer.beHereBefore
    }
}
const mapDispatchToProps = { wasHere }

Main = connect(mapStateToProps, mapDispatchToProps)(Main)

export default Main