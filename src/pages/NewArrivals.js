import React from "react";
import { motion } from "framer-motion";
import "./NewArrivals.css"; // Separate CSS if needed

const NewArrivals = () => {
  const newArrivals = [
    {
      id: 1,
      title: "The Silent Observer",
      author: "A. Sharma",
      image: "https://m.media-amazon.com/images/I/81eB+7+CkUL.jpg",
    },
    {
      id: 2,
      title: "Wings of Fire",
      author: "A. P. J. Abdul Kalam",
      image: "https://m.media-amazon.com/images/I/71KKZlVjbwL.jpg",
    },
    {
      id: 3,
      title: "Atomic Habits",
      author: "James Clear",
      image: "https://m.media-amazon.com/images/I/91bYsX41DVL.jpg",
    },
    {
      id: 4,
      title: "The Power of Your Subconscious Mind",
      author: "Joseph Murphy",
      image: "https://m.media-amazon.com/images/I/81N7FmJhbhL.jpg",
    },
  ];

  return (
    <section className="new-arrivals">
      <h2>New Arrivals</h2>
      <div className="book-grid">
        {newArrivals.map((book, index) => (
          <motion.div
            key={book.id}
            className="book-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <img src={book.image} alt={book.title} className="book-img" />
            <h3>{book.title}</h3>
            <p>by {book.author}</p>
            <button className="view-btn">View Details</button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
