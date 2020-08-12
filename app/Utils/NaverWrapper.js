exports.wrapNaverQueryIndex = (dataFromDB) => Promise.all(dataFromDB.map( (item) => ({
  id: item.id,
  name: item.name,
  birth_date: item.birth_date,
  admission_date: item.admission_date,
  job_role: item.role.role,
})));
