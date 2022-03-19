/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
Route.group(() => {
  Route.get('/', async () => {
    return { hello: 'world' }
  })

  Route.post('/users', 'AuthController.register')
  Route.post('/users/login', 'AuthController.login')
  Route.get('/user', 'AuthController.me').middleware(['auth:jwt'])
  Route.put('/users', 'AuthController.update').middleware(['auth:jwt'])




  Route.resource('/posts', 'PostsController').apiOnly().middleware({
    '*': ['auth:jwt'],
    store: ['auth:jwt'],
    destroy: ['auth:jwt']
  })

  Route.resource('/categories', 'CategoriesController').apiOnly().middleware({
    '*': ['auth:jwt'],
    update: ['auth:jwt'],
    destroy: ['auth:jwt']
  })


  Route.post('/refresh', async ({ auth, request,response }:HttpContextContract) => {
    const refreshToken = request.input("refresh_token");
    const jwt = await auth.use("jwt").loginViaRefreshToken(refreshToken);
    return response.ok({
      "token": jwt,
    })
    
  });
  Route.post('/logout', async ({ auth, response }:HttpContextContract) => {
    await auth.use('jwt').revoke()
    response.ok( {
      revoked: true
    })
  })
}).prefix('api')

