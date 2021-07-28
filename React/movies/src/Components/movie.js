import React, { Component } from 'react'
import { getMovies } from './getMovies'

export default class movie extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: getMovies(),
            searchText: ''
        }
    }
    //---------Deleting movie------------
    onDelete = (id) => {
        let moviesArr = this.state.movies.filter(movieObj => {
            return movieObj._id !== id;
        })
        this.setState({
            movies: moviesArr
        })
    }
    //-------Update state of current SearchText--------
    handleChange = (e) => {
        let txt = e.target.value;
        this.setState({ searchText: txt })
    }
    //----Sort by Ratings------
    sortRatings = (e) => {
        let className = e.target.className;
        let tempArr = this.state.movies.sort(function (a, b) {
            if (className === 'fas fa-sort-up') {
                return a.dailyRentalRate - b.dailyRentalRate;
            }
            return b.dailyRentalRate - a.dailyRentalRate;
        })
        this.setState({ movies: tempArr });
    }

    render() {
        //-------------Filtering movies --------
        let { movies, searchText } = this.state;
        let filteredMovies = [];
        if (searchText !== '') {
            filteredMovies = movies.filter(movieObj => {
                let title = movieObj.title.trim().toLowerCase();
                return title.includes(searchText.toLowerCase());
            })
        } else {
            filteredMovies = movies;
        }
        //-------------Filtering movies --------

        return (
            <div className='row'>
                {/* */}
                <div className='col-3'>

                </div>
                {/*----------Movies Table Area----------*/}
                <div className='col-9'>
                    <input type='text' onChange={this.handleChange} value={this.searchText}></input>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>Title</th>
                                <th scope='col'>Genre</th>
                                <th scope='col'>
                                    Ratings
                                    <i className="fas fa-sort-up" onClick={this.sortRatings}></i>
                                    <i className="fas fa-sort-down" onClick={this.sortRatings}></i>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMovies.map(movieObj => (
                                <tr scope='row' key={movieObj._id}>
                                    <td></td>
                                    <td>{movieObj.title}</td>
                                    <td>{movieObj.genre.name}</td>
                                    <td>{movieObj.dailyRentalRate}</td>
                                    <td><button type='button' className="btn btn-danger" onClick={() => this.onDelete(movieObj._id)}>Delete</button></td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

// {movies.map(movieObj => (
//     <div className='movie-item' key={movieObj._id}>
//         <td>{movieObj.title}</span>
//         <span>{movieObj.genre.name}</span>
//         <span>{movieObj.dailyRentalRate}</span>
//         <button onClick={() => this.onDelete(movieObj._id)}>Delete</button>
//     </div>
// ))
// }