'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.get('/', () => ({ greeting: 'Hello world in JSON' }))

Route.post('login', 'AuthController.login')
  .validator('Login')

Route.get('users/search', 'UserController.search').middleware('auth')
Route.resource('users', 'UserController').apiOnly()
  .middleware(new Map([
    [['index', 'show', 'update', 'destroy'], ['auth']]
  ]))
  .validator(new Map([
    [['users.store'], ['StoreUser']],
    [['users.update'], ['UpdateUser']]
  ]))


Route.resource('matches', 'MatchController').apiOnly()
  .middleware(['auth'])
  .validator(new Map([
    [['matches.store'], ['StoreMatch']],
    [['matches.update'], ['UpdateMatch']]
  ]))
