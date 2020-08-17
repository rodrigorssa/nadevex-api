const NaverModel = use('App/Models/Naver');
const NaverProjectBusiness = use('App/Business/NaverProjectBusiness');
const {response} = use('App/Factories/Response');
const Logger = use('Logger');
const moment = require('moment-timezone');
const {defaultAppTimezone} = use('App/Enums/Timezone');
class NaverBusiness {
  constructor() {
    this.naverModel = new NaverModel();
    this.naverProjectBusiness = new NaverProjectBusiness();
    this.defaultResponse = response;
  }
  async index(request, response, auth) {
    try {
      const dataFromDB = await this.naverModel.indexQueryBuilder(
          request.get(),
          auth.user.id,
      );
      this.defaultResponse = this.defaultResponse(dataFromDB);
      return this.defaultResponse;
    } catch (error) {
      Logger.error(error);
      throw response(error, 400);
    }
  }
  async store(request, response, auth, idToUpdate) {
    try {
      const userId = auth.user.id;
      const bodyRequest = request.all();
      const {projects} = bodyRequest;
      delete bodyRequest.projects;
      let createdStatus = 201;
      let responseData = {};
      if (idToUpdate) {
        this.naverModel = await NaverModel.findOrFail(idToUpdate);
        createdStatus = 200;
        responseData = this.naverModel.toJSON();
      }
      bodyRequest.admission_date =
        bodyRequest.admission_date ||
        moment().tz(defaultAppTimezone).format('YYYY-MM-DD');
      bodyRequest.user_id = userId;
      this.naverModel.merge(bodyRequest);
      await this.naverModel.save();
      await this.naverProjectBusiness.storeNaverProject(idToUpdate, projects, this.naverModel.id);
      this.defaultResponse = this.defaultResponse(responseData, createdStatus);
      return this.defaultResponse;
    } catch (error) {
      Logger.error(error);
      throw response(error, 400);
    }
  }

  update(request, response, auth) {
    return this.store(request, response, auth, request.params.id);
  }

  async show(request, response, auth) {
    try {
      const userId = auth.user.id;
      const {id} = request.params;
      const [naver] = await this.naverModel.indexQueryBuilder({}, userId, id);
      if (naver) {
        naver.projects = await this.naverModel.getProjects(id);
      }
      this.defaultResponse = this.defaultResponse(naver);
      return this.defaultResponse;
    } catch (error) {
      Logger.error(error);
      throw response(error, 400);
    }
  }

  async destroy(request) {
    try {
      const {id} = request.params;
      const naver = await NaverModel.find(id);
      await naver.delete();
      this.defaultResponse = this.defaultResponse(naver);
      return this.defaultResponse;
    } catch (error) {
      Logger.error(error);
      throw response(error, 400);
    }
  }
}

module.exports = NaverBusiness;
