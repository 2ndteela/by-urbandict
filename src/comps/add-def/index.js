import React , { Component } from 'react'
import Axios from 'axios'
import './style.css'

class AddDef extends Component {
    saveDef () {
        const input = document.querySelector('input').value
        const area = document.querySelector('textarea').value

        const toSend = {
            pro: input,
            def: area,
            word: this.props.word
        }
        const def = {
            pro: toSend.pro,
            def: toSend.def
        }
        Axios.put(`http://ec2-52-38-205-4.us-west-2.compute.amazonaws.com:4200/def`, toSend)
        .then(function(res, req, err) {
            if(err) console.log(err)
            else {
                console.log(res.data)

            }
        })
        this.props.callBack(def)
    }
    render () {
        if(this.props.check) {
        return (
            <div>
                <div id='modal-container'>
                    <div id='modal-body'>
                        <input type='text' placeholder='Pronunciation (Optional)'/>
                        <textarea placeholder='Defenition'></textarea>
                        <div >
                            <button onClick={() => this.saveDef()}>Save</button>
                            <button onClick ={() => this.props.callBack()}>Cancel</button>
                        </div>
                    </div>
                </div>
                <div id='black-drop'/>
            </div>
        )
    }
    return null
    }
}

export default AddDef