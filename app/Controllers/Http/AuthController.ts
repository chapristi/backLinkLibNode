// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StoreUserValidator from 'App/Validators/Auth/StoreUserValidator'
import LoginValidator from 'App/Validators/Auth/LoginValidator'
import UpdateUserValidator from 'App/Validators/Auth/UpdateUserValidator'
import Hash from '@ioc:Adonis/Core/Hash'

export default class AuthController {
  public async register({ request, response }: HttpContextContract): Promise<void> {
    const payload = await request.validate(StoreUserValidator)

    const user: User = await User.create(payload)

    return response.created(user) // 201 CREATED
  }
  public async login({ auth, request, response }: HttpContextContract): Promise<void> {
    const { email, password } = await request.validate(LoginValidator)

    const user = await User.findByOrFail('email', email)
    //console.log(user['$attributes'].password)

    const pass = await Hash.verify(user['$attributes'].password, password)
    if (pass) {
      const token = await auth.use('jwt').generate(user)
      return response.ok({
        token: token,
      })
    } else {
      response.status(500).json({ message: 'the password is not correct' })
    }
  }

  public async me({ auth, response }: HttpContextContract): Promise<void> {
    await auth.use('jwt').authenticate()
    //const userModel = auth.use("jwt").user!;
    //const userPayloadFromJwt = auth.use("jwt").payload!;
    //console.log(userPayloadFromJwt);
    return response.ok(auth.use('jwt').user!)
  }

  public async update({ auth, request, response }: HttpContextContract): Promise<void> {
    const payload = await request.validate(UpdateUserValidator)

    const user = await auth.use('jwt').user!.merge(payload).save()

    return response.ok(user) // 200 OK
  }
}
