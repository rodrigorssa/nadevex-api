'use strict';
const {controller} = use('App/Factories/Controller');
const RoleBusiness = use('App/Business/RoleBusiness');

class RoleController {
  index(ctx) {
    return controller(RoleBusiness, 'index', ctx);
  }

  show(ctx) {
    return controller(RoleBusiness, 'show', ctx);
  }

  store(ctx) {
    return controller(RoleBusiness, 'store', ctx);
  }

  update(ctx) {
    return controller(RoleBusiness, 'update', ctx);
  }

  destroy(ctx) {
    return controller(RoleBusiness, 'destroy', ctx);
  }
}

module.exports = RoleController;
