'use strict';

var image1 = document.getElementById('productOne');
var image2 = document.getElementById('productTwo');
var image3 = document.getElementById('productThree');
var results = document.getElementById('results');

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
var voteCount = 0;

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

function checkVoteOver(voteCount){
  if (voteCount === 25) {
    image1.parentElement.removeChild(image1);
    image2.parentElement.removeChild(image2);
    image3.parentElement.removeChild(image3);
    return true;
  }
}

var listItem;
var percent;
function displayResults() {
  allProducts = allProducts.concat(productsOnScreen);
  for (var i of allProducts){
    if (i.timesOnPage > 0){
      percent = Math.floor(i.votes/i.timesOnPage*100);
    } else {
      percent = 0;
    }
    listItem = document.createElement('li');
    listItem.textContent = i.productName;
    results.appendChild(listItem);
    listItem = document.createElement('li');
    listItem.textContent = i.votes+' votes, '+percent+'% pick rate';
    results.appendChild(listItem);
  }
}

function buttonEvent(i){
  voteCount++;
  productsOnScreen[i].votes++;
  if (checkVoteOver(voteCount)){
    displayResults();
    return;
  }
  showNewProducts();
}

image1.addEventListener('click', function(){
  buttonEvent(0);
});

image2.addEventListener('click', function(){
  buttonEvent(1);
});

image3.addEventListener('click', function(){
  buttonEvent(2);
});

showNewProducts();