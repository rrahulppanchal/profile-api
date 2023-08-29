import { Response, Request } from "express"
import logger from "../utils/logger"
import { createUser } from "../service/user.service"
import { CreateUserInput } from "../schema/user.schema"

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body)
    user
    return res.status(200).send("User has been created!")
  } catch (e: any) {
    logger.error(e)
    return res.status(409).send(e.message)
  }
}
