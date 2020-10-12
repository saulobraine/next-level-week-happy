import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

import '../assets/styles/pages/landing.css';
import logoImg from '../assets/images/logo.svg';

const Landing: React.FC = () => {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={logoImg} alt="Logo Happy" />

        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>

        <div className="location">
          <strong>Bocaiuva do Sul</strong>
          <span>Paraná</span>
        </div>

        <Link to="app" className="enter-app"> <FiArrowRight size={26} color="rgba(0,0,0,0.6)" /> </Link>
      </div>
    </div>
  )
}

export default Landing;