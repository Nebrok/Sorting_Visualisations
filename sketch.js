
let size = [900, 600];

let centre;
let sortAlgo;

let data = [];

function setup() {
  createCanvas(size[0], size [1]);
  background(75)

  for(let i = 0; i < 10000; i++) {
    data.push(random());
  }

  centre = createVector(size[0]/2, size[1]/2);
  sortAlgo = new BubbleSort(centre, size[0] - 100, size[1] - 100, data);
  frameRate(60)

}

function draw() {
  background(75);
  
  //for (let count = 0; count < 1000; count++) {
  //  sortAlgo.step()
  //}
  sortAlgo.sort();
  if (sortAlgo.is_sorted() == true) {
    noLoop()
  }
  sortAlgo.draw();
  
}
