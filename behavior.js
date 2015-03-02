TIME = 30;
var body = {
  DOM: document.getElementsByTagName('body')[0],
  size: 500
};

function run() {
  var grid = new Grid(body);
  recurse(grid, EXPAND_PROB);
};

document.addEventListener("DOMContentLoaded", function(event) {
//  setInterval(run, TIME);
run();
});

