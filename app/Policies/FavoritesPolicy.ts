import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Favorite from 'App/Models/Favorite'
import Bouncer from '@ioc:Adonis/Addons/Bouncer'

export default class FavoritesPolicy extends BasePolicy {
  public async delete(user: User, favorite: Favorite) {
    if (favorite.userId === user.id || user.role === 'ROLE_ADMIN') {
      return true
    }
    return Bouncer.deny('Unauthorized', 401)
  }
}
