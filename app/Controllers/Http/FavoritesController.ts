import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Favorite from 'App/Models/Favorite'
import StoreFavoriteValidator from 'App/Validators/StoreFavoriteValidator'

export default class FavoritesController {
  public async index({ response }: HttpContextContract): Promise<void> {
    try {
      const fav: Favorite[] = await Favorite.all()
      return response.ok(fav)
    } catch (err: any) {
      return response
        .status(500)
        .json({ error: err.message, messages: 'Unable to retrieve data at this time' })
    }
  }
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
      return response.json({ message: err.message })
    }
  }

  public async show({ params, response }: HttpContextContract): Promise<void> {
    try {
      const fav: Favorite = await Favorite.findOrFail(params.id)
      return response.ok(fav)
    } catch (err: any) {
      return response
        .status(500)
        .json({ error: err.message, messages: 'Unable to retrieve data at this time' })
    }
  }

  public async update({}: HttpContextContract): Promise<void> {}

  public async destroy({ params, response, bouncer }: HttpContextContract): Promise<void> {
    try {
      const fav: Favorite = await Favorite.findOrFail(params.id)
      await bouncer.with('FavoritesPolicy').authorize('delete', fav)
      await fav.delete()
      response.status(200).json({ message: 'the post has been deleted' })
    } catch (err: any) {
      response.status(500).json({
        error: err.message,
        message: 'the server returned an error! Impoossible to delete this post !  try again!',
      })
    }
  }
}
