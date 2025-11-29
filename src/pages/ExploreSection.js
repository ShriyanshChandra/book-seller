import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ExploreSection.css';

const ExploreSection = () => {
    const books = [
        {
            id: 1,
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            image: "https://m.media-amazon.com/images/I/81af+MCATTL.jpg",
        },
        {
            id: 2,
            title: "Atomic Habits",
            author: "James Clear",
            image: "https://m.media-amazon.com/images/I/91bYsX41DVL.jpg",
        },
        {
            id: 3,
            title: "Sapiens",
            author: "Yuval Noah Harari",
            image: "https://m.media-amazon.com/images/I/713jIoMO3UL.jpg",
        },
        {
            id: 4,
            title: "Rich Dad Poor Dad",
            author: "Robert T. Kiyosaki",
            image: "https://m.media-amazon.com/images/I/81bsw6fnUiL.jpg",
        },
        {
            id: 5,
            title: "Ikigai",
            author: "Héctor García",
            image: "https://m.media-amazon.com/images/I/81l3rZK4lnL.jpg",
        },
        {
            id: 6,
            title: "The Psychology of Money",
            author: "Morgan Housel",
            image: "https://m.media-amazon.com/images/I/71aG+xDKSYL.jpg",
        },
        {
            id: 7,
            title: "The Alchemist",
            author: "Paulo Coelho",
            image: "https://m.media-amazon.com/images/I/71aFt4+OTOL.jpg",
        },
        {
            id: 8,
            title: "Deep Work",
            author: "Cal Newport",
            image: "https://m.media-amazon.com/images/I/81xXAyf5TLL.jpg",
        }
    ];

    return (
        <section className="explore-section">
            <h2>Explore Books</h2>
            <div className="explore-grid">
                {books.map((book, index) => (
                    <motion.div
                        key={book.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        viewport={{ once: true }}
                        className="explore-book-card-wrapper"
                    >
                        <div className="explore-book-card">
                            <img src={book.image} alt={book.title} className="explore-book-img" />
                            <div className="explore-book-info">
                                <h3>{book.title}</h3>
                                <p>{book.author}</p>
                                <Link to="/books" className="explore-view-btn">View Details</Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            <div className="explore-footer">
                <Link to="/books" className="view-all-btn">View All Books</Link>
            </div>
        </section>
    );
};

export default ExploreSection;
