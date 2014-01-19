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

test('Create complete', function(t) {
  // see http://en.wikipedia.org/wiki/Complete_bipartite_graph
  var m = 3, n = 4;
  var graph = generators.completeBipartite(m, n);

  t.equal(graph.getNodesCount(), m + n, "Unexpected number of nodes for complete bipartite graph");
  t.equal(graph.getLinksCount(), (m * n), "Unexpected number of links for complete bipartite graph");
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
  t.test('3x4 grid', function (t) {
    var graph = generators.grid(3, 4);
    t.equal(graph.getNodesCount(), 12, "Unexpected number of nodes for grid graph");
    t.equal(graph.getLinksCount(), 17, "Unexpected number of links for grid graph");
    t.end();
  });

  t.test('1x1 grid', function (t) {
    var graph = generators.grid(1, 1);
    t.equal(graph.getNodesCount(), 1, "Unexpected number of nodes for 1x1 grid graph");
    t.equal(graph.getLinksCount(), 0, "Unexpected number of links for 1x1 grid graph");
    t.end();
  });

  t.test('1x2 grid', function (t) {
    // this is a path of two nodes *--*
    var graph = generators.grid(1, 2);
    t.equal(graph.getNodesCount(), 2, "Unexpected number of nodes for 1x2 grid graph");
    t.equal(graph.getLinksCount(), 1, "Unexpected number of links for 1x2 grid graph");
    t.end();
  });
});

test('Create balanced binary tree', function(t) {
  // This is a binary tree graph, of height 2:
  //      *
  //   *     *
  // *   * *   *
  var graph = generators.balancedBinTree(2);
  t.equal(graph.getNodesCount(), 7, "Unexpected number of nodes for balanced binary tree");
  t.equal(graph.getLinksCount(), 6, "Unexpected number of links for balanced binary tree");
  t.end();
});

test('Create no links', function(t) {
  // no links graph has no links.
  var graph = generators.noLinks(42);
  t.equal(graph.getNodesCount(), 42, "Unexpected number of nodes in noLinks graph");
  t.equal(graph.getLinksCount(), 0, "Unexpected number of links in noLinks graph");
  t.end();
});


test('Create grid3d', function(t) {
  // grid is a grid. This is 3 x 4 x 2 grid:
  //
  //   *---*--*--*
  //  /  /  /  / |
  // *--*--*--*  *
  // |  |  |  | /|
  // *--*--*--*  *
  // |  |  |  | /
  // *--*--*--*
  //
  t.test('3x4x2 grid', function (t) {
    var graph = generators.grid3(3, 4, 2);
    t.equal(graph.getNodesCount(), 24, "Unexpected number of nodes for grid3 graph");
    t.equal(graph.getLinksCount(), 46, "Unexpected number of links for grid3 graph");
    t.end();
  });

  t.test('1x1x1 grid', function (t) {
    var graph = generators.grid3(1, 1, 1);
    t.equal(graph.getNodesCount(), 1, "Unexpected number of nodes for 1x1x1 grid3 graph");
    t.equal(graph.getLinksCount(), 0, "Unexpected number of links for 1x1x1 grid3 graph");
    t.end();
  });

  t.test('1x2 grid', function (t) {
    // this is a path of two nodes *--*
    var graph = generators.grid3(1, 2, 1);
    t.equal(graph.getNodesCount(), 2, "Unexpected number of nodes for 1x2x1 grid3 graph");
    t.equal(graph.getLinksCount(), 1, "Unexpected number of links for 1x2x1 grid3 graph");
    t.end();
  });
});
