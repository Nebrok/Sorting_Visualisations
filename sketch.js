
let size = [900, 800];

let centre;
let sortAlgo;

let data = [];
let data2 = [];

function setup() {
  createCanvas(size[0], size [1]);
  background(75)

  for(let i = 0; i < 100; i++) {
    data_item = random()
    data.push(data_item);
    data2.push(data_item);
  }

  topCentre = createVector(size[0]/2, size[1]/4);
  bottomCentre = createVector(size[0]/2, size[1]/4 + size[1]/2)

  optimisedBubble = new OptimisedBubbleSort(bottomCentre, size[0] - 100, (400 - 100), data);
  bubble = new BubbleSort(topCentre, size[0] - 100, size[1]/2 - 100, data2)
  frameRate(60)

}

function draw() {
  background(75);
  
  for (let count = 0; count < 10; count++) {
    bubble.step();
    optimisedBubble.step();
  }
  //bubble.sort();
  //optimisedBubble.sort();
  
  if (bubble.is_sorted() == true) {
    noLoop()
  }
  bubble.draw();
  optimisedBubble.draw();
  
}
