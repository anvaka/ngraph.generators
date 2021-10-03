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

test('boundary conditions are checked', function(t) {
  t.throws(() => generators.ladder(), "Ladder graph with no nodes should throw");
  t.throws(() => generators.ladder(0), "Ladder graph with 0 nodes should throw");
  t.throws(() => generators.ladder(-10), "Ladder graph with negative nodes should throw");

  t.throws(() => generators.circularLadder(), "Circular ladder graph with no nodes should throw");
  t.throws(() => generators.circularLadder(0), "Circular ladder graph with 0 nodes should throw");
  t.throws(() => generators.circularLadder(-10), "Circular ladder graph with negative nodes should throw");

  t.throws(() => generators.complete(   ), "Complete graph with no nodes should throw");
  t.throws(() => generators.complete(  0), "Complete graph with 0 nodes should throw");
  t.throws(() => generators.complete(-10), "Complete graph with negative nodes should throw");

  t.throws(() => generators.path(   ), "Path graph with no nodes should throw");
  t.throws(() => generators.path(  0), "Path graph with 0 nodes should throw");
  t.throws(() => generators.path(-10), "Path graph with negative nodes should throw");

  t.throws(() => generators.balancedBinaryTree(   ), "Binary tree graph with no nodes should throw");
  t.throws(() => generators.balancedBinaryTree(-10), "Binary tree graph with negative nodes should throw");

  t.throws(() => generators.noLinks(-10), "No links graph with negative nodes should throw");
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
  t.equal(graph.getLinksCount(), (size * (size - 1)/2), "Unexpected number of links for complete graph");
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
  // circular ladder is like a ladder, but last two and first two 
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

// grid is a grid. This is 3 x 4 grid:
// *--*--*--*
// |  |  |  |
// *--*--*--*
// |  |  |  |
// *--*--*--*
test('3x4 grid', function (t) {
  var graph = generators.grid(3, 4);
  t.equal(graph.getNodesCount(), 12, "Unexpected number of nodes for grid graph");
  t.equal(graph.getLinksCount(), 17, "Unexpected number of links for grid graph");
  t.end();
});

test('1x1 grid', function (t) {
  var graph = generators.grid(1, 1);
  t.equal(graph.getNodesCount(), 1, "Unexpected number of nodes for 1x1 grid graph");
  t.equal(graph.getLinksCount(), 0, "Unexpected number of links for 1x1 grid graph");
  t.end();
});

test('1x2 grid', function (t) {
  // this is a path of two nodes *--*
  var graph = generators.grid(1, 2);
  t.equal(graph.getNodesCount(), 2, "Unexpected number of nodes for 1x2 grid graph");
  t.equal(graph.getLinksCount(), 1, "Unexpected number of links for 1x2 grid graph");
  t.end();
});

test('Create balanced binary tree', function(t) {
  // This is a binary tree graph, of height 2:
  //      *
  //   *     *
  // *   * *   *
  let names = ['balancedBinTree', 'balancedBinaryTree', 'binTree', 'binaryTree'];
  names.forEach(name => {
    var graph = generators[name](2);
    t.equal(graph.getNodesCount(), 7, "Unexpected number of nodes for balanced binary tree");
    t.equal(graph.getLinksCount(), 6, "Unexpected number of links for balanced binary tree");
  });
  t.end();
});

test('Create no links', function(t) {
  // no links graph has no links.
  var graph = generators.noLinks(42);
  t.equal(graph.getNodesCount(), 42, "Unexpected number of nodes in noLinks graph");
  t.equal(graph.getLinksCount(), 0, "Unexpected number of links in noLinks graph");
  t.end();
});


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
test('3x4x2 grid', function (t) {
  var graph = generators.grid3(3, 4, 2);
  t.equal(graph.getNodesCount(), 24, "Unexpected number of nodes for grid3 graph");
  t.equal(graph.getLinksCount(), 46, "Unexpected number of links for grid3 graph");
  t.end();
});

test('1x1x1 grid', function (t) {
  var graph = generators.grid3(1, 1, 1);
  t.equal(graph.getNodesCount(), 1, "Unexpected number of nodes for 1x1x1 grid3 graph");
  t.equal(graph.getLinksCount(), 0, "Unexpected number of links for 1x1x1 grid3 graph");
  t.end();
});

test('1x2x1 grid', function (t) {
  // this is a path of two nodes *--*
  var graph = generators.grid3(1, 2, 1);
  t.equal(graph.getNodesCount(), 2, "Unexpected number of nodes for 1x2x1 grid3 graph");
  t.equal(graph.getLinksCount(), 1, "Unexpected number of links for 1x2x1 grid3 graph");
  t.end();
});

test('4 nodes 2 link, 0% rebuild', function (t) {
  var graph = generators.wattsStrogatz(4, 2, 0);
  t.equal(graph.getNodesCount(), 4, "Unexpected number of nodes for Watts-Strogatz graph n=4, k=2, p=0");
  t.equal(graph.getLinksCount(), 4, "Unexpected number of links for Watts-Strogatz graph n=4, k=2, p=0");
  t.end();
});

test('20 nodes 0 links, 100% rebuild', function (t) {
  var graph = generators.wattsStrogatz(20, 0, 1);
  t.equal(graph.getNodesCount(), 20, "Unexpected number of nodes for Watts-Strogatz graph n=20, k=0, p=1");
  t.equal(graph.getLinksCount(), 0, "Unexpected number of links for Watts-Strogatz graph n=20, k=0, p=1");
  t.end();
});

test('it can use custom factory', function(t) {
  var called = 0;
  generators.factory(createGraph).ladder(3);
  // t.equal(graph.getNodesCount(), 6, "Unexpected number of nodes for ladder graph");
  // t.equal(graph.getLinksCount(), 7, "Unexpected number of links for ladder graph");
  t.ok(called > 0, 'Factory was called')
  t.end();

  function createGraph() {
    return {
      addLink: addLink
    }
  }

  function addLink(/* from, to */) {
    called += 1;
  }
});

