import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './routes/Home';
import Movies from './routes/Movies';
import Booking from './routes/Booking';
import Movie from './routes/Movie';
import About from './routes/About';
import Contact from './routes/Contact';
import Register from './routes/Register';
import Login from './routes/Login';
import Profile from './routes/Profile';
import Admin from './routes/Admin';
import { fetchMovies } from './reducers/movies';

class CinemaApp extends Component {
  componentDidMount () {
    this.props.initMovies();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header loginStatus={this.props.loginStatus} />

          <Route exact path='/' component={Home} />
          <Route exact path='/movies' component={Movies} />
          <Route path='/booking/:movieId/:roomId' component={Booking} />
          <Route path='/movie/:movieId/:roomId' component={Movie}/>
          <Route exact path='/about' component={About} />
          <Route exact path='/contact' component={Contact} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/profile' component={Profile}/>
          <Route exact path='/admin' component={Admin}/>

          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({ loginStatus: state.user });

const mapDispatchToProps = dispatch => ({ initMovies: () => dispatch(fetchMovies()) });

export default connect(mapStateToProps, mapDispatchToProps)(CinemaApp);