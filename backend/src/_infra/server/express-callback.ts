import { Request, Response } from "express"
import { IController } from "../../shared/interfaces"
import { THttpRequest, TInfractructure } from "../../shared/types"

const infrastructure: TInfractructure = {
  db: {} // todo add database
}

export const makeExpressCallback = (controller: IController) => {
  return (req: Request, res: Response) => {
    const httpRequest: THttpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Referer: req.get('referer'),
        'User-Agent': req.get('User-Agent')
      }
    }

    controller.make(httpRequest, infrastructure)
      .then(httpResponse => {
        if (httpResponse.headers) {
          res.set(httpResponse.headers)
        }

        res.type('json')
        res.status(httpResponse.statusCode).send(httpResponse.body)
      })
      .catch(() => {
        res.status(500).send({ error: 'An unkown error occurred.' })
      })
  }
}
