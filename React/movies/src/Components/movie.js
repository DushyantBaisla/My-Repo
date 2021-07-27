import React, { Component } from 'react'
import { getMovies } from './getMovies'

export default class movie extends Component {
    constructor(props){
        super(props)
        this.state ={
            movies:getMovies()
        }
    }
    render() {
        
        return (
            <div>
                
            </div>
        )
    }
}
