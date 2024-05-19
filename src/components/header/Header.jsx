import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './Header.css';

function Header() {
    const [walletConnected, setWalletConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setWalletAddress(accounts[0]);
                setWalletConnected(true);
                console.log("Wallet connected: ", accounts[0]);
            } catch (error) {
                console.error("User denied wallet connection: ", error);
            }
        } else {
            console.error("Ethereum provider not found. Install MetaMask.");
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-md-5 pb-md-5">
            <div className="container-fluid px-4">
                <a className="navbar-brand" href="#">TicketTrekker</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="d-flex align-items-center flex-grow-1 justify-content-center justify-content-md-end">
                        <form className="d-flex align-items-center mt-2 mt-md-0 me-md-3">
                            <input className="form-control me-2 searchinput" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-sm btn-outline-light searchbutton" type="submit">
                                <img src="/src/images/search.png" alt="Search" className='searchimage' />
                            </button>
                        </form>
                        <div className="d-flex flex-column flex-md-row align-items-md-center mt-2 mt-md-0">
                            {/* Visible on mobile */}
                            <div className="d-md-none ">
                                <button type="button" className="btn btn-sm btn-outline-light mb-2">Login</button>
                                <button type="button" className="btn btn-sm btn-light">Sign In</button>
                            </div>
                            {/* Visible on medium and larger screens */}
                            <div className="d-none d-md-flex loginsignin">
                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-light me-md-2 loginsignin"
                                    onClick={connectWallet}
                                >
                                    {walletConnected ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;
