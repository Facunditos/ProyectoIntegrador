import React,{useState,useEffect,useRef} from "react";
import ListaRegistro from "./ListaRegistro";

function Lista (){
    const [productos,setProductos]=useState([])
    useEffect(()=>{
        fetch("/api/products")
        .then(resultado=>resultado.json())
        .then(data=>{
            let productos=data.data.productsList
            setProductos(productos)
        })
    },[])
    let mensaje
    if (productos.length==0) {
        mensaje="Pronto veremos el listado de productos"
    }
    return (
        <div>
        {/*<!-- PRODUCTS LIST -->*/}
        <h1 className="h3 mb-2 text-gray-800">Listado de productos</h1>
        
        {/*<!-- DataTales Example -->*/}
        <div className="card shadow mb-4">
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Categoría</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Id</th>
                                <th>Titulo</th>
                                <th>Calificación</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            {productos.map((producto,indice)=>{
                                return <ListaRegistro key={indice} id={producto.id} name={producto.name} type={producto.type} />
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>            
</div>
    )
}

export default Lista