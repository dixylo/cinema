import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteMovieAsync } from '../reducers/movies';
// import PropTypes from 'prop-types';

class MovieList extends Component {
  static defaultProps = {
    // movieName: '',
    // roomId: '1',
    // room: {
    //   id: '1',
    //   rows: []
    // },
    // date: '',
    // time: ''
  }

  static propTypes = {
    // movieName: PropTypes.string,
    // roomId: PropTypes.string,
    // room: PropTypes.object,
    // date: PropTypes.string,
    // time: PropTypes.string,
    // onConfirm: PropTypes.func
  }

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

  handleSubmit () {
    
  }

  handleDelete (movieId) {
    if (this.props.onDelete) {
      this.props.onDelete(movieId);
    }
  }

  render () {
    return (
      <div>
        {/* <form>
          <input
            type="text"
            name="name"
            placeholder="Movie Name"
            className='user-panel-control'
            value={this.state.name}
            onChange={this.handleFormChange.bind(this)}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            className='user-panel-control'
            value={this.state.category}
            onChange={this.handleFormChange.bind(this)}
          />
          <input
            type="text"
            name="directors"
            placeholder="Director(s)"
            className='user-panel-control'
            value={this.state.directors}
            onChange={this.handleFormChange.bind(this)}
          />
          <input
            type="text"
            name="writers"
            placeholder="Writer(s)"
            className='user-panel-control'
            value={this.state.writers}
            onChange={this.handleFormChange.bind(this)}
          />
          <input
            type="text"
            name="stars"
            placeholder="Stars"
            className='user-panel-control'
            value={this.state.stars}
            onChange={this.handleFormChange.bind(this)}
          />
          <input
            type="file"
            name="portrait"
            placeholder="Portrait"
            className='user-panel-control'
            value={this.state.portrait}
            onChange={this.handleFormChange.bind(this)}
          />
          <input
            type="file"
            name="landscape"
            placeholder="Landscape"
            className='user-panel-control'
            value={this.state.landscape}
            onChange={this.handleFormChange.bind(this)}
          />
          <button
            type='button'
            className='user-panel-control'
            onClick={this.handleSubmit.bind(this)}
          >
            Create
          </button>
        </form> */}
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

const mapStateToProps = (state) => {
  return {
    movies: state.movies.movies
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDelete: (movieId) => {
      dispatch(deleteMovieAsync(movieId));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);