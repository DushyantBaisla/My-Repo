import React, { Component } from 'react'
import { getMovies } from './getMovies'
import axios from 'axios'
export default class movie extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            searchText: '',
            pageNum: 1,
            limit: 4,
            genres: [{ _id: 'abd', name: "All Genres" }],
            cGenre: 'All Genres'
        }
    }
    async componentDidMount() {
        let promiseObj = await axios.get("https://backend-react-movie.herokuapp.com/movies");
        let genrePromise = await axios.get("https://backend-react-movie.herokuapp.com/genres")

        this.setState({
            movies: promiseObj.data.movies,
            genres: [...this.state.genres, ...genrePromise.data.genres]
        })
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
        this.setState({
            searchText: txt
        })
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
    //--------Dynamic limit of movies per page ------------
    handleLimit = (e) => {
        let num = Number(e.target.value);
        this.setState({ limit: num })
    }

    //------- Change Page --------------
    changePage = (pNo) => {
        this.setState({ pageNum: pNo })
    }

    //----------- Change Genre --------------
    changeGenre = (genre) => {
        this.setState({
            cGenre: genre
        })
    }

    //----------------- Render function -------------

    render() {

        //-------------Filtering movies --------
        let { movies, searchText, pageNum, limit, genres, cGenre } = this.state;
        let filteredMovies = [];

        if (searchText !== '') {
            filteredMovies = movies.filter(movieObj => {
                let title = movieObj.title.trim().toLowerCase();
                return title.includes(searchText.toLowerCase());
            })
        } else {
            filteredMovies = movies;
        }

        if (cGenre != 'All Genres') {
            filteredMovies = filteredMovies.filter(movieObj => {
                return movieObj.genre.name == cGenre
            })
        }

        //--------- Pagination ---------
        let numberOfPages = Math.ceil(filteredMovies.length / limit);
        let pages = []
        for (let i = 0; i < numberOfPages; i++) {
            pages.push(i + 1);
        }

        //----- Movies per page --------        
        let si = (pageNum - 1) * limit;
        let ei = si + limit;
        filteredMovies = filteredMovies.slice(si, ei);

        if (filteredMovies.length === 0 && movies.length != 0) {
            this.changePage(pageNum - 1);
        }
        //-------------Filtering movies --------

        return (
            <>
                {
                    this.state.movies.length == 0
                        ?
                        //if
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        //else
                        :
                        <div className='row'>
                            {/* */}
                            <div className='col-3'>
                                <ul className='list-group'>
                                    {
                                        genres.map(genreObj => {
                                            let clName = genreObj.name == cGenre ? "list-group-item active" : 'list-group-item';

                                            return (
                                                <li className={clName} key={genreObj._id} onClick={() => this.changeGenre(genreObj.name)}>
                                                    {genreObj.name}
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            {/*----------Movies Table Area----------*/}
                            <div className='col-9'>
                                <input type='text' onChange={this.handleChange} value={this.searchText}></input>
                                <input type='number' min='1' max={this.state.movies.length} onChange={this.handleLimit} value={this.state.limit < filteredMovies.length ? this.state.limit : filteredMovies.length}></input>
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
                                <ul className="pagination">
                                    {pages.map(pNo => {
                                        let clName = pNo === pageNum ? 'page-item active' : 'page-item'
                                        return (
                                            <li className={clName} key={pNo} onClick={() => this.changePage(pNo)}>
                                                <a className="page-link" href="#">{pNo}</a>
                                            </li>
                                        )
                                    })
                                    }

                                </ul>
                            </div>
                        </div>
                }
            </>
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