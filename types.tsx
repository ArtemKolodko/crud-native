export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Movies: undefined;
  About: undefined;
};

export type TabMoviesParamList = {
  TabMoviesScreen: undefined;
  AddMovieScreen: undefined;
  ShowMovieScreen: { id: string };
};

export type AboutParamList = {
  AboutScreen: undefined;
};
