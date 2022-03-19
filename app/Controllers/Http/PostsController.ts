import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import StorePostValidator from 'App/Validators/StorePostValidator';
import UpdatePostValidator from 'App/Validators/UpdatePostValidator';

export default class PostsController {
    public async index({ response } : HttpContextContract): Promise<void> {

        try{
            const post : Post[] = await Post.all();
            return response.ok({post: post});
        }
        catch(err: any){return response.status(500).json({error : err.message,messages : "Unable to retrieve data at this time"});}
        
        

    }
    public async store({request, response,auth} : HttpContextContract): Promise<void> {
     
        try{
            const image = "https://legacy.adonisjs.com/"
            const {name ,link } = await request.validate(StorePostValidator)
            const post  : Promise<Post>  = Post.create({name : name,link : link,image : image,userId : await (await auth.use("jwt").authenticate()).id})
            response.created(post);
        }catch(err : any){
            response.status(500).json({error: err.message,message: "the server returned an error! Impossible to right a post! try again!"})

        }
        
        

    }

    public async show({  params,response} : HttpContextContract): Promise<void> {
 
        const post  = await Post.findOrFail(params.id);
        return response.ok({post: post});  
      
    


    }

    public async update({ request,params,response,bouncer } : HttpContextContract): Promise<void> {

        const payload = await request.validate(UpdatePostValidator)
        const post:Post = await Post.findOrFail(params.id)
        await bouncer
            .with('PostPolicy')
            .authorize('update', post)
        try{
        
            
            post
                .merge(payload)
                .save()
            return response.ok(post) 
    }catch (err : any){return response.status(500).json({err : err.message,message: "The server returned an error!Impossible to update this post"})}


    }

    public async destroy({ params,response,bouncer } : HttpContextContract): Promise<void> {
        const post:Post = await Post.findOrFail(params.id)
        await bouncer
            .with('PostPolicy')
            .authorize('delete', post)
    
        try{
            await post.delete()  
            response.status(200).json({message: "the post has been deleted"})
        }catch(err : any) {
            response.status(500).json({error: err.message,message: "the server returned an error! Impoossible to delete this post !  try again!"})
        }
        
    }
  
}
