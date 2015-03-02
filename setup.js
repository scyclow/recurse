EXPAND_PROB = 0.9;

var init = function(self, parent) {
  var DOM = document.createElement('div');
  DOM.setAttribute('class', self.name);
  DOM.style['height'] = self.size;
  DOM.style['width'] = self.size;

  self.children = [];
  self.parent = parent;
  self.parent.DOM.appendChild(DOM);
  self.DOM = DOM;

  self.expand = function() {
    for (var i=0; i<self.amount; i++) {
      var child = new self.childType(self);
      self.children.push(child)
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

function recurse(parent, prob) {
  if (prob <= 0) { return; }
  for (var i=0; i<parent.children.length; i++) {
    var child = parent.children[i];
    randExec(prob, function() {
      child.expand();
      recurse(child, prob - 0.2);
    });
  }
}

function randExec(prob, func) {
  if (Math.random() < prob) { func(); }
}
