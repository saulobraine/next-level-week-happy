import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';
import '../assets/styles/components/sidebar.css';


import mapMarkerImg from '../assets/images/map-marker.svg';

export default function Sidebar() {

  const { goBack } = useHistory();

  return (
    <aside className="app-sidebar">
      <Link to="/" title="Homepage">
        <img src={mapMarkerImg} alt="Happy" />
      </Link>

      <footer>
        <button type="button" onClick={goBack}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </aside>
  );
}