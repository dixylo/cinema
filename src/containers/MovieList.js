import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteMovieAsync } from '../reducers/movies';

class MovieList extends Component {
  state = {
    name: '',
    category: '',
    directors: '',
    writers: '',
    stars: '',
    portrait: '',
    landscape: ''
  }

  handleFormChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleDelete (movieId) {
    if (this.props.onDelete) {
      this.props.onDelete(movieId);
    }
  }

  render () {
    return (
      <div>
        <table className='admin-table'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Category</th>
              <th>Director(s)</th>
              <th>Writer(s)</th>
              <th>Stars</th>
              <th>Portrait</th>
              <th>Landscape</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.movies.map(
              (movie, i) => movie && (
                <tr key={i}>
                  <td>
                    {movie.movieId}
                  </td>
                  <td>
                    {movie.name}
                  </td>
                  <td>
                    {movie.category}
                  </td>
                  <td>
                    {movie.directors}
                  </td>
                  <td>
                    {movie.writers}
                  </td>
                  <td>
                    {movie.stars}
                  </td>
                  <td>
                    {movie.portrait !== '' && <a href={movie.portrait}>Download</a>}
                  </td>
                  <td>
                    {movie.landscape !== '' && <a href={movie.landscape}>Download</a>}
                  </td>
                  <td>
                    <span
                      className='admin-delete'
                      onClick={this.handleDelete.bind(this, movie.movieId)}>
                      Delete
                    </span>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({ movies: state.movies.movies });

const mapDispatchToProps = dispatch => ({ onDelete: movieId => dispatch(deleteMovieAsync(movieId)) });

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);