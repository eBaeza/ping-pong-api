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

Route.post('login', 'UserController.login')
  .validator('Login')

Route.resource('games', 'GameController').apiOnly()
  .middleware(['auth'])
  .validator(new Map([
    [['games.store'], ['StoreGame']],
    [['games.update'], ['UpdateGame']]
  ]))
