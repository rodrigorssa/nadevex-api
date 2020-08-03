'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

const versionAPI = 'v1';

const defaultResponse = {
  versionAPI: versionAPI,
  msg: 'Welcome to Navedex API',
};

Route.resource('/api/navers', 'NaverController');
Route.resource('/api/users', 'UserController');
Route.get('/api/users/navers/:id', 'UserController.getNavers');
Route.resource('/api/projects', 'ProjectController');
Route.resource('/api/roles', 'RoleController');

Route.any('*', ({response}) => response.badRequest(defaultResponse));
