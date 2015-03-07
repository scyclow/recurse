EXPAND_PROB = 0.9;
EXPAND_DEC = 0.1;

var init = function(self, parent) {
  var DOM = document.createElement('div');
  DOM.setAttribute('class', self.name);
  DOM.style['height'] = self.size;
  DOM.style['width'] = self.size;
  self.DOM = DOM;

  self.parent = parent;
  self.parent.children.push(self);
  self.parent.DOM.appendChild(DOM);

  self.children = [];

  self.expand = function() {
    for (var i=0; i<self.amount; i++) {
      var child = self.children[i];
      
      var child = new self.childType(self);
    }
  }
}

function Grid(parent) {
  this.amount = 4;
  this.size = parent.size;
  this.name = 'grid';
  this.childType = Cell;
  init(this, parent);
  this.expand();
}

function Cell(parent) {
  this.name = 'cell';
  this.amount = 1;
  this.size = parent.size/2;
  this.childType = Grid;
  init(this, parent);
}

Cell.prototype.randColor = function() {
  var color = randColor();
  this.DOM.style['background-color'] = color;
  this.DOM.style['outline-color'] = color;
}

Cell.prototype.randRadius = function() {
  var sizeStr = this.DOM.style.width;
  var size = +sizeStr.substring(sizeStr, sizeStr.length-2);
  this.DOM.style['border-radius'] = size * Math.random();
}

function recurse(parent, func, base) { 
  if (base === 0) { return; }
  for (var i=0; i<parent.children.length; i++) {
    var child = parent.children[i];
    var newBase = func(child, base);
    recurse(child, func, newBase);
  }
};

function randExpand(unit, prob) {
  if (prob <= 0) { return 0; }

  randExec(prob, function() {
    if (unit instanceof Cell) { unit.expand(); }
  });

  return prob - EXPAND_DEC;
}

function changeColor(unit) {
  if (!unit.children.length) {
    unit.randColor();
    unit.randRadius();
    return 0;
  }
};

function randExec(prob, func) {
  if (Math.random() < prob) { func(); }
}

function randColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
