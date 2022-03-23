import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddPostToCategoriesPosts extends BaseSchema {
  protected tableName = 'categories_posts'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('post_id').unsigned().references('post.id')

    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {table.dropColumn("post_id")})

  }
}
