import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css';

function TeacherItem() {
  return (
<article className="teacher-item">
          <header>
            <img src="https://avatars3.githubusercontent.com/u/52297529?s=460&u=76ae5c163e16603cec3ed51e76b22ac9fcb34b77&v=4" alt="Johan back"/>
            <div>
              <strong>Johan Back</strong>
              <span>Química</span>
            </div>
          </header>
          <p>
          Percebemos, cada vez mais, que o fenômeno da Internet possibilita uma 
          smelhor visão global de alternativas às soluções ortodoxas.
          </p>
          <footer>
            <p>
              Preço/Hora
              <strong>R$20,00</strong>
            </p>
            <button type="button">
              <img src={whatsappIcon} alt="WhatsApp"/>
              Entrar em contato
            </button>
          </footer>
        </article>
  )
};

export default TeacherItem;