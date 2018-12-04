const INIT_SLIDES = 'INIT_SLIDES';

export default function slides (state, action) {
  if (!state) {
    state = {
      slides: []
    };
  }

  switch (action.type) {
    case INIT_SLIDES:
      // Initialize slides
      return { slides: action.slides };
    default:
      return state;
  }
}

export const initSlides = (slides) => {
  return { type: INIT_SLIDES, slides };
};