'use strict';

const contentNegotiation = require(`${APP_ROOT}/middleware/ContentNegotiationJson`);
const contentTypeHeader  = require(`${APP_ROOT}/middleware/ContentTypeJsonHeader`);

/**
 * @export {Object}
 */
module.exports = {
  middleware: [contentNegotiation, contentTypeHeader],
  resource: ['create', 'update', 'delete'],

  /**
   * @openapi
   *
   * /api/example:
   *   get:
   *     description: Example using `Route.index` handler alias.
   *     responses:
   *       200:
   *         description: Returns JSON response.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 name:
   *                   type: string
   *         headers:
   *           Content-Type:
   *             schema:
   *               type: string
   *               example: application/json
   *     tags:
   *       - Public route
   */
  index (req, res) {
    res.status(200).send({name: 'example:index'});
  },

  /**
   * @openapi
   *
   * /api/example/{resourceId}:
   *   put:
   *     description: Example using `Route.create` handler alias.
   *     parameters:
   *       - in: path
   *         name: resourceId
   *         schema:
   *           type: string
   *         example: 123456
   *         required: true
   *     responses:
   *       201:
   *         description: Returns JSON response.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 name:
   *                   type: string
   *         headers:
   *           Content-Type:
   *             schema:
   *               type: string
   *               example: application/json
   *       406:
   *         description: Not Acceptable
   *       415:
   *         description: Unsupported Media Type
   *     tags:
   *       - Public route
   */
  create (req, res, id) {
    res.status(201).send({name: `example/${id}:create`});
  },

  /**
   * @openapi
   *
   * /api/example/{resourceId}:
   *   patch:
   *     description: Example using `Route.update` handler alias.
   *     parameters:
   *       - in: path
   *         name: resourceId
   *         schema:
   *           type: string
   *         example: 123456
   *         required: true
   *     responses:
   *       200:
   *         description: Returns JSON response.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 name:
   *                   type: string
   *         headers:
   *           Content-Type:
   *             schema:
   *               type: string
   *               example: application/json
   *       406:
   *         description: Not Acceptable
   *       415:
   *         description: Unsupported Media Type
   *     tags:
   *       - Public route
   */
  update (req, res, id) {
    res.status(200).send({name: `example/${id}:update`});
  },

  /**
   * @openapi
   *
   * /api/example/{resourceId}:
   *   delete:
   *     description: Example using `Route.delete` handler method.
   *     parameters:
   *       - in: path
   *         name: resourceId
   *         schema:
   *           type: string
   *         example: 123456
   *         required: true
   *     responses:
   *       200:
   *         description: Returns JSON response.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 name:
   *                   type: string
   *         headers:
   *           Content-Type:
   *             schema:
   *               type: string
   *               example: application/json
   *       406:
   *         description: Not Acceptable
   *       415:
   *         description: Unsupported Media Type
   *     tags:
   *       - Public route
   */
  delete (req, res, id) {
    res.status(200).send({name: `example/${id}:delete`});
  },

  /**
   * @openapi
   *
   * /api/example:
   *   post:
   *     description: Example using `Route.submit` handler alias.
   *     responses:
   *       200:
   *         description: Returns JSON response.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 name:
   *                   type: string
   *         headers:
   *           Content-Type:
   *             schema:
   *               type: string
   *               example: application/json
   *       406:
   *         description: Not Acceptable
   *       415:
   *         description: Unsupported Media Type
   *     tags:
   *       - Public route
   */
  submit (req, res) {
    res.status(200).send({name: 'example:submit'});
  }
};
