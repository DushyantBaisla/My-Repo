function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let x = getRandomInt(500, 1000);
  let y = getRandomInt(500, 1000);
  let ran = getRandomInt(x, y)
  console.log(ran);
