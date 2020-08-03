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
  async index() {
    try {
      const dataFromDB = await NaverModel.query().with('user').with('role').with('projects').fetch();
      this.defaultResponse = this.defaultResponse(dataFromDB);
      return this.defaultResponse;
    } catch (error) {
      Logger.error(error);
      throw response(error, 400);
    }
  }

  async store(request, response, idToUpdate) {
    try {
      const bodyRequest = request.all();
      const {projects} = bodyRequest;
      delete bodyRequest.projects;
      let createdStatus = 201;
      let responseData = {};
      if (idToUpdate) {
        this.naverModel = await NaverModel.findOrFail(idToUpdate);
        createdStatus = 200;
        responseData = naverModel;
      }
      bodyRequest.admission_date = bodyRequest.admission_date || moment().tz(defaultAppTimezone).format('YYYY-MM-DD');
      this.naverModel.merge(bodyRequest);
      await this.naverModel.save();
      await this.naverProjectBusiness.storeNaverProject(this.naverModel.id, projects);
      this.defaultResponse = this.defaultResponse(responseData, createdStatus);
      return this.defaultResponse;
    } catch (error) {
      Logger.error(error);
      throw response(error, 400);
    }
  }

  update(request) {
    return this.store(request, null, request.params.id);
  }

  async show(request) {
    try {
      const {id} = request.params;
      const naver = await NaverModel.find(id);
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
