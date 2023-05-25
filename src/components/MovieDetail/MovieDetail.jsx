import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';   
import { fetchAsyncMovieOrShowDetail, getSelectedMovieOrShow } from '../../features/movies/movieSlice';

const MovieDetail = () => {
    const { imdbID } = useParams();
    const dispatch = useDispatch();
    const data = useSelector(getSelectedMovieOrShow);
    console.log(data);
    useEffect(() => {
        dispatch(fetchAsyncMovieOrShowDetail(imdbID))
    }, [dispatch, imdbID]);

    return (
        <div>
            MovieDetail
        </div>
    );
};

export default MovieDetail;