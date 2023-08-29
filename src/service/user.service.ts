import { omit } from "lodash"
import UserModel, { UserDocument } from "../models/use.model"

export async function createUser(input: any) {
  try {
    const user = await UserModel.create(input)

    return omit(user.toJSON(), "password")
  } catch (e: any) {
    throw new Error(e)
  }
}
