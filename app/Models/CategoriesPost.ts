
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Category from './Category'
import Post from './Post'

export default class CategoriesPost extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @manyToMany(() => User)
  public user: ManyToMany<typeof User>
  @column()
  public userId : number
  @manyToMany(() => Category)
  public category: ManyToMany<typeof Category>
  @column()
  public categoryId : number

  @manyToMany(() => Post)
  public post: ManyToMany<typeof Post>
  @column()
  public postId : number
  

}
