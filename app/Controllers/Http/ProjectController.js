'use strict';
const {controller} = use('App/Factories/Controller');
const ProjectBusiness = use('App/Business/ProjectBusiness');

class ProjectController {
  index(ctx) {
    return controller(ProjectBusiness, 'index', ctx);
  }

  show(ctx) {
    return controller(ProjectBusiness, 'show', ctx);
  }

  store(ctx) {
    return controller(ProjectBusiness, 'store', ctx);
  }

  update(ctx) {
    return controller(ProjectBusiness, 'update', ctx);
  }

  destroy(ctx) {
    return controller(ProjectBusiness, 'destroy', ctx);
  }
}

module.exports = ProjectController;

