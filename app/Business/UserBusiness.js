const UserModel = use('App/Models/User');
const {response} = use('App/Factories/Response');
const Logger = use('Logger');
class UserBusiness {
  constructor() {
    this.userModel = new UserModel();
    this.defaultResponse = response;
  }
  async index() {
    try {
      const dataFromDB = await UserModel.all();
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
        this.userModel = await UserModel.findOrFail(idToUpdate);
        createdStatus = 200;
        responseData = this.userModel;
      }
      this.userModel.merge(bodyRequest);
      await this.userModel.save();
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
      const naver = await UserModel.find(id);
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
      const naver = await UserModel.find(id);
      await naver.delete();
      this.defaultResponse = this.defaultResponse(naver);
      return this.defaultResponse;
    } catch (error) {
      Logger.error(error);
      throw response(error, 400);
    }
  }
}

module.exports = UserBusiness;
