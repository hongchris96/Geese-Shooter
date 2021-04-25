const MovingObject = require('./classes/moving_object');
window.MovingObject = MovingObject;

document.addEventListener("DOMContentLoaded", (e) => {
  const kanvas = document.getElementById("game-canvas");
  const cntx = kanvas.getContext("2d");

  // testing
  window.cntx = cntx;
  const x = new MovingObject({pos: [300,300], velo:[2,3], radius: 5, color: "red"});
  x.draw(cntx);
});