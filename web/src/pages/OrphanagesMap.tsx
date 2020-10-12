import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import mapMarkerImg from '../assets/images/map-marker.svg';

import '../assets/styles/pages/orphanages-map.css';

const OrphanagesMap: React.FC = () => {
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Logo Happy" />
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>
        <footer>
          <strong>Bocaiuva do Sul</strong>
          <span>Paraná</span>
        </footer>
      </aside>

      <Map
        center={[-25.2112642, -49.1120413]}
        zoom={15}
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
      </Map>

      <div>
        <Link to="" className="create-orphanage">
          <FiPlus size={32} color="white" />
        </Link>
      </div>

    </div>
  );
}

export default OrphanagesMap;