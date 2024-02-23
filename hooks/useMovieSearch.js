import { useState } from 'react';
import axios from 'axios';

const useMovieSearch = (apiKey) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const search = async (query) => {
        if (!query.trim()) {
            setError("The search query cannot be empty.");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;
            const response = await axios.get(url);
            setData(response.data.results);
        } catch (err) {
            setError('Unable to fetch data');
        } finally {
            setLoading(false);
        }
    };

    return { search, data, error, loading };
};

export { useMovieSearch };
