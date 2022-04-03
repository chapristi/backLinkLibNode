import Bouncer, { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class CatgoriesPolicy extends BasePolicy {
  public async create(user: User) {
    if (user.role === 'ROLE_ADMIN') {
      return true
    }
    return Bouncer.deny('Unauthorized', 401)
  }
  public async update(user: User) {
    if (user.role === 'ROLE_ADMIN') {
      return true
    }
    return Bouncer.deny('Unauthorized', 401)
  }
  public async delete(user: User) {
    if (user.role === 'ROLE_ADMIN') {
      return true
    }
    return Bouncer.deny('Unauthorized', 401)
  }
}
