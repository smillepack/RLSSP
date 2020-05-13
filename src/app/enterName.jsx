import React from 'react'
import {  changeName, changeText } from './reduxThings/reducers.js'
import { connect } from 'react-redux'

import Style from '../style/style.css'
 
class EnterName extends React.Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.props.changeText(e.target.value)
    }

    handleSubmit(e) {
        this.props.changeName()

        e.preventDefault()
    }

    render() {
        return (
            <div className={'containerEnterForm'}>
                <form onSubmit={this.handleSubmit} className={'enterFrom'}>
                    <label>Enter your name:</label>
                    <input type="text" value={this.props.text} onChange={this.handleChange} placeholder={'Alex'} />
                    <input type="submit" value="send"/>
                </form>
            </div>
        )
    }
}

EnterName = connect(state => {return { text: state.enterReducer.text }}, {changeText, changeName})(EnterName)

export default EnterName

