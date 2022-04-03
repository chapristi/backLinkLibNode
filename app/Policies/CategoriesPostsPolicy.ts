import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Bouncer from '@ioc:Adonis/Addons/Bouncer'

export default class CategoriesPostsPolicy extends BasePolicy {
  public async delete(user: User) {
    if (user.role === 'ROLE_ADMIN') {
      return true
    }
    return Bouncer.deny('Unauthorized', 401)
  }
}
