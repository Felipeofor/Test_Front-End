import React from "react";
import '../../Styles/Banner.css';
import banner from '../../assets/img/banner.png';

function Banner() {
  return (
    <section className="banner">
      <img className="banner-img" src={ banner } alt="banner" />
      <img className="banner-img-mobil" src="https://www.rematesvargas.cl/img_gallery/slider/fef5493282e67f6.jpg" alt="banner" />
      <div className="banner-title">
        <p className="title">¡Hola! ¿Qué es lo que buscas?</p>
        <p className="subtitle">Crear o migrar tu comercio electrónico?</p>
      </div>
    </section>
  );
}

export default Banner;