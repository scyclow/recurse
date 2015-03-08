TIME = 250;
var bodySize = Math.min( window.innerWidth, window.innerHeight );
var body = {
  DOM: document.getElementsByTagName('body')[0],
  size: bodySize,
  children: []
};

function setup() {
  body.DOM.innerHTML = '';
  grid = new Grid(body);
  grid.DOM.setAttribute('id', 'parent');
  recurse(grid, randExpand, EXPAND_PROB);
};

function run() {
  recurse(grid, changeColor);
}

document.addEventListener("DOMContentLoaded", function(event) {
  setup();
  setInterval(run, TIME);
  setInterval(function() {
    body.DOM.style['background-color'] = randColor();
  }, TIME*2);
});

