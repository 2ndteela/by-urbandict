import React ,{ Component } from 'react'
import Axios from 'axios'
import './style.css'
import { NavLink } from 'react-router-dom';

class Top extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
    }
    
    componentWillMount() {
        var self = this
        Axios.get('http://ec2-52-38-205-4.us-west-2.compute.amazonaws.com:4200/top')
        .then(function(res, req, err) {
            console.log(res.data)
            self.setState({
                list: res.data
            })
        })
    }

    render () {
        return(
            <div id='top-list'>
                <div className='header'>
                    <h1>Top Words</h1>
                </div>
                <NavLink to='/'>Go Back</NavLink>
                <br />
                {this.state.list.map((data, itr) => (
                    <NavLink to={`/search/${data.word}`}>{data.word}</NavLink>
                ))}
            </div>
        )
    }
}

export default Top