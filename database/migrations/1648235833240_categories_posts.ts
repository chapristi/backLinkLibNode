import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CategoriesPosts extends BaseSchema {
  protected tableName = 'categories_posts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('category_id').unsigned().references('categories.id').notNullable()
      table.integer('post_id').unsigned().references('posts.id').notNullable()
      table.unique(['category_id', 'post_id'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
