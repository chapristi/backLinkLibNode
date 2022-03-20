import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import StoreCategoryValidator from 'App/Validators/StoreCategoryValidator'
import UpdateCategoryValidator from 'App/Validators/UpdateCategoryValidator'

export default class CategoriesController {



    public async index({ response} : HttpContextContract): Promise<void> {
        try{
            const category : Category[] = await Category.all();    
            return response.ok(category);
        }catch(err : any){return response.status(500).json({error : err.message,messages : "Unable to retrieve data at this time"}); }

    }
    public async store({bouncer,request,response} : HttpContextContract): Promise<void> {
        try{
            await bouncer
            .with('CatgoriesPolicy')
            .authorize('create')
        const payload = await request.validate(StoreCategoryValidator)
        const category = Category.create(payload)
        response.created(category)
        }

            catch (err : any){return response.status(500).json({error: err.message,message: "the server returned an error! Impossible to create a category! try again!"})
        }
     
    }

    public async show({ response,params} : HttpContextContract): Promise<void> {

        try{
           
            const category : Category   = await Category.findOrFail(params.id);
            return response.ok(category);
        
        }catch(err : any){return response.status(500).json({error : err.message,messages : "Unable to retrieve data at this time"}); }

    }

    public async update({bouncer,params,response,request} : HttpContextContract): Promise<void> {
      try{
            await bouncer
                .with('CatgoriesPolicy')
                .authorize('update')
            const payload = await request.validate(UpdateCategoryValidator)

            const category :any[]  = await Category
                .query()
                .where('id', params.id)
                .update( payload )
            response.ok({category : category, message : "the category was updated"})

        }catch (err : any){return response.status(500).json({error: err.message,message: "the server returned an error! Impossible to uodate a category! try again!"})
    }
       
        
          

    }

    public async destroy({response,bouncer,params} : HttpContextContract): Promise<void> {
        try{
            const category:Category = await Category.findOrFail(params.id)
            await bouncer
                .with('CatgoriesPolicy')
                .authorize('update')
            
            category.delete();
            response.ok({message : "the category was deleted"})
        }catch (err : any) {
            return response.status(500).json({error : err.message,message : "impossible to delete this category for the moment!"})
        }
       

    }
    
}
