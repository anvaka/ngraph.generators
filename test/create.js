var test = require('tap').test,
    generators = require('../');

test('Create ladder', function(t) {
  var graph = generators.ladder(3);
  // Ladder graph looks like this:
  // *--*--*
  // |  |  |
  // *--*--*
  t.equal(graph.getNodesCount(), 6, "Unexpected number of nodes for ladder graph");
  t.equal(graph.getLinksCount(), 7, "Unexpected number of links for ladder graph");
  t.end();
});

test('Create path', function(t) {
  var size = 5;
  var graph = generators.path(size);
  // Path is simple:
  // *--*--*--*--*
  t.equal(graph.getNodesCount(), size, "Unexpected number of nodes for path graph");
  t.equal(graph.getLinksCount(), (size - 1), "Unexpected number of links for path graph");
  t.end();
});

test('Create complete', function(t) {
  var size = 5;
  var graph = generators.complete(size);
  // Complete graph has all nodes connected with each other.
  t.equal(graph.getNodesCount(), size, "Unexpected number of nodes for complete graph");
  t.equal(graph.getLinksCount(), (size * (size - 1)), "Unexpected number of links for complete graph");
  t.end();
});

test('Circular ladder', function(t) {
  var size = 3;
  var graph = generators.circularLadder(size);
  // cricular ladder is like a ladder, but last two and first two 
  // nodes are connected
  // ┌-----┐
  // *--*--*
  // |  |  |
  // *--*--*
  // └-----┘
  t.equal(graph.getNodesCount(), 6, "Unexpected number of nodes for circular ladder graph");
  t.equal(graph.getLinksCount(), 9, "Unexpected number of links for circular ladder graph");
  t.end();
});

test('Create grid', function(t) {
  // grid is a grid. This is 3 x 4 grid:
  // *--*--*--*
  // |  |  |  |
  // *--*--*--*
  // |  |  |  |
  // *--*--*--*
  var graph = generators.grid(3, 4);
  t.equal(graph.getNodesCount(), 12, "Unexpected number of nodes for grid graph");
  t.equal(graph.getLinksCount(), 17, "Unexpected number of links for grid graph");
  t.end();
});
