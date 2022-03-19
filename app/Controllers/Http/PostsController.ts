import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import StorePostValidator from 'App/Validators/StorePostValidator';

export default class PostsController {
    public async index({ response } : HttpContextContract): Promise<void> {
        
        try{
            const post : Post[] = await Post.all();
            return response.ok({post: post});
        }
        catch(err: any){return response.status(500).json({error : err.message,messages : "Unable to retrieve data at this time"});}
        
        

    }
    public async store({request, response,auth} : HttpContextContract): Promise<void> {
     

        const image = "https://legacy.adonisjs.com/"
        const {name ,link } = await request.validate(StorePostValidator)
        const post  : Promise<Post>  = Post.create({name : name,link : link,image : image,userId : await (await auth.use("jwt").authenticate()).id})
        response.created(post);
        

    }

    public async show({  params,response} : HttpContextContract): Promise<void> {
        
        const post  = await Post.findOrFail(params.id);
        return response.ok({post: post});
    


    }

    public async update({  } : HttpContextContract): Promise<void> {




    }

    public async destroy({ params,response } : HttpContextContract): Promise<void> {
        const post:Post = await Post.findOrFail(params.id)
        try{
            await post.delete()  
            response.status(200).json({message: "the post has been deleted"})
        }catch(err : any) {
            response.status(500).json({error: err.message,message: "the server returned an error! try again!"})
        }
        





    }
    



}
