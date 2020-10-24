export interface IMovie {
    title: string;
    author: string;
    year: string;
}

export interface IMovieCreated extends IMovie {
    id: string;
}
