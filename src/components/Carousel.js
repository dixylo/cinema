import React, { Component } from 'react';
import './Carousel.css';

const Slide = ({ slide, style }) => {
  return (
    <div className="slides fade" style={style}>
      <img alt={slide.name} src={slide.url} />
    </div>
  );
};

const Arrow = ({ direction, onClick }) => (
  <div
    className={`slide-arrow ${direction}`}
    onClick={() => { onClick(direction); }}
  >
    {direction === 'left' ? <span>&#10094;</span> : <span>&#10095;</span>}
  </div>
);

const Indicator = ({ number, currentIndex, onClick }) => (
  <div style={{ textAlign:'center' }}>{
    Array.from(Array(number).keys()).map((index) =>
      <span key={index} className={`dot ${index === currentIndex ? 'active' : ''}`} onClick={() => { onClick(index); }}></span>
    )}    
  </div>
);

export default class Carousel extends Component {
  constructor () {
    super();
    this.state = {
      currentIndex: 0
    };
  }

  componentDidMount () {
    this.timer = setInterval(() => { this.toNeighborSlide(); }, 2000);
  }

  componentWillUnmount () {
    clearInterval(this.timer);
  }
  
  toNeighborSlide = (direction) => {
    let currentIndex = this.state.currentIndex;
    currentIndex += direction === 'left' ? -1 : 1;
    const numberOfSlides = this.props.slides.length;
    if (currentIndex > numberOfSlides - 1) { currentIndex = 0 }
    if (currentIndex < 0) { currentIndex = numberOfSlides - 1 }
    this.setState({ currentIndex });
  }

  toParticularSlide = (currentIndex) => {
    this.setState({ currentIndex });
  }

  render () {
    const slides = this.props.slides;
    const currentIndex = this.state.currentIndex;
    return (
      <div className="carousel">        
        {slides.map((slide, index) => {
          let display = index === currentIndex ? "block" : "none";
          return (<Slide key={index} slide={slide} style={{ display }}/>);
        })}
        <Arrow
          direction="left"
          onClick={this.toNeighborSlide}
        />
        <Arrow
          direction="right"
          onClick={this.toNeighborSlide}
        />
        <Indicator number={slides.length} currentIndex={currentIndex} onClick={this.toParticularSlide}/>
      </div>
    );
  }
}