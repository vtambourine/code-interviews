var carousel = document.getElementById('carousel');
var ctx = carousel.getContext('2d');

ctx.font = "20px Arial";
ctx.fillText('Hello, World!', 15, 70);

var image = new Image();
image.addEventListener('load', function() {
    ctx.drawImage(image, 50, 50);
    // draw();
});

var stopped = true;

carousel.addEventListener('mouseover', function() {
    stopped = false;
    draw();
})

carousel.addEventListener('mouseout', function() {
    stopped = true;
})

image.src = 'file:///Users/benjamin/Projects/publitas-challenge/bobdylan.jpg';

var i = 0;
function draw() {
    console.log('done');
    i++;
    ctx.clearRect(0, 0, 500, 500);
    ctx.drawImage(image, i, 0);
    !stopped && window.requestAnimationFrame(draw);
}
