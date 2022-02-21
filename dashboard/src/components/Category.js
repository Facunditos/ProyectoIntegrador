import React from "react";
import PropTypes from "prop-types"
function Category (props) {
    return (
		<div className="col-lg-6 mb-4">
			<div className="card bg-dark text-white shadow">
				<div className="card-body">
					<p>{props.category}</p>
				</div>
				
			</div>
		</div>
						
    )
}
Category.propTypes={
	category:PropTypes.string
}
Category.defaultProps={
	category:"Sin categoría"
}

export default Category
