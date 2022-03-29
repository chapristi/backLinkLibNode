import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Favorites extends BaseSchema {
  protected tableName = 'favorites'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('user_id').unsigned().references('users.id').notNullable()
      table.integer('post_id').unsigned().references('posts.id').notNullable()
      table.unique(['user_id', 'post_id'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
