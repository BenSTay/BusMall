'use strict';

var image1 = document.getElementById('productOne');
var image2 = document.getElementById('productTwo');
var image3 = document.getElementById('productThree');
var testButton = document.getElementById('testbutton');

function Product(productName,img) {
  this.productName = productName,
  this.img = img;
  this.votes = 0;
  this.timesOnPage = 0;
}

var allProducts = [
  new Product('R2-D2 Bag','img/bag.jpg'),
  new Product('Banana Slicer','img/banana.jpg'),
  new Product('iPad TP Dispenser','img/bathroom.jpg'),
  new Product('Toeless Boots','img/boots.jpg'),
  new Product('Breakfast Maker','img/breakfast.jpg'),
  new Product('Meatball Bubblegum','img/bubblegum.jpg'),
  new Product('Convex Chair','img/chair.jpg'),
  new Product('Cthulhu Action Figure','img/cthulhu.jpg'),
  new Product('Duck Beak Dog Muzzle','img/dog-duck.jpg'),
  new Product('Dragon Meat','img/dragon.jpg'),
  new Product('Dinnerware Pen Lids','img/pen.jpg'),
  new Product('Pet Sweep','img/pet-sweep.jpg'),
  new Product('Pizza Scissors','img/scissors.jpg'),
  new Product('Shark Sleeping Bag','img/shark.jpg'),
  new Product('Baby Sweep Onesie','img/sweep.png'),
  new Product('Tauntaun Sleeping Bag','img/tauntaun.jpg'),
  new Product('Unicorn Meat','img/unicorn.jpg'),
  new Product('USB Tentacle','img/usb.gif'),
  new Product('Reverse Water Can','img/water-can.jpg'),
  new Product('Wine Glass','img/wine-glass.jpg')
];

var productsOnScreen = [];

function randInt(max) {
  return Math.round(Math.random()*max);
}

function showNewProducts() {
  for (var i = 0; i < 3; i++) {
    productsOnScreen.unshift(allProducts.splice(randInt(allProducts.length-1),1)[0]);
    productsOnScreen[0].timesOnPage++;
    if (productsOnScreen.length > 6){
      allProducts.push(productsOnScreen.pop());
    }
  }
  image1.src = productsOnScreen[0].img;
  image2.src = productsOnScreen[1].img;
  image3.src = productsOnScreen[2].img;
}

testButton.addEventListener('click', showNewProducts);

showNewProducts();