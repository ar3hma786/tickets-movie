import React, { useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './MoviesList.css';
import { Link } from 'react-router-dom';

function MoviesList(props) {
    const [movies] = useState([
        {
            title: 'Kung Fu Panda 4',
            category: 'Action/Adventure/Animation/ Comedy',
            image: <img src="/src/images/movieposter1.png" alt="Kung Fu Panda 4" className='product--image images' />
        },
        {
            title: 'Aadujeevitham - The Goat Life',
            category: 'Adenture/Drama',
            image: <img src="/src/images/movieposter2.png" alt="Aadujeevitham - The Goat Life" className='product--image images' />
        },
        {
            title: 'Swatantrya Veer Savarkar',
            category: 'Biography/Drama',
            image: <img src="/src/images/movieposter3.png" alt="Swatantrya Veer Savarkar" className='product--image images' />
        },
        {
            title: 'Tillu Square',
            category: 'Action/Comedy/Romantic',
            image: <img src="/src/images/movieposter4.png" alt="Till Square" className='product--image images' />
        },
        {
            title: 'Crew',
            category: 'Comedy/Thriller',
            image: <img src="/src/images/movieposter5.png" alt="Crew" className='product--image images' />
        },
        {
            title: 'Godzilla x Kong: The New Empire',
            category: 'Action/Sci-Fi/Thriller',
            image: <img src="/src/images/movieposter6.png" alt="Godzilla x Kong: The New Empire" className='product--image images' />
        },
        {
            title: 'Shaitaan',
            category: 'Supernatural/Thriller',
            image: <img src="/src/images/movieposter7.png" alt="Shaitaan" className='product--image images' />
        },
        {
            title: 'Manjummel Boys',
            category: 'Adventure/Drama/Thriller',
            image: <img src="/src/images/movieposter8.png" alt="Manjummel Boys" className='product--image images' />
        },
        {
            title: 'Chow Chow Bath',
            category: 'Comedy/Romantic',
            image: <img src="/src/images/movieposter9.png" alt="Chow Chow Bath" className='product--image images' />
        },
        {
            title: 'Yuva',
            category: 'Action/Drama',
            image: <img src="/src/images/movieposter10.png" alt="Yuva" className='product--image images' />
        }
    ]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4, // Number of movies to show at once
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <center>
            <div className='movieslist'>
                <h3 className='m-4'>Recommended Movies</h3>
                <Slider {...settings}>
                    {movies.map((movie, index) => (
                        <div key={index} className='me-3'>
                            <Link to={`/productdetail/${movie.title}`} className='movielink'>
                                {movie.image}
                            </Link>
                            <div className='movie-info'>
                                <h5 className='mt-2 px-2 titlecolor'>{movie.title}</h5>
                                <p className="moviecategory px-2 cateogrycolor">{movie.category}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </center>
    );
}

export default MoviesList;
