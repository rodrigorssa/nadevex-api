const NaverProjectModel = use('App/Models/Naversproject');


class NaverProject {
  async storeNaverProject(naverId, projects) {
    await NaverProjectModel
        .query()
        .where('naver_id', naverId)
        .delete();
    for (const project of projects) {
      const naverProjectModel = new NaverProjectModel();
      naverProjectModel.merge({
        naver_id: naverId,
        project_id: project,
      });
      await naverProjectModel.save();
    }
  }
}

module.exports = NaverProject;
