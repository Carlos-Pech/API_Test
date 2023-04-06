const express = require('express')
const router = express.Router()
const app = express()

const CategoryController  = require('../controllers/CategoryController')
const upload = require('../middleware/upload')

// app.use(AuthToken)

/**
 * @swagger
 * /category/add/:
 *   get:
 *     summary: Muestra las categorias
 *     tags:
 *       - categories
 *     description: Retorna una lista de categorias.
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
 *         description: Número máximo de categorias que se desea mostrar por página.
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
router.get('/',CategoryController.index)
/**
 * @swagger
 * /category/add/store:
 *   post:
 *     summary: Crea una nueva categoría
 *     tags:
 *       - categories
 *     description: Crea una nueva categoría en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '201':
 *         description: Categoría creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Categoría creada exitosamente.
 *       '400':
 *         description: Petición incorrecta, verifique los datos enviados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: La categoría ya existe en la base de datos.
 *       '500':
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al guardar la categoría en la base de datos.
 * 
 */
router.post('/store', upload.single('image'),CategoryController.store)

/**
 * @swagger
 * /category/add/{idcategory}:
 *   delete:
 *     summary: Elimina una categoría por ID
 *     tags:
 *       - categories
 *     description: Elimina una categoría por su ID.
 *     parameters:
 *       - in: path
 *         name: idcategory
 *         description: ID de la categoría a eliminar.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Categoría eliminada satisfactoriamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Categoría eliminada"
 *       '404':
 *         description: No se encontró la categoría.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se encontró la categoría."
 *       '500':
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error del servidor."
 */

router.delete('/:idcategory', CategoryController.removeByid)

router.get('/find/:id',CategoryController.getById)





module.exports=router