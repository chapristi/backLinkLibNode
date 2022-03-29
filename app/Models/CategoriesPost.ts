import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'

import Category from './Category'
import Post from './Post'

export default class CategoriesPosts extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @manyToMany(() => Category, {})
  public categories: ManyToMany<typeof Category>
  @column()
  public categoryId: number

  @manyToMany(() => Post, {})
  public posts: ManyToMany<typeof Post>
  @column()
  public postId: number
}
