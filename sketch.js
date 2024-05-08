
let size = [900, 800];

let centre;
let sortAlgo;

let data = [];
let data2 = [];
let data3 = []

function setup() {
  createCanvas(size[0], size [1]);
  background(75)
  randomSeed()

  for(let i = 0; i < 128; i++) {
    data_item = random()
    data.push(random());
    data2.push(random());
    data3.push(data_item);

  }

  let reversed_ordered_data = data.sort().reverse()

  topCentre = createVector(size[0]/2, size[1]/4);
  bottomCentre = createVector(size[0]/2, size[1]/4 + size[1]/2)

  optimisedBubble = new OptimisedBubbleSort(bottomCentre, size[0] - 100, (400 - 100), data);
  bubble = new BubbleSort(topCentre, size[0] - 100, size[1]/2 - 100, data2)

  mergeSort2 = new TopDownMergeSort(topCentre, size[0] - 100, size[1]/2 - 100, reversed_ordered_data)
  mergeSort = new TopDownMergeSort(bottomCentre, size[0] - 100, (400 - 100), data3)
  frameRate(60)
}

function draw() {
  background(75);
  
  /*
  for (let count = 0; count < 10; count++) {
    bubble.step();
    optimisedBubble.step();
  }
  */
  //bubble.sort();
  //optimisedBubble.sort();

  //bubble.draw();
  //optimisedBubble.draw();

  //mergeSort.sort()
  //mergeSort.draw()
  //bubble.step();
  //bubble.draw();

  mergeSort.step()
  mergeSort2.step()
  mergeSort.draw()
  mergeSort2.draw()
}