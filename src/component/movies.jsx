import React, { Component } from 'react';
import MoviesTable from "./moviesTable"
import ListGroup from './common/ListGroup'
import Pignation from './common/pagination';
import {getMovies} from "../services/fakeMovieService";
import {getGenres }from "../services/fakeGenreService"
import {paginate }from '../utils/paginate'
import _ from 'lodash'



class Movies extends Component {
    state = { 
        movies :[],
        genres:[],
        currentPage:1,
        pageSize:4,
        sortColumn:{path:"title",order:"asc"}
     }


     componentDidMount(){
         const genres =[ {_id:"",name:" All Geners"},...getGenres()]
         this.setState({movies : getMovies(), genres})
     }

     //  events section
     handleDelete =(movie)=>{
         const movies = this.state.movies.filter(m => m._id !== movie._id);
         this.setState({movies})


     }
     handleLike =(movie)=>{
        const movies =[...this.state.movies];
        const index =movies.indexOf(movie);
        movies[index] ={...movies[index]}
        movies[index].liked =!movies[index].liked ;
        this.setState({movies})
     }
     handlePageChange =(page)=>{
        this.setState({currentPage: page})
     }
     handleGereSelect = genre =>{
         
         this.setState({selectedGenre :genre ,currentPage:1})
     }
     handleSort = path =>{
         const sortColumn ={...this.state.sortColumn}
         if(sortColumn.path ===path)
         sortColumn.order =(sortColumn.order==='asc')? 'desc':'asc'
         else 
         {sortColumn.path =path;
         sortColumn.order= 'asc'}
         this.setState({sortColumn})
     }

    
    render() 
    { 

        const {length : count} =this.state.movies;

        const {
            pageSize,
            currentPage,
            sortColumn,
            selectedGenre ,
            movies :allMovies
        }= this.state
        if (count=== 0 ) return<p>There are no movies in database</p>;

        const filtered = selectedGenre &&selectedGenre._id
         ? allMovies.filter(m =>m.genre._id ===selectedGenre._id)
         :allMovies;

        const sorted = _.orderBy(filtered,[sortColumn.path], [sortColumn.order])
        // create new list of movie to keep the original one untouched throug pagination ,filtering and search
        const movies = paginate(sorted,currentPage,pageSize)

        return (<div  className="row">


            <div className="col-3">
                <ListGroup 
                 items ={this.state.genres}
                 selectedItem ={this.state.selectedGenre}
                 onItemSelect={this.handleGereSelect} 
                 />
            </div>

            <div className="col">
            <p>Showing {filtered.length} movies in database</p>
               <MoviesTable 
               movies={movies}
               onLike ={this.handleLike}
               onDelete ={this.handleDelete}
               onSort ={this.handleSort}
               />
        <Pignation 
         itemCount ={filtered.length} 
         pageSize={pageSize}
         currentPage={currentPage}
         onPageChange = {this.handlePageChange} />
            </div>

        </div>)
     
    }
}export default Movies;