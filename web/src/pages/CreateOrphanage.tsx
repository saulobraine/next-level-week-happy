import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import Sidebar from '../components/Sidebar';
import happyMapIcon from "../utils/mapIcon";
import { FiPlus, FiX } from "react-icons/fi";

import '../assets/styles/pages/create-orphanage.css';
import api from "../services/api";

export default function CreateOrphanage() {

  const history = useHistory();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [currentUserPosition, setCurrentUserPosition] = useState({ latitude: 0, longitude: 0 });

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleMapClick = (event: LeafletMouseEvent) => {
    const { lat, lng } = event.latlng;
    setPosition({
      latitude: lat,
      longitude: lng
    })
  }

  const handleSelectImages = (event: ChangeEvent<HTMLInputElement>) => {

    if (!event.target.files) return;

    const selectedImages = Array.from(event.target.files);
    selectedImages.push(...images);
    setImages(selectedImages);

    const seletedImagesPreview = selectedImages.map((image, index) => {
      return URL.createObjectURL(image)
    });
    setPreviewImages(seletedImagesPreview);
  }

  const removeSeletedImage = (index: number) => {
    const newImages = images.filter((__, i) => i !== index);
    setImages(newImages);

    const newImagesPreview = previewImages.filter((__, i) => i !== index);
    setPreviewImages(newImagesPreview);
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const { latitude, longitude } = position;

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));

    images.forEach(image => {
      data.append('images', image);
    })

    await api.post('orphanages', data);

    history.push('/app');

  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      setCurrentUserPosition({ latitude, longitude });
    });
  });

  return (
    <div id="page-create-orphanage">

      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[currentUserPosition.latitude, currentUserPosition.longitude]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {position.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={happyMapIcon}
                  position={[
                    position.latitude,
                    position.longitude
                  ]}
                />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={event => {
                  setName(event.target.value)
                }}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea
                id="about"
                maxLength={300}
                value={about}
                onChange={event => {
                  setAbout(event.target.value)
                }} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">

                {previewImages.map((image, index) => {
                  return (
                    <div className="image-box" key={index}>
                      <img src={image} alt={name} />
                      <span className="remove-selected-image" onClick={() => {
                        removeSeletedImage(index);
                      }}>
                        <FiX color="#FF669D" size={24} />
                      </span>
                    </div>
                  )
                })}

                <label className="new-image" htmlFor="image[]">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input multiple onChange={handleSelectImages} type="file" name="" id="image[]" />

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={event => {
                  setInstructions(event.target.value)
                }}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input
                id="opening_hours"
                value={opening_hours}
                onChange={event => {
                  setOpeningHours(event.target.value)
                }}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={open_on_weekends ? "active" : ""}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>

                <button
                  type="button"
                  className={!open_on_weekends ? "active" : ""}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
