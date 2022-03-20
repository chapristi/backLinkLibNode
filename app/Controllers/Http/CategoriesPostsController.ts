import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CategoriesPost from 'App/Models/CategoriesPost';

export default class CategoriesPostsController {
    public async index({ response,params,request  } : HttpContextContract): Promise<void> {
        const data = request.only(['gamesTeams'])
        console.table(data.gamesTeams) 
        try{
            const categoriesPost : CategoriesPost[] = await CategoriesPost.all();    
            return response.ok(categoriesPost);
        }catch(err : any){return response.status(500).json({error : err.message,messages : "Unable to retrieve data at this time"}); }
   
    }
    public async store({} : HttpContextContract): Promise<void> {
     
        
    }

    public async show({ } : HttpContextContract): Promise<void> {
 
      
    }

    public async update({  } : HttpContextContract): Promise<void> {
     

    }

    public async destroy({ } : HttpContextContract): Promise<void> { 
      
        
    }



}
