'use strict';

const basicAuthHandler = require(`${APP_ROOT}/middleware/BasicAuthHandler`);

const fs = require('fs');

/**
 * @export {Object}
 */
module.exports = {
  middleware: [basicAuthHandler],

  /**
   * @openapi
   *
   * /api/example/private/image:
   *   get:
   *     description: Example using `Route.index` handler alias.
   *     responses:
   *       200:
   *         description: Returns binary string.
   *         content:
   *           image/png:
   *             schema:
   *               type: string
   *         headers:
   *           Content-Type:
   *             schema:
   *               type: string
   *               example: image/png; charset=utf-8
   *       401:
   *         description: Unauthorized
   *       404:
   *         description: Not found
   *     security:
   *       - basicAuth: []
   *     tags:
   *       - Protected image
   */
  index (req, res) {
    const buffer = fs.readFileSync(`${APP_ROOT}/images/ROTN.jpg`);

    if (buffer) {

      // Return success response.
      res.setHeader('Content-Type', 'image/png; charset=utf-8');
      res.status(200).send(buffer);
    } else {

      // Return error response.
      res.status(404).send();
    }
  }
};
