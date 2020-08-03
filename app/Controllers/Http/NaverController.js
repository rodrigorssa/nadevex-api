'use strict';
const {controller} = use('App/Factories/Controller');
const NaverBusiness = use('App/Business/NaverBusiness');

class NaverController {
  index(ctx) {
    return controller(NaverBusiness, 'index', ctx);
  }

  show(ctx) {
    return controller(NaverBusiness, 'show', ctx);
  }

  store(ctx) {
    return controller(NaverBusiness, 'store', ctx);
  }

  update(ctx) {
    return controller(NaverBusiness, 'update', ctx);
  }

  destroy(ctx) {
    return controller(NaverBusiness, 'destroy', ctx);
  }
}

module.exports = NaverController;
