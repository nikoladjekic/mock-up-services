// mock up services back-end
const getMethod = (req, res) => {
  res.status(200).json("get method launched");
};

module.exports = { getMethod };
