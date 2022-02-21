const path = require("path");
const fs = require("fs");
const productsImagePath = path.join(__dirname, "../../public/img/product-img")
const db = require("../database/models/index.js");
const { validationResult } = require("express-validator");
const Op = db.Sequelize.Op;
const { resolveSoa } = require("dns");


/**estas tres lineas de arriba las copie, igual ver lo que tengo qe corregir en este progrma */


const productsController = {


  /*** SHOP ***/

  // Root - List the products

  list: (req, res) => {
    db.Product.findAll(
      {
        include: [
          { association: "product_image" }
        ]
      })
      .then((products) => {
        const productsAMostrar = products;
        // Recibe el listado de productos   
        res.render("./products/shop", { productsAMostrar }); // Lista todos los productos
      })
      .catch((error) => {
        console.log(error);
        res.send(500);
      });
  },

  search: (req, res) => {
    let wordSearch = req.query.search
    db.Product.findAll({
      where: {
        name: { [Op.like]: "%" + wordSearch + "%" }
      },
      include: [
        { association: "product_image" }
      ],

    })
      .then((products) => {
        console.log(products)
        res.render("./products/shop", { productsAMostrar: products })
      })
      .catch((error) => {
        console.log(error);
        res.send(500);
      });
  },


  /*** CREAR UN PRODUCTO ***/

  // CREATE - Form to create
  create: (req, res) => {
    const validation = validationResult(req)
    console.log(validation)
    if (req.method == "GET") {         // Si el metodo es GET muestra el formulario
      // se requieren las tablas secundarias necesarias para crear un producto 
      const producerPromise = db.Producer.findAll()
      const varietalPromise = db.Varietal.findAll()
      const typePromise = db.Type.findAll()
      const winemakerPromise = db.Winemaker.findAll()
      Promise.all([producerPromise, varietalPromise, typePromise, winemakerPromise])
        .then(resultados => {
          producer = resultados[0]
          varietals = resultados[1]
          types = resultados[2]
          winemakers = resultados[3]
          res.render("./products/create", { producer: producer, varietals, types, winemakers });
        })
        .catch(error => console.log(error))


      } else if (!validation.isEmpty()) { //Si el formulario de creación del producto tiene errores los mismos son informados
       
        const errors = validation.mapped()
        const oldData = req.body
        return res.render("products/create", { errors, oldData })


    
   } else  { // Si el método es POST crea un producto

      db.Product.create(req.body)
        .then(productoCreado => {
          console.log("--------creación---")
          console.log(productoCreado);
          //funcionalidad para crear un registro en la tabla intermedia winemaker_product
          const arrayIdWinemakers = req.body.winemaker_id//almaceno en una variable el array que contiene el/los id del/los winemaker/s elegidos en el formulario
          const arrayIdWinemakersValidos = arrayIdWinemakers.filter(winemaker_id => winemaker_id != "")//Si el producto creado no tiene un segundo enólogo, el segundo elemento del array anterior es un string vacío, por lo tanto, aplico un filtro para limpiarlo 
          productoCreado.setWinemaker(arrayIdWinemakersValidos) //al método set le pasamos el array que cumple con la condición de no tener elementos que sean un string vacío

          const product_id = productoCreado.id;
          db.Image.create({
            file_name: req.file.filename,
            product_id: product_id
          })
            .then()
            .catch(error => console.log(error));
          res.redirect("/");
        })
        .catch(error => console.log(error))

    }


  },

  /*** MUESTRA EL DETALLE DE UN PRODUCTO ***/

  // DETAIL - Detail from one product
  detail: (req, res) => {

    let id = Number(req.params.id);
    db.Product.findByPk(id,{ include: ['product_type', 'Winemaker', "product_image", "product_producer"]} )
        .then((product)=>{
            res.render('products/productDetail', {product}); 
        })
        .catch(error=>{
          console.log(error)
          res.status(404).send('Página no encontrada - Vista error 404 pendiente de construir')
        })
      },

  /*** MUESTRA EL FORMULARIO DE EDICION ***/

  // EDIT - Form to edit
  edit: (req, res) => {
    // se requieren las tablas secundarias necesarias para editar un producto
    const producerPromise = db.Producer.findAll()
    const varietalPromise = db.Varietal.findAll()
    const typePromise = db.Type.findAll()
    const winemakerPromise = db.Winemaker.findAll()
    // se consume la asociación del modelo Product con otros modelos para mostrar las propiedades particualres del producto a editar
    const productPromise = db.Product.findByPk(req.params.id, {
      include: [{ association: "product_producer" }, { association: "product_varietal" }, { association: "product_type" }, { association: "Winemaker" }, { association: "product_image" }]
    })
    Promise.all([producerPromise, varietalPromise, typePromise, winemakerPromise, productPromise])
      .then(resultados => {
        producers = resultados[0]
        varietals = resultados[1]
        types = resultados[2]
        winemakers = resultados[3]
        product = resultados[4]
        res.render("./products/edit", { producers, varietals, types, winemakers, product });
      })
      .catch(error => console.log(error))
  },


  /*** EDITA Y REESCRIBE EL PRODUCTO ***/

  // UPDATE - Update new product
  update: (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty())  {
        // asi lo hacen en los dos videos de PG
        res.render("products/edit", { errors: errors.array(), oldData: req.body });
       
    } else {
    // En caso de corresponder: primero actualizo la tabla Product; segundo actualizo la tabla Image; y por último, actualizo la tabla winemaker_product  
    db.Product.update(req.body, {
      where: {
        id: req.params.id
      }
    })
      .then(resultados => {
        //si al editar se subió una imagen, corresponde reemplazar la imagen vieja por la nueva
        if (req.file) {
          db.Image.findOne({// esta búsqueda se realiza únicamente para obtener el nombre del archivo que contiene la imagen vieja
            where: { product_id: req.params.id }
          })
            .then(resultado => {
              const imagenVieja = resultado.file_name
              fs.rmSync(path.resolve(productsImagePath, imagenVieja)) //borro en la carpeta public el archivo que contine la imagen vieja del producto
            })
            .catch(error => console.log(error))
          // en la tabla Image registro el nombre del archivo que contiene la nueva imagen del producto 
          db.Image.update({
            file_name: req.file.filename
          }, {
            where: {
              product_id: req.params.id
            }
          })
            .then()
            .catch(error => console.log(error))
        }

        //trabajo sobre la tabla intermedia winemaker_product
        db.Product.findByPk(req.params.id)
          .then(productoEditado => {
            const arrayIdWinemakers = req.body.winemaker_id
            const arrayIdWinemakersValidos = arrayIdWinemakers.filter(id => id != "")
            productoEditado.setWinemaker(arrayIdWinemakersValidos)
          })
          .catch(error => console.log(error))

        res.redirect("/products");
      })
      .catch(error => console.log(error));
    }
  },


  /*** BORRA UN PRODUCTO ***/

  // DESTROY - Delete one product from DB
  destroy: (req, res) => {

    // En primier térmido debe borrar las asociaciones del producto con la tabla Image y con la tabla intermedia winemaker_product, luego sí puedo elimar el producto en cuestión. En muy importante que la promesa de eliminar el producto esté adentro del then() asociado a la promesa de eliminar la imagen del producto
    //Elimino tanto la asociación en la tabla "Image" como el archivo que contiene la imagen en la carpte public
    db.Image.findOne({
      where: {
        product_id: req.params.id
      }
    })
      .then(imagenBorrandose => {
        const idProductoBorrandose = imagenBorrandose.product_id
        db.Image.destroy({
          where: {
            product_id: idProductoBorrandose
          }
        })
          .then(resultadoImagenBorrada => {
            //Elimino la asociación en la tabla "winemaker_product"
            db.Product.findByPk(idProductoBorrandose)
              .then(productoBorrandose => {
                productoBorrandose.setWinemaker([])
                //Finalmente elimino el producto
                db.Product.destroy({
                  where: {
                    id: idProductoBorrandose
                  }
                })
                  .then(resultado => {
                    res.redirect("/");
                  })
                  .catch(error => console.log(error))
              })
              .catch(error => console.log(error))
          })
          .catch(error => console.log(error))
        const imagenDestruida = imagenBorrandose.file_name
        fs.rmSync(path.resolve(productsImagePath, imagenDestruida))

      })
      .catch(error => console.log(error))
  },
};

module.exports = productsController;
