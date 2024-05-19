import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Slider.css';

const CONTRACT_ADDRESS = "0x99bbA657f2BbC93c02D617f8bA121cB8Fc104Acf";
const ABI = [
  {
    "inputs": [],
    "name": "getOccasions",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "moviePoster",
            "type": "string"
          }
        ],
        "internalType": "struct MovieTicket.Occasion[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const SliderNew = () => {
  const [movieCarousel, setMovieCarousel] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
        try {
          const data = await contract.getOccasions();
          setMovieCarousel(data);
        } catch (error) {
          console.error("Error fetching data from contract: ", error);
        }
      } else {
        console.error("Ethereum provider not found. Install MetaMask.");
      }
    };

    fetchMovieDetails();
  }, []);

  const navigateAfterDelay = (title) => {
    setTimeout(() => {
      const path = `/productdetail/${encodeURIComponent(title)}`;
      window.location.href = path;  // Change to actual navigation
    }, 10000);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "21%",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerPadding: "50px",
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          centerPadding: "30px",
          arrows: false,
        },
      },
    ],
  };

  const nextSlide = () => {
    sliderRef.current.slickNext();
  };

  const prevSlide = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <div className="carousel-container colorcarousel py-2 desktop-only">
      <Slider ref={sliderRef} {...settings}>
        {movieCarousel.map((movie, index) => (
          <div key={index} onClick={() => navigateAfterDelay(movie.name)}>
            <Link to={`/productdetail/${encodeURIComponent(movie.name)}`} className='movielink'>
              <img
                src={movie.moviePoster}
                className="image-slider"
                alt={movie.name}
              />
            </Link>
          </div>
        ))}
      </Slider>
      <div className="slider-buttons">
        <img src="/src/images/previous.png" alt="Previous" className="prev-button" onClick={prevSlide} />
        <img src="/src/images/next.png" alt="Next" className="next-button" onClick={nextSlide} />
      </div>
    </div>
  );
};

export default SliderNew;
