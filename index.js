var createGraph = require('ngraph.graph');

module.exports = factory(createGraph);

// Allow other developers have their own createGraph
module.exports.factory = factory;

function factory(createGraph) {
  return {
    ladder: ladder,
    complete: complete,
    completeBipartite: completeBipartite,
    balancedBinTree: balancedBinTree,
    path: path,
    circularLadder: circularLadder,
    grid: grid,
    grid3: grid3,
    noLinks: noLinks,
    wattsStrogatz: wattsStrogatz,
    cliqueCircle: cliqueCircle
  };


  function ladder(n) {
  /**
  * Ladder graph is a graph in form of ladder
  * @param {Number} n Represents number of steps in the ladder
  */
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

  function circularLadder(n) {
  /**
  * Circular ladder with n steps.
  *
  * @param {Number} n of steps in the ladder.
  */
      if (!n || n < 0) {
          throw new Error("Invalid number of nodes");
      }

      var g = ladder(n);

      g.addLink(0, n - 1);
      g.addLink(n, 2 * n - 1);
      return g;
  }

  function complete(n) {
  /**
  * Complete graph Kn.
  *
  * @param {Number} n represents number of nodes in the complete graph.
  */
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

  function completeBipartite (n, m) {
  /**
  * Complete bipartite graph K n,m. Each node in the
  * first partition is connected to all nodes in the second partition.
  *
  * @param {Number} n represents number of nodes in the first graph partition
  * @param {Number} m represents number of nodes in the second graph partition
  */
    if (!n || !m || n < 0 || m < 0) {
      throw new Error("Graph dimensions are invalid. Number of nodes in each partition should be greater than 0");
    }

    var g = createGraph(),
        i, j;

    for (i = 0; i < n; ++i) {
      for (j = n; j < n + m; ++j) {
        g.addLink(i, j);
      }
    }

    return g;
  }

  function path(n) {
  /**
  * Path graph with n steps.
  *
  * @param {Number} n number of nodes in the path
  */
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


  function grid(n, m) {
  /**
  * Grid graph with n rows and m columns.
  *
  * @param {Number} n of rows in the graph.
  * @param {Number} m of columns in the graph.
  */
    if (n < 1 || m < 1) {
      throw new Error("Invalid number of nodes in grid graph");
    }
    var g = createGraph(),
        i,
        j;
    if (n === 1 && m === 1) {
      g.addNode(0);
      return g;
    }

    for (i = 0; i < n; ++i) {
      for (j = 0; j < m; ++j) {
        var node = i + j * n;
        if (i > 0) { g.addLink(node, i - 1 + j * n); }
        if (j > 0) { g.addLink(node, i + (j - 1) * n); }
      }
    }

    return g;
  }

  function grid3(n, m, z) {
  /**
  * 3D grid with n rows and m columns and z levels.
  *
  * @param {Number} n of rows in the graph.
  * @param {Number} m of columns in the graph.
  * @param {Number} z of levels in the graph.
  */
    if (n < 1 || m < 1 || z < 1) {
      throw new Error("Invalid number of nodes in grid3 graph");
    }
    var g = createGraph(),
        i, j, k;

    if (n === 1 && m === 1 && z === 1) {
      g.addNode(0);
      return g;
    }

    for (k = 0; k < z; ++k) {
      for (i = 0; i < n; ++i) {
        for (j = 0; j < m; ++j) {
          var level = k * n * m;
          var node = i + j * n + level;
          if (i > 0) { g.addLink(node, i - 1 + j * n + level); }
          if (j > 0) { g.addLink(node, i + (j - 1) * n + level); }
          if (k > 0) { g.addLink(node, i + j * n + (k - 1) * n * m ); }
        }
      }
    }

    return g;
  }

  function balancedBinTree(n) {
  /**
  * Balanced binary tree with n levels.
  *
  * @param {Number} n of levels in the binary tree
  */
    if (n < 0) {
      throw new Error("Invalid number of nodes in balanced tree");
    }
    var g = createGraph(),
        count = Math.pow(2, n),
        level;

    if (n === 0) {
      g.addNode(1);
    }

    for (level = 1; level < count; ++level) {
      var root = level,
        left = root * 2,
        right = root * 2 + 1;

      g.addLink(root, left);
      g.addLink(root, right);
    }

    return g;
  }

  function noLinks(n) {
  /**
  * Graph with no links
  *
  * @param {Number} n of nodes in the graph
  */
    if (n < 0) {
      throw new Error("Number of nodes should be >= 0");
    }

    var g = createGraph(), i;
    for (i = 0; i < n; ++i) {
      g.addNode(i);
    }

    return g;
  }

  function cliqueCircle(cliqueCount, cliqueSize) {
  /**
  * A circular graph with cliques instead of individual nodes
  *
  * @param {Number} cliqueCount number of cliques inside circle
  * @param {Number} cliqueSize number of nodes inside each clique
  */

    if (cliqueCount < 1) throw new Error('Invalid number of cliqueCount in cliqueCircle');
    if (cliqueSize < 1) throw new Error('Invalid number of cliqueSize in cliqueCircle');

    var graph = createGraph();

    for (var i = 0; i < cliqueCount; ++i) {
      appendClique(cliqueSize, i * cliqueSize)

      if (i > 0) {
        graph.addLink(i * cliqueSize, i * cliqueSize - 1);
      }
    }
    graph.addLink(0, graph.getNodesCount() - 1);

    return graph;

    function appendClique(size, from) {
      for (var i = 0; i < size; ++i) {
        graph.addNode(i + from)
      }

      for (var i = 0; i < size; ++i) {
        for (var j = i + 1; j < size; ++j) {
          graph.addLink(i + from, j + from)
        }
      }
    }
  }

  function wattsStrogatz(n, k, p, seed) {
  /**
  * Watts-Strogatz small-world graph.
  *
  * @param {Number} n The number of nodes
  * @param {Number} k Each node is connected to k nearest neighbors in ring topology
  * @param {Number} p The probability of rewiring each edge

  * @see https://github.com/networkx/networkx/blob/master/networkx/generators/random_graphs.py
  */
    if (k >= n) throw new Error('Choose smaller `k`. It cannot be larger than number of nodes `n`');


    var random = require('ngraph.random').random(seed || 42);

    var g = createGraph(), i, to;
    for (i = 0; i < n; ++i) {
      g.addNode(i);
    }

    // connect each node to k/2 neighbors
    var neighborsSize = Math.floor(k/2 + 1);
    for (var j = 1; j < neighborsSize; ++j) {
      for (i = 0; i < n; ++i) {
        to = (j + i) % n;
        g.addLink(i, to);
      }
    }

    // rewire edges from each node
    // loop over all nodes in order (label) and neighbors in order (distance)
    // no self loops or multiple edges allowed
    for (j = 1; j < neighborsSize; ++j) {
      for (i = 0; i < n; ++i) {
        if (random.nextDouble() < p) {
          var from = i;
          to = (j + i) % n;

          var newTo = random.next(n);
          var needsRewire = (newTo === from || g.hasLink(from, newTo));
          if (needsRewire && g.getLinks(from).length === n - 1) {
            // we cannot rewire this node, it has too many links.
            continue;
          }
          // Enforce no self-loops or multiple edges
          while (needsRewire) {
            newTo = random.next(n);
            needsRewire = (newTo === from || g.hasLink(from, newTo));
          }
          var link = g.hasLink(from, to);
          g.removeLink(link);
          g.addLink(from, newTo);
        }
      }
    }

    return g;
  }
}
