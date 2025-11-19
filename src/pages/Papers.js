import React from "react";
import "./Papers.css";
import { motion } from "framer-motion";

const Papers = () => {
  const papers = [
    {
      id: 1,
      subject: "Mathematics",
      year: "2023",
      link: "#",
    },
    {
      id: 2,
      subject: "Physics",
      year: "2023",
      link: "#",
    },
    {
      id: 3,
      subject: "Chemistry",
      year: "2022",
      link: "#",
    },
    {
      id: 4,
      subject: "Computer Science",
      year: "2022",
      link: "https://drive.google.com/file/d/1ODZCFz8o0L_TjhArJDRCgUxP5wmULZF-/view?usp=drive_link",
    },
  ];

  return (
    <div className="papers-container">
      <section className="papers-hero">
        <h1>Previous Year Question Papers</h1>
        <p>Download and practice from our collection of past papers.</p>
      </section>

      <section className="papers-grid">
        {papers.map((paper, index) => (
          <motion.div
            key={paper.id}
            className="paper-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <h3>{paper.subject}</h3>
            <p>{paper.year}</p>
            <a href={paper.link} className="download-btn">
              Download PDF
            </a>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default Papers;
