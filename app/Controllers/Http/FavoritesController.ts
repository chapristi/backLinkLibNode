import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Favorite from 'App/Models/Favorite'
import StoreFavoriteValidator from 'App/Validators/StoreFavoriteValidator'

export default class FavoritesController {
  public async index({}: HttpContextContract): Promise<void> {}
  public async store({ response, auth, request }: HttpContextContract): Promise<void> {
    try {
      const { postId } = await request.validate(StoreFavoriteValidator)

      const fav = await Favorite.create({
        userId: (await auth.use('jwt').authenticate()).id,
        postId: postId,
      })
      return response.created(fav)
    } catch (err: any) {
      console.log(err)
      return response.json(err)
    }
  }

  public async show({}: HttpContextContract): Promise<void> {}

  public async update({}: HttpContextContract): Promise<void> {}

  public async destroy({}: HttpContextContract): Promise<void> {}
}
