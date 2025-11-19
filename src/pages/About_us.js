import './About_us.css';

export default function AboutUs() {
  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <div className="about-us-text">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="mb-4">
            Welcome to <strong className="brand-name">ExamFobia</strong>! We specialize in providing comprehensive information on PGDCA course books.  
            Our platform helps students explore the books we sell, view detailed indexes, and access previous year question papers.
          </p>
          <p className="mb-4">
            This website is designed purely as a reference and guide for PGDCA students.  
            We focus on offline availability, ensuring that you know exactly which books are available and how to access them.
          </p>
          <p>
            Whether you are preparing for exams or planning your semester reading, ExamFobia makes it easy to find the right PGDCA course books and study materials.
          </p>
        </div>
      </div>
    </div>
  );
}