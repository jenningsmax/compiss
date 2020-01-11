const calculateAngle = magnometer => {
  var angle = 0;

  if (magnometer) {
    let { x, y, z } = magnometer;

    if (Math.atan2(y, x) >= 0) {
      angle = Math.atan2(y, x) * (180 / Math.PI);
    } else {
      angle = Math.atan2(y, x) + 2 * (180 / Math.PI);
    }
  }

  return Math.round(angle);
};

export default calculateAngle;
