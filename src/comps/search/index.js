import React, { Component } from 'react'
import './style.css'
import Axios from 'axios'
import Definition from '../def/index'
import {NavLink} from 'react-router-dom'

const defDiv = (thing, term) => {
    console.log(thing)
    if(thing && thing !== null) {
        return (
            <Definition word={thing.word} defs={thing.def} all={thing}/>
        )
    }
    else {
        return (
            <div id='no-word'>
                <h1>There was result for "{term}"</h1>
                <p>Do you want to add it to the dicitionary?</p>
                <div className='link-box'>
                    <NavLink to ='/new'>Yes</NavLink>
                    <NavLink to ='/'>Go Back</NavLink>
                </div>
            </div>
        )
    }
}

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            words: null,
            term: null,
            modal: null
        }
    }

    componentDidMount () {
        const thing = this.props.match.params.word
        var self = this
        if(thing) {
            Axios.get(`http://ec2-52-38-205-4.us-west-2.compute.amazonaws.com:4200/search/${thing}`)
            .then(function (res, req, err) {
                if (err) {
                    document.getElementById('loading-message').innerHTML = "Looks like there was an Error..."
                }
                else {
                    console.log(res.data)
                    self.setState({
                        words: res.data,
                        term: self.props.match.params.word
                    })
                } 
            })
        }
    }

    render () {
            return (
                <div>
                    <div id='loaded-result'>
                        <div className='header'>
                            <h1>Results</h1>
                        </div>
                        <div id='defenitions-found'>
                            {defDiv(this.state.words, this.state.term)}
                        </div>
                    </div>
                </div>
            )
    }
}

export default Search