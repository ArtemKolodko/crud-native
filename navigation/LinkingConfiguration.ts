import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TabMovies: {
            screens: {
              TabMoviesScreen: 'movies',
              screens: {
                AddMovieScreen: 'add',
                ShowMovieScreen: 'show'
              }
            },
          },
          TabOne: {
            screens: {
              TabOneScreen: 'one',
            },
          }
        },
      },
      NotFound: '*',
    },
  },
};
