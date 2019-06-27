// 9 == left wrist and 10 == right wrist
let car;
let rocks;
let obs;
let video;
let poseNet;
let wristRx = 0;
let wristRy = 0;
let wristLx = 0;
let wristLy = 0;
var t = false;

function setup() {
  createCanvas(500, 500);
  car = new Car();
  rocks = new Rocks();
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on("pose", gotPoses);
  obs = [];

  var button = createButton("reset");
  button.mousePressed(resetSketch);
}

function resetSketch() {
  obs = [];
  loop();
}

function modelReady() {
  console.log("Model ready");
  t = true;
}
let a0 = 0;

function gotPoses(poses) {
  wristRx = poses[0].pose.keypoints[10].position.x;
  wristRy = poses[0].pose.keypoints[10].position.y;
  wristLx = poses[0].pose.keypoints[9].position.x;
  wristLy = poses[0].pose.keypoints[9].position.y;
}

function giveMeAngle(x1, y1, x2, y2) {
  // Passing left coordinates first
  mx = (x1 + x2) / 2;
  my = (y1 + y2) / 2;
  perp = my - y2;
  base = x2 - mx;
  return atan(perp, base);
}
let a, c;
c = 0;

function leftOrRight() {
  a = giveMeAngle(wristLx, wristLy, wristRx, wristRy);
  if (a * a0 < 0) {
    shift(a);
  }
  a0 = a;
}

function shift(a) {
  if (a > 0) {
    car.left();
  } else {
    car.right();
  }
}

function draw() {
  background(220);
  if (random(1) < 0.012) {
    obs.push(new Rocks());
  }

  car.show();
  car.move();
  leftOrRight();
  for (let o of obs) {
    o.show();
    o.move();
    if (car.collides(o)) {
      noLoop();
      console.log("game Over");
    }
  }

  collideRectRect(200, 200, 100, 150, mouseX, mouseY, 50, 75);
}
