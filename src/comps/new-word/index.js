import React, { Component } from 'react'
import Axios from 'axios'
import {NavLink} from 'react-router-dom'
import './style.css'

class AddNew extends Component {
    sendWord () {
        const inputs = document.querySelectorAll('input')
        const area = document.querySelector('textarea')

        const toSend = {
            word: inputs[0].value.toUpperCase(),
            pro: [inputs[1].value],
            def: [area.value],
            upVotes: 0,
            clicks: 0
        }

        if(toSend.word !== '' && toSend.def !== '') {
            Axios.post(`http://ec2-52-38-205-4.us-west-2.compute.amazonaws.com:4200/new`, toSend)
            .then(function(res, req, err) {
                if(err) console.log(err)
                else if(res.data) {
                    console.log(res.data)
                    const all = document.getElementById('word-confirmed')         
                    all.style.display = 'flex'
                    let messageBody = document.getElementById('confirmed-message')
                    messageBody.innerHTML = `<p>Your word <span><strong>${toSend.word}</strong></span> was added to the dictionary</p>`
                }
                else {
                    console.log(res.data)
                    const all = document.getElementById('word-confirmed')                 
                    all.style.display = 'flex'
                    let messageBody = document.getElementById('confirmed-message')
                    messageBody.innerHTML = `<p>The Word <span><strong>${toSend.word}</strong></span> is already in the dictionary</p>`
                }
            })
        }
        else window.alert('make sure to fill in a word and a definition')
    }
    render() {
        return(
            <div>
                <div className='header'>
                    <h1>Add New Word</h1>
                </div>
                <div id='new-word-inputs'>
                    <input type='text' placeholder='New Word' />
                    <input type='text' className='two-four-px' placeholder='Pronunciation (Optional)' />
                    <textarea placeholder='Defenition'></textarea>
                    <button onClick={() => this.sendWord()}>Save Word</button>
                </div>
                <div id='word-confirmed'>
                    <div id='confirmed-message'></div>
                    <div id='confirmed-buttons'>
                        <NavLink to='/'>Home Page</NavLink>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddNew