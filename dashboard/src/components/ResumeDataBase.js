import React,{useState,useEffect} from "react";
import ResumeDataBaseOnePanel from "./ResumeDataBaseOnePanel";
/* {
	colorBorde:"primary",
	titulo:"Categoría",
	cantidad:data.meta.count,
	icono:"film"
} */

function ResumeDataBase () {
	const [users,setUsers]=useState(0)
	const [products,setProducts]=useState(
		{total:1,totalCategorias:0}
	)

	useEffect(()=>{
		fetch("/api/users")
		.then(resultado=>resultado.json())
		.then(data=>
			setUsers(data.meta.count)
			
		)
	},[])
	useEffect(()=>{
		fetch("/api/products")
		.then(resultado=>resultado.json())
		.then(data=>
			setProducts({
				total:data.data.count,
				totalCategorias:data.data.countByType.totalTypes
			})
			
		)
	},[])
    return (
			<div className="row">
				<ResumeDataBaseOnePanel colorBorde="primary" titulo="Total de usuarios" cantidad={users} icono="user"/>
				<ResumeDataBaseOnePanel colorBorde="success" titulo="Total de productos" cantidad={products.total} icono="wine-bottle"/>
				<ResumeDataBaseOnePanel colorBorde="warning" titulo="Total de categorías de productos" cantidad={products.totalCategorias}/>
				<ResumeDataBaseOnePanel />
			</div>			
		

    )
}

export default ResumeDataBase
