import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Post from 'App/Models/Post'
import Bouncer from '@ioc:Adonis/Addons/Bouncer';

export default class PostPolicy extends BasePolicy {
	
	public async update(user: User, post: Post) {
		if (post.userId === user.id){
			return true;
		}
		return Bouncer.deny('Unauthorized', 401)

	}
	public async delete(user: User, post: Post) {


	}
}
