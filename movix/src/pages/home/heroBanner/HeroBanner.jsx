import React, { useEffect, useState } from 'react'
import './style.scss'
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';

const HeroBanner = () => {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const { data, loading } = useFetch('/movie/upcoming');

    useEffect(() => {
        const bg = data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg);
    }, [data])

    const searchQueryHandler = (e) => {
        if (e.key === 'Enter' && query.length > 0) {
            navigate(`/search/${query}`)
        }
    }
    return (
        <div className="heroBanner">
            <div className="wrapper">
                <div className="heroBannerContent">
                    <span className="title">Welcome.</span>
                    <span className="subTitle">Millions of movies, TV shows and peope to discover.
                        Expolore now.
                    </span>
                </div>
                <div className="searchInput">
                    <input
                        type="text"
                        placeholder='Search for a movie tv show...'
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyUp={searchQueryHandler}
                    />
                    <button>Search</button>
                </div>
            </div>
        </div>
    )
}

export default HeroBanner
