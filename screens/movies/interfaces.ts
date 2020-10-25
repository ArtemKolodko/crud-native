export interface IMovie {
    title: string;
    year: string;
}

export interface IMovieCreated extends IMovie {
    id: string;
}
