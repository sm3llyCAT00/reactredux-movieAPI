import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from '../../common/apis/movieApi'
import { APIKey } from '../../common/apis/movieApiKey'

export const fetchAsyncMovies = createAsyncThunk(
    'movies/fetchAsyncMovies', 
    async () => {
        const movieText = "Batman";
        const response = await movieApi.get(
            `?apikey=${APIKey}&s=${movieText}&type=movie`
        );
        return response.data;
    }
);

export const fetchAsyncShows = createAsyncThunk(
    'movies/fetchAsyncShows', 
    async () => {
        const seriesText = "Friends";
        const response = await movieApi.get(
            `?apikey=${APIKey}&s=${seriesText}&type=series`
        );
        return response.data;
    }
);

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
    'movies/fetchAsyncMovieOrShowDetail', 
    async (id) => {
        const response = await movieApi.get(
            `?apikey=${APIKey}&i=${id}&Plot=full`
        );
        return response.data;
    }
);

const initialState = {
    movies: {},
    shows: {},
    selectMovieOrShow: {},
}

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        addMovies: (state, { payload }) => {
            state.movies = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAsyncMovies.pending, (state) => {
                console.log("Pending");
            })
            .addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
                console.log("Fetched Movies Successfully!");
                state.movies = payload;
            })
            .addCase(fetchAsyncMovies.rejected, (state) => {
                console.log("Rejected!");
            })
            .addCase(fetchAsyncShows.fulfilled, (state, { payload }) => {
                console.log("Fetched Shows Successfully!");
                state.shows = payload;
            })
            .addCase(fetchAsyncMovieOrShowDetail.fulfilled, (state, { payload }) => {
                console.log("Fetched MovieOrShow Successfully!");
                state.selectMovieOrShow = payload;
            });
    }
})

export const { addMovies } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selectMovieOrShow;
export default movieSlice.reducer;
