import { load_slides } from '../services/api';

const INIT_SLIDES = 'INIT_SLIDES';

export default function slides (state, action) {
  if (!state) {
    state = {
      slides: []
    };
  }

  switch (action.type) {
    case INIT_SLIDES:
      return { slides: action.slides };
    default:
      return state;
  }
}

export const initSlides = slides => {
  return { type: INIT_SLIDES, slides };
};

export const fetchSlides = () => {
  return dispatch => {
    return load_slides()
    .then(response => response.json())
    .then(slides => dispatch(initSlides(slides)));
  }
}