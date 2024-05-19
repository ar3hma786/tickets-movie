import React from 'react';

function Footer() {
    return (
        <div className="footer-container">
            <div className="footer-content text-center bg-dark text-light">
                <div className="footer-bottom text-center bg-dark text-light">
                    <small>&copy; {new Date().getFullYear()} Mooking, Inc. All rights reserved.</small>
                </div>
            </div>
        </div>
    );
}

export default Footer;