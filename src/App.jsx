// App.js
import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MoviesList from './components/movieslist/MoviesList';
import MovieProduct from './components/MovieProduct/MovieProduct';
import SliderNew from './components/slider/SliderNew';

function HomePage() {
  return (
    <>
      <SliderNew />
      <MoviesList />
    </>
  );
}

function App() {
  useEffect(() => {
    const requestAccounts = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          console.log("Ethereum account requested successfully");
        } catch (error) {
          console.error("User denied account access");
        }
      } else {
        console.error("Ethereum provider not found");
      }
    };

    requestAccounts();
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/productdetail/:title" element={<MovieProduct />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
