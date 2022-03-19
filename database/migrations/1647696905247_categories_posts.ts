import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CategoriesPosts extends BaseSchema {
  protected tableName = 'categories_posts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('users.id')
      table.integer('category_id').unsigned().references('category.id')
      table.unique(['user_id', 'category_id'])


     
  
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
