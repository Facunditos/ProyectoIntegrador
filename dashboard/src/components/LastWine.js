import React from "react";
import Imagen from "../assets/images/Les-Astronautes-Pino-Pinot.png"

function LastWine (props) {
	let label
	let winemaker
	if (props.winemakers && props.winemakers.length>1) {
		label="Enólogos: "
		winemaker= props.winemakers.join(" | ")
	} else {
		label="Enólogo: "
		winemaker= props.winemakers
	}
	return (
		<div className="card-body">
			<p><strong>Nombre: </strong>{props.name}</p>
			<div className="text-center">
				<img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={Imagen} alt=" Star Wars - Mandalorian "/>
			</div>
			<p><strong>Descripción: </strong>{props.description}</p>
			<p><strong>{label}</strong>{winemaker}</p>
			<p><strong>Precio: </strong>$ {props.price}</p>
		</div>
    )
}

export default LastWine
