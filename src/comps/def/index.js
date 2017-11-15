import React, { Component } from 'react'
import './style.css'

import AddDef from '../../comps/add-def/index'
import { NavLink } from 'react-router-dom';

const pronunce = (thingy) => {
    if (thingy) {
        return <h3 className='pronounced'>Pronounced: {thingy}</h3>
    }
    return null
}


class Defenition extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            modal: null,
            defs: this.props.defs,
            pros: this.props.all.pro
        }
        this.toggleModal = this.toggleModal.bind(this)
    }
    toggleModal (newWord) {
        if(this.state.modal) {
            this.setState({
                modal: null
            })
            if(newWord) {
            let array = this.state.defs
            array.push(newWord.def)
            this.setState({
                defs: array
            })
            array = this.state.pros
            array.push(newWord.pro)
            this.setState({
                pros: array
            })
        }
            
        }
        else {
            this.setState({
                modal: true
            })
        }
    }
    render () {
        return (
            <div id='def-body'>
                <h1>{this.props.word}</h1>
                <div id='left-margin-div'>
                {this.state.defs.map((data, itr) => {
                    return (
                        <div>
                            {pronunce(this.state.pros[itr])}
                            <p key={itr}>
                                {itr+1}. {data}
                            </p>
                        </div>
                    )
                })}
                <div id='row-buttons'>
                    <NavLink to= '/'>Go Back</NavLink>
                    <button onClick={()=>this.toggleModal()}>Add New Defenition</button>
                </div>
                </div>
                <AddDef check={this.state.modal} callBack={this.toggleModal} word={this.props.word}/>
            </div>
        )
    }
}

export default Defenition