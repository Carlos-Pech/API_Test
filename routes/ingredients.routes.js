const express = require('express')
const router = express.Router()
const app = express()

const IngredientsControlller= require('../controllers/IngredientsControler')

router.get('/', IngredientsControlller.index)


// app.use(AuthToken)
// router.get('/',IngredientsControlller.index)
router.get('/buscar',IngredientsControlller.buscar)


// app.use(AuthToken)
// router.get('/',productControllers.index)

/**
 * @swagger
 * /ingredients/add/find/{id}:
 *   get:
 *     summary: Obtiene un ingrediente por su ID.
 *     tags:
 *       - ingredients
 *     description: Obtiene un ingrediente por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del ingrediente a buscar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ingrediente encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 *       404:
 *         description: Ingrediente no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *                   example: Ingrediente no encontrado con id {id}
 *       500:
 *         description: Error al obtener el ingrediente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *                   example: Error al obtener el ingrediente con id {id}
 */
router.get('/find/:id',IngredientsControlller.buscar)
/**
 * @swagger
 * /ingredients/add/:
 *   get:
 *     summary: Muestra los ingredientes
 *     tags:
 *       - ingredients
 *     description: Retorna una lista de ingredientes.
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
 *                     $ref: '#/components/schemas/Ingredient'
 *       '404':
 *         description: NOT FOUND.
 *       '500':
 *         description: Internal Server Error.
 */
router.post('/show', IngredientsControlller.show)

/**
 * @swagger
 * /ingredients/add/store:
 *   post:
 *     summary: Agrega un nuevo ingrediente.
 *     tags:
 *       - ingredients
 *     requestBody:
 *       description: Datos del ingrediente a agregar.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               calories:
 *                 type: integer
 *               status:
 *                 type: string
 *               familia:
 *                 type: string
 *             required:
 *               - name
 *               - calories
 *               - status
 *               - familia
 *     responses:
 *       201:
 *         description: Ingrediente agregado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *                 ingredient:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: ID del ingrediente agregado.
 *                     name:
 *                       type: string
 *                       description: Nombre del ingrediente agregado.
 *                     calories:
 *                       type: integer
 *                       description: Calorías del ingrediente agregado.
 *                     status:
 *                       type: string
 *                       description: Estado del ingrediente agregado.
 *                     familia:
 *                       type: string
 *                       description: Familia del ingrediente agregado.
 *                   required:
 *                     - _id
 *                     - name
 *                     - calories
 *                     - status
 *                     - familia
 *       500:
 *         description: Ocurrió un error al intentar agregar el ingrediente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *                 error:
 *                   type: object
 *                   description: Detalles del error.
 */
router.post('/store',IngredientsControlller.store)

/**
 * @swagger
 *
 * /ingredients/add/{id}:
 *   put:
 *     summary: Actualiza un ingrediente por su id.
 *     tags:
 *       - ingredients
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El id del ingrediente a actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Campos para actualizar el ingrediente.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               calories:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *               familia:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ingrediente actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 *       400:
 *         description: Error en la solicitud.
 *       404:
 *         description: Ingrediente no encontrado con el id especificado.
 *       500:
 *         description: Error del servidor.
 */
router.put('/:id', IngredientsControlller.find,IngredientsControlller.updateIngredient)
router.delete('/:key/:value', IngredientsControlller.find,IngredientsControlller.remove)

/**
 * @swagger
 * /ingredients/add/{id}:
 *   delete:
 *     summary: Elimina un ingrediente por ID
 *     tags:
 *       - ingredients
 *     description: Elimina un ingrediente de la base de datos utilizando su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del ingrediente a eliminar.
 *         required: true
 *         schema:
 *           type: string
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
 *         description: Ingrediente no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 *       '500':
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 */
router.delete('/:idingredients', IngredientsControlller.removeById)

// /**
//  * @swagger
//  *
//  * /search/{query}:
//  *   get:
//  *     summary: Obtiene los ingredientes que coinciden con el nombre proporcionado.
//  *     description: Devuelve un array de ingredientes que coinciden con el nombre proporcionado.
//  *     parameters:
//  *       - in: path
//  *         name: query
//  *         required: true
//  *         description: Nombre a buscar en los ingredientes.
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: Lista de ingredientes que coinciden con el nombre proporcionado.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Ingredient'
//  *       400:
//  *         description: Error al procesar la petición.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: Error al procesar la petición
//  *
//  */
router.get('/search/:query',IngredientsControlller.search)
router.get('/ingredients/category/:query',IngredientsControlller.category)


module.exports =router;