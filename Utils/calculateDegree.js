// Match the device top with pointer 0° degree. (By default 0° starts from the right of the device.)
const calculateDegree = magnometer => {
  return magnometer - 90 >= 0 ? magnometer - 90 : magnometer + 271;
};

export default calculateDegree;
