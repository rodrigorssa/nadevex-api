const ProjectModel = use('App/Models/Project');
const NaverProjectBusiness = use('App/Business/NaverProjectBusiness');
const NaverModel = use('App/Models/Naver');
const {response} = use('App/Factories/Response');
const Logger = use('Logger');
class ProjectBusiness {
  constructor() {
    this.projectModel = new ProjectModel();
    this.naverModel = new NaverModel();
    this.naverProjectBusiness = new NaverProjectBusiness();
    this.defaultResponse = response;
  }
  async index() {
    try {
      const dataFromDB = await ProjectModel.all();
      this.defaultResponse = this.defaultResponse(dataFromDB);
      return this.defaultResponse;
    } catch (error) {
      Logger.error(error);
      throw response(error, 400);
    }
  }

  async store(request, response, auth, idToUpdate) {
    try {
      const bodyRequest = request.all();
      const {navers} = bodyRequest;
      delete bodyRequest.navers;
      let createdStatus = 201;
      let responseData = {};
      if (idToUpdate) {
        this.projectModel = await ProjectModel.findOrFail(idToUpdate);
        createdStatus = 200;
        responseData = this.projectModel;
      }
      this.projectModel.merge(bodyRequest);
      await this.projectModel.save();
      await this.naverProjectBusiness.storeProjectNaver(this.projectModel.id, navers);
      this.defaultResponse = this.defaultResponse(responseData, createdStatus);
      return this.defaultResponse;
    } catch (error) {
      Logger.error(error);
      throw response(error, 400);
    }
  }

  update(request) {
    return this.store(request, null, null, request.params.id);
  }

  async show(request) {
    try {
      const {id} = request.params;
      let project = await ProjectModel.query().where('id', id).select('id', 'name').fetch();
      project = project.toJSON();
      if (Array.isArray(project) && project.length > 0 ) {
        project = await Promise.all(project.map(async (item) => {
          const projectSelected = item;
          projectSelected.navers = await this.naverModel.getNaversByProject(id);
          return projectSelected;
        }));
      }
      this.defaultResponse = this.defaultResponse(project);
      return this.defaultResponse;
    } catch (error) {
      Logger.error(error);
      throw response(error, 400);
    }
  }

  async destroy(request) {
    try {
      const {id} = request.params;
      const naver = await ProjectModel.find(id);
      await naver.delete();
      this.defaultResponse = this.defaultResponse(naver);
      return this.defaultResponse;
    } catch (error) {
      Logger.error(error);
      throw response(error, 400);
    }
  }
}

module.exports = ProjectBusiness;
