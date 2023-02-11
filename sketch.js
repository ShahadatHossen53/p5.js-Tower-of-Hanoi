function setup() {
  var ww = windowWidth > 600 ? windowWidth : 600;
  var wh = windowHeight > 500 ? windowHeight : 500;
  createCanvas(ww, wh);
  createDoms();
  dest = "C";
  aux = "B";
  createPegsDisks();

}

function draw() {
  background(54, 189, 243);
  displayDoms();
  animationController();
}

function TowerOfHanoi(n, frompeg, topeg, auxpeg) {
  if (n == 1) {
    //console.log("Move disk 1 from peg "+frompeg+" to peg "+topeg);
    moves.push([frompeg, topeg]);
    return;
  }
  TowerOfHanoi(n - 1, frompeg, auxpeg, topeg);
  //console.log("Move disk from peg "+frompeg+" to peg "+topeg);
  moves.push([frompeg, topeg]);

  TowerOfHanoi(n - 1, auxpeg, topeg, frompeg);
}











