import React,{useState,useEffect,useRef} from "react";
import Category from "./Category";
function CategoryInDataBase () {
	const [categories,setCategories]=useState([])
	useEffect(()=>{
		fetch("/api/products")
		.then(resultado=>resultado.json())
		.then(data=>{
				const objetoLiteralCategorias=data.data.countByType
				const arrayCategorias=[]
				for (let i=0;i<Object.keys(objetoLiteralCategorias).length;i++) {
					if (Object.keys(objetoLiteralCategorias).length-1!=i){
						arrayCategorias.push(Object.keys(objetoLiteralCategorias)[i]+": "+Object.values(objetoLiteralCategorias)[i])
					}	
				} 
				setCategories(arrayCategorias)

		})
		.catch(error=>console.log(error))
	},[])
	const panel=useRef()
	const cambiarColor=()=>{
		panel.current.classList+="bg-danger"
	}
    return (
			<div className="col-lg-6 mb-4">						
				<div className="card shadow mb-4">
					<div className="card-header py-3">
						<h5 onClick={cambiarColor}  className="m-0 font-weight-bold text-gray-800">Total de produtos por categoría</h5>
					</div>
					<div className="card-body " ref={panel}>
						<div className="row">
							{categories.map((category,indice)=>{
							return <Category key={indice} category={category}  /> 
							})}
						</div>
					</div>
				</div>
			</div>	
    )
}

export default CategoryInDataBase
