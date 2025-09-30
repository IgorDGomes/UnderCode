import { NextFunction, Request, Response } from "express"

const requestLogger = (request: Request, response: Response, next: NextFunction) => {
  console.log('\n---')
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('Query: ', request.query)
  console.log('---')
  next()
}

export default requestLogger