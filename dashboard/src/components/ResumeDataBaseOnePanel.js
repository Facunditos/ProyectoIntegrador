import React from "react";
import image from '../assets/images/user.svg'
import PropTypes from "prop-types"

function ResumeDataBaseOnePanel (props) {
    return (
		<div className="col-md-4 mb-4">
			<div className={`card border-left-${props.colorBorde} shadow h-100 py-2`}>
				<div className="card-body">
					<div className="row no-gutters align-items-center">
						<div className="col mr-2">
							<div className="text-xs font-weight-bold text-primary text-uppercase mb-1">{props.titulo}</div>
							<div className="h5 mb-0 font-weight-bold text-gray-800">{props.cantidad}</div>
						</div>
						<div className="col-auto">
							<i className={`fas fa-${props.icono} fa-2x text-gray-300`}></i>
						</div>
					</div>
				</div>
			</div>
		</div>
    )
}

ResumeDataBaseOnePanel.propTypes={
	colorBorde:PropTypes.string,
	titulo:PropTypes.string,
	cantidad:PropTypes.number,
	icono:PropTypes.string
}
ResumeDataBaseOnePanel.defaultProps={
	colorBorde:"primary",
	titulo:"panel en construccción",
	cantidad:20,
	icono:"money-bill-alt"
}
export default ResumeDataBaseOnePanel
