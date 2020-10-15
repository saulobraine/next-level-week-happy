import React, { useEffect, useState } from 'react';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import api from '../services/api';

import happyMapIcon from '../utils/mapIcon';
import mapMarkerImg from '../assets/images/map-marker.svg';

import '../assets/styles/pages/orphanages-map.css';

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: number;
}

const OrphanagesMap: React.FC = () => {

  const [currentUserPosition, setCurrentUserPosition] = useState({ latitude: 0, longitude: 0, city: '', state: '' });


  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {

    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    });

  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      api.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=pt`).then(response => {
        const { locality, principalSubdivision } = response.data;

        setCurrentUserPosition({
          latitude,
          longitude,
          city: locality,
          state: principalSubdivision
        })
      }).catch();

    });
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <Link to="/">
            <img src={mapMarkerImg} alt="Logo Happy" />
          </Link>
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>
        {currentUserPosition.city !== '' && (
          <footer>
            <strong>{currentUserPosition.city}</strong>
            <span>{currentUserPosition.state}</span>
          </footer>
        )}

      </aside>

      <Map
        center={[currentUserPosition.latitude, currentUserPosition.longitude]}
        zoom={15}
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

        {orphanages.map(orphanage => {
          return (
            <Marker
              key={orphanage.id}
              icon={happyMapIcon}
              position={[orphanage.latitude, orphanage.longitude]}
            >
              <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                {orphanage.name}
                <Link to={`orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color="white" />
                </Link>
              </Popup>
            </Marker>
          )
        })}

      </Map>

      <div>
        <Link to="orphanages/create" className="create-orphanage">
          <FiPlus size={32} color="white" />
        </Link>
      </div>

    </div>
  );
}

export default OrphanagesMap;