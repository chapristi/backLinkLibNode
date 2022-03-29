import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CategoriesPosts from 'App/Models/CategoriesPost'
import Database from '@ioc:Adonis/Lucid/Database'

export default class CategoriesPostsController {
  private helperRequest(nbr: number): string {
    let index: number = 0
    let text: string = ''
    while (index < nbr) {
      if (nbr === 1) {
        text += 'categories_posts.category_id = ?'
        index++
        continue
      }

      text += 'categories_posts.category_id = ? OR '
      index++
    }
    return text
  }
  public async index({ response, request }: HttpContextContract): Promise<void> {
    const data = request.only(['gamesTeams'])
    let parse = JSON.parse(data.gamesTeams)
    console.log(parse['gamesTeams'])
    console.log(this.helperRequest(parse['gamesTeams'].length))
    const books = await Database.from('categories_posts')
      .join('categories', 'categories_posts.category_id', 'categories.id')
      .join('posts', 'categories_posts.post_id', 'posts.id')
      .select('posts.name as post_name')
      .select('posts.link as post_link')
      .select('posts.image as post_image')
      .select('categories.name as category_name')
      .whereRaw(this.helperRequest(parse['gamesTeams'].length), parse['gamesTeams'])

    console.log(books)
    try {
      const categoriesPost = await CategoriesPosts.query().preload('categories').preload('posts')

      console.log(categoriesPost)
      console.log('f')
      return response.ok(categoriesPost)
    } catch (err: any) {
      return response
        .status(500)
        .json({ error: err.message, messages: 'Unable to retrieve data at this time' })
    }
  }
  public async store({}: HttpContextContract): Promise<void> {}

  public async show({}: HttpContextContract): Promise<void> {}

  public async update({}: HttpContextContract): Promise<void> {
    //pas besoin de l'utiliser.
  }

  public async destroy({ params, response }: HttpContextContract): Promise<void> {
    try {
      const categoryPost: CategoriesPosts = await CategoriesPosts.findOrFail(params.id)

      await categoryPost.delete()
      response.status(200).json({ message: 'the categoryPost has been deleted' })
    } catch (err: any) {
      response.status(500).json({
        error: err.message,
        message:
          'the server returned an error! Impoossible to delete this categoryPost !  try again!',
      })
    }
  }
}
