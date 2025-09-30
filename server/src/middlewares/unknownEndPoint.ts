import { Request, Response } from "express";

const unknownEndPoint = (request: Request, response: Response) => {
  console.log("\nUnknown Endpoint!")
  response.status(404).send({ error: 'unknown endpoint' })
}

export default unknownEndPoint;