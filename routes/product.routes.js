const express = require('express')
const router = express.Router()
const app = express()

const productControllers = require('../controllers/ProductController')
const upload = require('../middleware/upload')
const AuthToken = require('../middleware/AuthToken');
const { route } = require('./ingredients.routes')

router.get('/', productControllers.index);

/**
 * @swagger
 * /api/product/search/{name}:
 *   get:
 *     summary: Buscar un producto por nombre.
 *     tags:
 *       - products
 *     description: Devuelve una lista de productos que coinciden con el nombre especificado.
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del producto a buscar.
 *     responses:
 *       200:
 *         description: OK. Devuelve la lista de productos encontrados.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       400:
 *         description: Error. La solicitud no se puede procesar en este momento.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error.
 *       404:
 *         description: No encontrado. No se encontraron productos con el nombre especificado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error.
 */
router.get('/search/:name', productControllers.search);


router.get('/subcategory/:subcategoryId', productControllers.subcategory);

router.get('/category/:categoryId', productControllers.category);

router.get('/buscar/:name', productControllers.buscar);
// app.use(AuthToken)
// router.get('/',productControllers.index)

/**
 * @swagger
 * /api/product/find/{id}:
 *   get:
 *     summary: obtiene un producto por ID
 *     tags:
 *       - products
 *     description: Devuelve un producto por id.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product to retrieve.
 *     responses:
 *       '200':
 *         description: A product object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '404':
 *         description: The requested product was not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product not found with id 123.
 *       '500':
 *         description: An error occurred while retrieving the product.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error retrieving product with id 123.
 */
router.get('/find/:id', productControllers.buscar)

router.get('/search', productControllers.getProductsCart)

/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: Muestra los productos
 *     tags:
 *       - products
 *     description: Retorna una lista de productos.
 *     parameters:
 *       - in: query
 *         name: page
 *         description: Número de página que se desea mostrar.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: limit
 *         description: Número máximo de productos que se desea mostrar por página.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *     responses:
 *       '200':
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       '404':
 *         description: NOT FOUND.
 *       '500':
 *         description: Internal Server Error.
 */

router.get('/:key/:value', productControllers.find, productControllers.show)

/**
 * @swagger
 * /api/product/calories:
 *   post:
 *     summary: Calcula la cantidad total de calorías de una lista de productos.
 *     tags:
 *       - products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista de IDs de los productos cuyas calorías se desean sumar.
 *             example:
 *               productIds: ['6123c04708c01d6c995c59e2', '6123c04708c01d6c995c59e3']
 *     responses:
 *       200:
 *         description: Cantidad total de calorías de los productos seleccionados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalCalories:
 *                   type: number
 *                   description: Cantidad total de calorías de los productos seleccionados.
 *                   example: 1350
 *       500:
 *         description: Error al calcular las calorías.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *                   example: Error al calcular las calorías.
 */

router.post('/calories', productControllers.calculateCalories);

/**
 * @openapi
 * /api/product/store:
 *   post:
 *     summary: Agrega un producto
 *     tags:
 *       - products
 *     description: Agrega un nuevo producto a la base de datos.
 *     requestBody:
 *       description: Objeto de producto que se agregará a la base de datos.
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del producto.
 *               description:
 *                 type: string
 *                 description: Descripción del producto.
 *               price:
 *                 type: number
 *                 description: Precio del producto.
 *               totalCalories:
 *                 type: number
 *                 description: Total de calorías del producto.
 *               inCart:
 *                 type: boolean
 *                 description: Define si el producto está en el carrito de compras.
 *               status:
 *                 type: boolean
 *                 description: Define si el producto está disponible para la venta.
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Imagen del producto.
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '400':
 *         description: La solicitud no se puede procesar debido a una sintaxis incorrecta.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '500':
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.post('/store', upload.single('image'), productControllers.store)
/**
 * @swagger
 *
 * /api/product/{id}:
 *   put:
 *     summary: Actualiza un producto por su id.
 *     tags:
 *       - products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El id del producto a actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Campos para actualizar el producto.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               totalCalories:
 *                 type: number
 *               inCart:
 *                 type: string
 *                 enum: [true, false]
 *               status:
 *                 type: string
 *                 enum: [true, false]
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Error en la solicitud.
 *       404:
 *         description: Producto no encontrado con el id especificado.
 *       500:
 *         description: Error del servidor.
 */
router.put('/:id', productControllers.find, productControllers.updateProduct)
router.delete('/:key/:value', productControllers.find, productControllers.remove)

/**
 * @openapi
 * /api/product/{id}:
 *   delete:
 *     summary: Elimina un producto por ID
 *     tags:
 *       - products
 *     description: Elimina un producto de la base de datos utilizando su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del producto a eliminar.
 *         required: true
 *         schema:
 *           type: string
 * 
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *       '404':
 *         description: Producto no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '500':
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.delete('/:idproduct', productControllers.removeByid)

// router.get('/search/:name', productControllers.searchProductByName);
// /**
//  * @openapi
//  * /api/product/search/{name}:
//  *   get:
//  *     summary: Busca productos por nombre
//  *     description: Busca productos en la base de datos que coincidan con el patrón de búsqueda proporcionado.
//  *     parameters:
//  *       - in: path
//  *         name: name
//  *         description: Patrón de búsqueda para el nombre del producto.
//  *         required: true
//  *         schema:
//  *           type: string
//  *     responses:
//  *       '200':
//  *         description: OK
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Product'
//  *       '400':
//  *         description: Error al procesar la petición.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Product'
//  *       '500':
//  *         description: Error interno del servidor.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Product'
//  */
router.get('/search/:name', productControllers.search)


router.get('/category/:query', productControllers.category)

// Rutas Movil

router.get('/movil/', productControllers.indexMovil);


/**
 * @swagger
 * /api/product/movil/:
 *   get:
 *     summary: Muestra los productos  para movil
 *     tags:
 *       - movil
 *     description: Retorna una lista de productos.
 *     parameters:
 *       - in: query
 *         name: page
 *         description: Número de página que se desea mostrar.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: limit
 *         description: Número máximo de productos que se desea mostrar por página.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *     responses:
 *       '200':
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       '404':
 *         description: NOT FOUND.
 *       '500':
 *         description: Internal Server Error.
 */


module.exports = router