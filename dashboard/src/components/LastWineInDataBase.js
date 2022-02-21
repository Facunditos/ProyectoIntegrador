import React,{useState,useEffect} from "react";
import LastWine from "./LastWine";
function LastWineInDataBase () {
    const [lastWine,setLastWine]=useState({})
	useEffect(()=>{
		fetch("/api/products")
		.then(resultado=>resultado.json())
		.then(data=>{
			const indiceLastWine=data.data.productsList[data.data.productsList.length-1].id
			fetch(`/api/products/${indiceLastWine}`)
			.then(resultado=>resultado.json())
			.then(data=>{	
				setLastWine(data.data)
			})
		})
		.catch(error=>console.log(error))
	},[])
	
	return (
			<div className="col-lg-6 mb-4">
				<div className="card shadow mb-4">
					<div className="card-header py-3">
						<h5 className="m-0 font-weight-bold text-gray-800">Último vino creado</h5>
					</div>
					<LastWine {...lastWine}  />
				</div>
			</div>
    )
}

export default LastWineInDataBase
