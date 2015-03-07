TIME = 333;
var body = {
  DOM: document.getElementsByTagName('body')[0],
  size: 500,
  children: []
};

function setup() {
  body.DOM.innerHTML = '';
  grid = new Grid(body);
  recurse(grid, randExpand, EXPAND_PROB);
};

function run() {
  recurse(grid, changeColor);
}

document.addEventListener("DOMContentLoaded", function(event) {
  setup();
  setInterval(run, TIME);
});

