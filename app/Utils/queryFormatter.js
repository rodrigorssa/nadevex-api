exports.queryFormatter = (obj) => {
  const newObj = {};
  const objQueryData = Object.getOwnPropertyNames(obj);

  objQueryData.forEach((item) => {
    if (obj[item]) {
      newObj[item] = obj[item];
    }
  });
  return newObj;
};
