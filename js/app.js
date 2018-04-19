'use strict';

var image1 = document.getElementById('productOne');
var image2 = document.getElementById('productTwo');
var image3 = document.getElementById('productThree');
var images = document.getElementById('images');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

function renderInstructions(ctx){
  ctx.font = '24px Cambria, Cochin, Georgia, Times, \'Times New Roman\'';
  ctx.fillStyle = '#000';
  ctx.textAlign = 'center';
  ctx.fillText('Instructions:',canvas.width/2,canvas.height/2-48);
  ctx.fillText('Pictures of three of our products will be displayed randomly on the screen.',canvas.width/2,canvas.height/2-16);
  ctx.fillText('Click on the picture of your favorite product of the three to vote for it.',canvas.width/2,canvas.height/2+16);
  ctx.fillText('After you have voted 25 times, the voting results will be shown here.',canvas.width/2,canvas.height/2+48);
}


Product.products = [];
Product.allNames = [];
Product.allVotes = [];
Product.allTimesDisplayed = [];

function Product(productName,img) {
  this.productName = productName,
  this.img = img;
  this.votes = 0;
  this.timesDisplayed = 0;
  Product.products.push(this);
}
function getProductList(){
  Product.products = JSON.parse(localStorage.getItem('products'));
  if (!Product.products){
    Product.products = [];
    new Product('R2-D2 Bag','img/bag.jpg');
    new Product('Banana Slicer','img/banana.jpg');
    new Product('iPad TP Dispenser','img/bathroom.jpg');
    new Product('Toeless Boots','img/boots.jpg');
    new Product('Breakfast Maker','img/breakfast.jpg');
    new Product('Meatball Bubblegum','img/bubblegum.jpg');
    new Product('Convex Chair','img/chair.jpg');
    new Product('Cthulhu Action Figure','img/cthulhu.jpg');
    new Product('Duck Beak Dog Muzzle','img/dog-duck.jpg');
    new Product('Dragon Meat','img/dragon.jpg');
    new Product('Dinnerware Pen Lids','img/pen.jpg');
    new Product('Pet Sweep','img/pet-sweep.jpg');
    new Product('Pizza Scissors','img/scissors.jpg');
    new Product('Shark Sleeping Bag','img/shark.jpg');
    new Product('Baby Sweep Onesie','img/sweep.png');
    new Product('Tauntaun Sleeping Bag','img/tauntaun.jpg');
    new Product('Unicorn Meat','img/unicorn.jpg');
    new Product('USB Tentacle','img/usb.gif');
    new Product('Reverse Water Can','img/water-can.jpg');
    new Product('Wine Glass','img/wine-glass.jpg');
  }
}


var voteCount = 0;
var displayedProducts = [];

function randInt(max) {
  return Math.floor(Math.random()*max);
}

function showNewProducts() {
  for (var i = 0; i < 3; i++) {
    displayedProducts.unshift(Product.products.splice(randInt(Product.products.length-1),1)[0]);
    displayedProducts[0].timesDisplayed++;
    if (displayedProducts.length > 6){
      Product.products.push(displayedProducts.pop());
    }
  }

  image1.src = displayedProducts[0].img;
  image1.alt = displayedProducts[0].productName;
  image2.src = displayedProducts[1].img;
  image2.alt = displayedProducts[1].productName;
  image3.src = displayedProducts[2].img;
  image3.alt = displayedProducts[2].productName;
}

function checkVoteOver(voteCount){
  if (voteCount === 25) {
    images.removeChild(image1);
    images.removeChild(image2);
    images.removeChild(image3);
    images.textContent = 'Thank You!';
    images.style.fontSize = '120px';
    return true;
  }
}

function getResults(){
  for (var i of Product.products){
    Product.allNames.push(i.productName);
    Product.allTimesDisplayed.push(i.timesDisplayed);
    Product.allVotes.push(i.votes);
  }
}

function displayResults() {
  Product.products = Product.products.concat(displayedProducts);
  localStorage.setItem('products',JSON.stringify(Product.products));
  ctx.clearRect(0,0,canvas.width,canvas.height);
  getResults();

  new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: Product.allNames,
      datasets: [
        {
          label: '# of votes',
          data: Product.allVotes,
          backgroundColor: '#222'
        },
        {
          label: '# times displayed',
          data: Product.allTimesDisplayed,
          backgroundColor: '#555'
        }
      ]
    },
    options: {
      responsive: false,
      scales: {
        xAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      title: {
        display: true,
        text: 'Results'
      }
    }
  });
}

function buttonEvent(e){
  voteCount++;

  for(var i of displayedProducts){
    console.log(e.target.src);
    console.log(i.img);
    if(e.target.alt === i.productName) {
      i.votes++;
    }
  }
  if (checkVoteOver(voteCount)){
    displayResults();
    return;
  }
  showNewProducts();
}

images.addEventListener('click', buttonEvent);

renderInstructions(ctx);

getProductList();
showNewProducts();