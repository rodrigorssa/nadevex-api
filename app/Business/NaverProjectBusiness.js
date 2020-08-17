const NaverProjectModel = use('App/Models/Naversproject');


class NaverProject {
  async storeNaverProject(naverToUpdate, projects, newNaver) {
    const naverId = naverToUpdate || newNaver;
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
  async storeProjectNaver(project, navers) {
    const projectId = project;
    await NaverProjectModel
        .query()
        .where('project_id', projectId)
        .delete();
    for (const naver of navers) {
      const naverProjectModel = new NaverProjectModel();
      naverProjectModel.merge({
        naver_id: naver,
        project_id: projectId,
      });
      await naverProjectModel.save();
    }
  }
}

module.exports = NaverProject;
