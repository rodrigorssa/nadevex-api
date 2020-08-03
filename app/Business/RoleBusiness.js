const RoleModel = use('App/Models/Role');
const {response} = use('App/Factories/Response');
const Logger = use('Logger');
class RoleBusiness {
  constructor() {
    this.roleModel = new RoleModel();
    this.defaultResponse = response;
  }
  async index() {
    try {
      const dataFromDB = await RoleModel.all();
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
      let createdStatus = 201;
      let responseData = {};
      if (idToUpdate) {
        this.roleModel = await RoleModel.findOrFail(idToUpdate);
        createdStatus = 200;
        responseData = this.roleModel;
      }
      this.roleModel.merge(bodyRequest);
      await this.roleModel.save();
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
      const naver = await RoleModel.find(id);
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
      const naver = await RoleModel.find(id);
      await naver.delete();
      this.defaultResponse = this.defaultResponse(naver);
      return this.defaultResponse;
    } catch (error) {
      Logger.error(error);
      throw response(error, 400);
    }
  }
}

module.exports = RoleBusiness;
