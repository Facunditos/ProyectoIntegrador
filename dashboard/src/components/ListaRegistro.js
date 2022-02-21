import React from "react";
import PropTypes from "prop-types"

function ListaRegistro (props){
    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.name}</td>
            <td>{props.type}</td>
        </tr>
    )
}

ListaRegistro.propTypes={
	id:PropTypes.number,
	name:PropTypes.string,
	type:PropTypes.string
}
ListaRegistro.defaultProps={
	id:"sin id",
	name:"sin nombre",
	type:"sin categoría"
}

export default ListaRegistro