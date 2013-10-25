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

test('Create complete', function(t) {
  var size = 5;
  var graph = generators.complete(size);
  // Complete graph has all nodes connected with each other.
  t.equal(graph.getNodesCount(), size, "Unexpected number of nodes for complete graph");
  t.equal(graph.getLinksCount(), (size * (size - 1))/2, "Unexpected number of links for complete graph");
  t.end();
});
