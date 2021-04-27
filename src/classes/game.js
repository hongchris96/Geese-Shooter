const Goose = require('./goose');
const Robo = require('./robot');
const Util = require('../utils/utils');

class Game {
  constructor(options) {
    this.DIM_X = 900;
    this.DIM_Y = 550;
    this.NUM_GEESE = 5;
    this.geese = [];
    this.addGoose();
    this.robo = new Robo({game: this});
    this.actionKeys = [];
    this.randomPos = this.randomPos.bind(this);
  }

  addGoose() {
    for (let i = 0; i < this.NUM_GEESE; i++) {
      let newGoose = new Goose({pos: this.randomPos(), game: this});
      this.geese.push(newGoose);
    }
  }

  randomPos() {
    let x = Math.random() > 0.5 ? -99 : this.DIM_X + 99; 
    let y = Math.random() * this.DIM_Y - 70;
    return [x, y]; 
  }

  draw(cntx) {
    cntx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    for (let i = 0; i < this.geese.length; i++) {
      this.geese[i].draw(cntx);
    }
    this.robo.draw(this.actionKeys);
  }

  moveObjects() {
    this.geese.forEach(goose => {
      goose.move();
    });
  }

  wrap(pos, vel) {
    let x = pos[0];
    let y = pos[1];
    let newVel = vel;
    if (pos[0] > this.DIM_X) { 
      x -= this.DIM_X + 99; 
      y = Math.random() * this.DIM_Y - 70;
      newVel = Util.randomVec(2);
    }
    else if (pos[0] < -99) {
      x += this.DIM_X + 99;
      y = Math.random() * this.DIM_Y - 70;
      newVel = Util.randomVec(2);
    }
    return [[x, y], newVel];
  }

  addKeysListener() {
    document.addEventListener("keydown", (e) => {
      switch(e.key) {
        case "w": 
          if (!this.actionKeys.includes("up")) this.actionKeys.push('up');
          break;
        case "a": 
          if (!this.actionKeys.includes("left")) this.actionKeys.push('left');
          break;
        case "s": 
          if (!this.actionKeys.includes("down")) this.actionKeys.push('down');
          break;
        case "d": 
          if (!this.actionKeys.includes("right")) this.actionKeys.push('right');
          break;
      }
      this.robo.move(this.actionKeys);
    });
  }

  removeKeysListener() {
    document.addEventListener("keyup", (e) => {
      switch(e.key) {
        case "w": 
          this.actionKeys = this.actionKeys.filter(ele => ele !== "up");
          break;
        case "a": 
          this.actionKeys = this.actionKeys.filter(ele => ele !== "left");
          break;
        case "s": 
          this.actionKeys = this.actionKeys.filter(ele => ele !== "down");
          break;
        case "d": 
          this.actionKeys = this.actionKeys.filter(ele => ele !== "right");
          break;
      }
      this.robo.move(this.actionKeys);
    });
  }

}

module.exports = Game;