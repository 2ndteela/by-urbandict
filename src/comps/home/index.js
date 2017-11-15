import React , { Component} from 'react'
import './style.css'
import {NavLink} from 'react-router-dom'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            word: ''
        }
    }
    changeWord() {
        const newWord = document.querySelector('input').value
        this.setState({
            word: newWord.toUpperCase()
        })
    }
    render() {
        return (
            <div>
                <div className='header'>
                    <h1>BY-Urban Dictionary</h1>
                    <p>Your source for all BYU terms and slang</p>
                </div>
                <div id='home-content'>
                    <input placeholder='Enter Search term' type='text' onChange={()=>this.changeWord()} />
                    <div>
                        <NavLink to={`search/${this.state.word}`}>Search</NavLink>
                        <NavLink to='search/random'>Suprise Me</NavLink>
                        <NavLink to='/top'>Top Words</NavLink>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home