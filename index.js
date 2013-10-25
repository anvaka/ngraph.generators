module.exports = {
  ladder: ladder,
  complete: complete,
  path: path
};

var createGraph = require('ngraph.graph');

/**
 * Ladder graph is a graph in form of ladder
 * @param n {Number} Represents number of steps in the ladder
 */
function ladder(n) {
  if (!n || n < 0) {
    throw new Error("Invalid number of nodes");
  }

  var g = createGraph(),
      i;

  for (i = 0; i < n - 1; ++i) {
    g.addLink(i, i + 1);
    // first row
    g.addLink(n + i, n + i + 1);
    // second row
    g.addLink(i, n + i);
    // ladder's step
  }

  g.addLink(n - 1, 2 * n - 1);
  // last step in the ladder;

  return g;
}

/**
 * Generates complete graph Kn.
 *
 * @param n {Number}  represents number of nodes in the complete graph.
 */
function complete(n) {
  if (!n || n < 1) {
    throw new Error("At least two nodes are expected for complete graph");
  }

  var g = createGraph(),
      i,
      j;

  for (i = 0; i < n; ++i) {
    for (j = i + 1; j < n; ++j) {
      if (i !== j) {
        g.addLink(i, j);
      }
    }
  }

  return g;
}

/**
 * Generates a path-graph with n steps.
 *
 * @param n {Number} number of nodes in the path
 */
function path(n) {
  if (!n || n < 0) {
    throw new Error("Invalid number of nodes");
  }

  var g = createGraph(),
      i;

  g.addNode(0);

  for (i = 1; i < n; ++i) {
    g.addLink(i - 1, i);
  }

  return g;
}
