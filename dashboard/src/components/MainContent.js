import React from "react";
import ResumeDataBase from "./ResumeDataBase";
import LastWineInDataBase from "./LastWineInDataBase";
import CategoryInDataBase from "./CategoryInDataBase";
import Lista from "./Lista";
function MainContent () {
    return (
		<div className="container-fluid">
				<div className="d-sm-flex align-items-center justify-content-between mb-4">
					<h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
				</div>
				<ResumeDataBase/>
				<div className="row">
					<LastWineInDataBase/>
					<CategoryInDataBase/>
					<Lista/>
				</div>
		</div>
    )
}

export default MainContent
