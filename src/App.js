import React, { Fragment, useEffect, useState } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

  //Citas en local Storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if (!citasIniciales) {//si citasIniciales es null o vacio
    citasIniciales = [];
  }

  //state Arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  //use effect para realizar ciertas operaciones cuando el state cambia
  //cada vez que inicie o agregue o elimine una cita se va a ejecutar este codigo
  useEffect(() => {
    if (citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [citas]);

  //Funcion que tome las citas actuales y agregue la nueva
  const crearCita = (cita) => {
    /* console.log(cita); */
    //le paso al estate citas la cita/s del formulario
    guardarCitas([...citas, cita]);
  }

  //funcion que elimina una cita por su id
  const eliminarCita = (id) => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  };

  //Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus Citas';

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
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Cita
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>

  );
}

export default App;
