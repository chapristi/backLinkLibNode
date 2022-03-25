import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Favorite from 'App/Models/Favorite'

export default class FavoritesController {
    public async index({ response } : HttpContextContract): Promise<void> {

      
   
    }
    public async store({response} : HttpContextContract): Promise<void> {
    try{
        const fav = await Favorite.create({ userId : 1,postId : 1})
        return response.created(fav) 
    }catch(err : any){
        console.log(err)
        return response.json(err)
    }
     
    }

    public async show({  } : HttpContextContract): Promise<void> {
 
      
      
    }

    public async update({ } : HttpContextContract): Promise<void> {
      


    }

    public async destroy({ } : HttpContextContract): Promise<void> { 
     
        
    }

}
