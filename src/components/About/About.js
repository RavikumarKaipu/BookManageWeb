import React from 'react';
import { useNavigate } from 'react-router-dom';
import './About.css'

const About = () => {
  const navigate=useNavigate()
  return (
    <div className="about">
      <h2>About Us</h2>
      <p>
        We are a team of passionate book enthusiasts building a platform that allows users to easily
        browse, manage, and share their favorite books. Our mission is to provide the best book
        recommendations and make it easier for people to discover great reads.
      </p>
      <p>
        Whether you're looking for fiction, non-fiction, or educational materials, our platform has
        it all. We aim to create a community where readers can come together to discuss and explore
        new titles.
      </p>
      <p>
        If you have any questions or feedback, feel free to reach out to us through our contact page.
      </p>
      <button onClick={() => navigate('/',{replace:true})}>Back to Home</button>
    </div>
  );
};

export default About;
