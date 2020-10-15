import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

import '../assets/styles/pages/landing.css';
import logoImg from '../assets/images/logo.svg';
import api from '../services/api';

const Landing: React.FC = () => {

  const [currentUserPosition, setCurrentUserPosition] = useState({ city: '', state: '' });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      api.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=pt`).then(response => {
        const { locality, principalSubdivision } = response.data;

        setCurrentUserPosition({
          city: locality,
          state: principalSubdivision
        })
      }).catch();

    });
  }, []);

  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={logoImg} alt="Logo Happy" />

        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>

        {currentUserPosition.city !== '' && (
          <div className="location">
            <strong>{currentUserPosition.city}</strong>
            <span>{currentUserPosition.state}</span>
          </div>
        )}



        <Link to="app" className="enter-app"> <FiArrowRight size={26} color="rgba(0,0,0,0.6)" /> </Link>
      </div>
    </div>
  )
}

export default Landing;