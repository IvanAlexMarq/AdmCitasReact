import React, { Fragment, useState } from 'react';
import uuid from 'uuid/dist/v4'; //instalamos esta libreria externa con npm i uuid
import PropTypes from 'prop-types'; //documenta los componentes

const Formulario = ({ crearCita }) => {
    //Crear State de Citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    //segundo state
    const [error, actualizarError] = useState(false);

    //funcion que se ejecuta cada vez que el usuario escribe en un input
    const actualizarState = (e) => {
        actualizarCita({//agregamos los valores del input a cita
            ...cita,
            [e.target.name]: e.target.value
        });
    }
    //extraer los valores
    const { mascota, propietario, fecha, hora, sintomas } = cita;

    //Cuando el usuario presiona agrear cita
    const submitCita = (e) => {
        e.preventDefault();
        console.log('enviando cita');

        //validar
        if (mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '') {
            actualizarError(true);
            return;
        }
        //Eliminar el mensaje error previo
        actualizarError(false);
        //Asignar un ID
        cita.id = uuid();//metodo que genera una id  diferente cada vez
        //Crear la cita
        crearCita(cita);
        //Reiniciar el form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        });

    };

    return (
        <Fragment>
            <h2>Crear Cita</h2>
            {error ? <p className="alerta-error">Todos los campos son obligatorios</p>
                : null}
            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}//es lo mismo a 'change' de js
                    value={mascota}
                />
                <label>Nombre Dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Dueño de la Mascota"
                    onChange={actualizarState}
                    value={propietario}
                />
                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />
                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />
                <label>Síntomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>
                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>
            </form>
        </Fragment >
    );
}
Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired //lista los props que le estan pasando desde app
}
export default Formulario;