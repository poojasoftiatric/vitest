import React from 'react';
import '../styles/footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="footer">
            <div className="footer-bottom">
                &copy; {currentYear} BOICHON HAOKIP| COPY RIGHT
            </div>
        </footer>
    );
};

export default Footer;
