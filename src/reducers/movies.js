import alice_in_wonderland from '../assets/alice_in_wonderland.jpeg';
import zootopia from '../assets/zootopia.jpeg';
import lord_of_the_rings from '../assets/lord_of_the_rings.jpeg';
import star_wars from '../assets/star_wars.jpeg';
import titanic from '../assets/titanic.jpeg';
import transformer from '../assets/transformer.jpeg';

const INIT_MOVIES = 'INIT_MOVIES';

export default function movies (state, action) {
  if (!state) {
    state = {
      movies: [
        { movieId: 1, name: 'Alice in Wonderland', pic: alice_in_wonderland, category: 'Fantasy', directors: 'Tim Burton', writers: 'Linda Woolvertonf (screenplay), Lewis Carroll (books)', stars: 'Mia Wasikowska, Johnny Depp, Helena Bonham Carter', roomId: 2 },
        { movieId: 2, name: 'Lord of the Rings', pic: lord_of_the_rings, category: 'Fantasy', directors: 'Peter Jackson', writers: 'J.R.R. Tolkien (novel), Fran Walsh (screenplay)', stars: 'Elijah Wood, Ian McKellen, Orlando Bloom', roomId: 1 },
        { movieId: 3, name: 'Zootopia', pic: zootopia, category: 'Animation', directors: 'Byron Howard, Rich Moore', writers: 'Byron Howard (story by), Rich Moore (story by)', stars: 'Ginnifer Goodwin, Jason Bateman, Idris Elba', roomId: 3 },
        { movieId: 4, name: 'Star Wars', pic: star_wars, category: 'Sci-Fi', directors: 'J.J. Abrams', writers: 'Lawrence Kasdan, J.J. Abrams', stars: 'Daisy Ridley, John Boyega, Oscar Isaac', roomId: 2 },
        { movieId: 5, name: 'Titanic', pic: titanic, category: 'Romance', directors: 'James Cameron', writers: 'James Cameron', stars: 'Leonardo DiCaprio, Kate Winslet, Billy Zane ', roomId: 3 },
        { movieId: 6, name: 'Transformer', pic: transformer, category: 'Sci-Fi', directors: 'Michael Bay', writers: 'Art Marcum (screenplay by), Matt Holloway (screenplay by)', stars: 'Mark Wahlberg, Anthony Hopkins, Josh Duhamel', roomId: 1 }
      ]
    };
  }

  switch (action.type) {
    case INIT_MOVIES:
      // Initialize movies
      return state;
    default:
      return state;
  }
}