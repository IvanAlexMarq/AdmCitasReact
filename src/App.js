import React, { Fragment, useState } from 'react';
import Formulario from './components/Formulario';

function App() {

  //state Arreglo de citas
  const [citas, guardarCitas] = useState([]);

  //Funcion que tome las citas actuales y agregue la nueva
  const crearCita = (cita) => {
    /* console.log(cita); */
    //le paso al estate citas la cita/s del formulario
    guardarCitas([...citas, cita]);

  }
  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      {/* las clases son del framework skeleton es como bootstrap */}
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
              crearCita={crearCita}
            /></div>
          <div className="one-half column">2</div>
        </div>
      </div>
    </Fragment>

  );
}

export default App;
