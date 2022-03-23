import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CategoriesPost from 'App/Models/CategoriesPost';

export default class CategoriesPostsController {
    private helperRequest(nbr : number) :string{
        let index : number = 0
        let text : string = ""
        while( index < nbr){
            text += "postId = ? OR";
            index++;
        }
        return text

    }
    public async index({ response,request  } : HttpContextContract): Promise<void> {
        const data = request.only(['gamesTeams'])
        let parse = JSON.parse(data.gamesTeams)
      

        try{
            const categoriesPost =  await CategoriesPost
                .query()
                .preload('post', (postQuery) => {
                    postQuery.whereRaw(this.helperRequest(parse["gamesTeams"].length), parse["gamesTeams"])
                })
          
                   
            return response.ok(categoriesPost);
        }catch(err : any){return response.status(500).json({error : err.message,messages : "Unable to retrieve data at this time"}); }
   
    }
    public async store({} : HttpContextContract): Promise<void> {
     
        
    }

    public async show({ } : HttpContextContract): Promise<void> {
 
      
    }

    public async update({  } : HttpContextContract): Promise<void> {
     
        //pas besoin de l'utiliser.
    }

    public async destroy({params,response} : HttpContextContract): Promise<void> { 
      
        try{
            const categoryPost:CategoriesPost = await CategoriesPost.findOrFail(params.id)
            
            await categoryPost.delete()  
            response.status(200).json({message: "the categoryPost has been deleted"})
        }catch(err : any) {
            response.status(500).json({error: err.message,message: "the server returned an error! Impoossible to delete this categoryPost !  try again!"})
        }
    }



}
