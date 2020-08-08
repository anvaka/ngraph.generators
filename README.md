Graph generators
=================
This module generates various graphs. It is part of larger [ngraph](https://github.com/anvaka/ngraph)
family. If you need something not as simple as generated graphs, please check out
[ngraph.sparce-collection](https://github.com/anvaka/ngraph.sparse-collection) repository
which contains graphs from University of Florida collection.

[![build status](https://secure.travis-ci.org/anvaka/ngraph.generators.png)](http://travis-ci.org/anvaka/ngraph.generators)


# Install

With npm do:

```
npm istall ngraph.generators
```

If you prefer CDN you can also do:

``` html
<script src='https://cdn.jsdelivr.net/npm/ngraph.generators@19.2.0/dist/ngraph.generators.min.js'></script>
```

# Supported graphs

All images below are clickable and point to interactive 3d visualization, done by `ngraph.three` library.

## ladder

``` js
// Creates a ladder with 10 steps
var graph = require('ngraph.generators').ladder(10);
```
[![Ladder](https://raw.githubusercontent.com/anvaka/ngraph.generators/master/doc/ladder.png)](http://anvaka.github.io/ngraph/examples/three.js/Basic/index.html?graph=ladder&n=10)

## complete

``` js
// Creates complete graph K6
var graph = require('ngraph.generators').complete(6);
```
[![Complete](https://raw.githubusercontent.com/anvaka/ngraph.generators/master/doc/complete.png)](http://anvaka.github.io/ngraph/examples/three.js/Basic/index.html?graph=complete&n=6)

## completeBipartite

``` js
// Creates complete bipartite graph K 3,3.
var graph = require('ngraph.generators').completeBipartite(3, 3);
```
[![Complete Bipartite](https://raw.githubusercontent.com/anvaka/ngraph.generators/master/doc/completeBipartite.png)](http://anvaka.github.io/ngraph/examples/three.js/Basic/index.html?graph=completeBipartite&n=3&m=3)

## balancedBinTree

``` js
// Creates balanced binary tree with n levels.
var graph = require('ngraph.generators').balancedBinTree(5);
```
[![Balanced Binary Tree](https://raw.githubusercontent.com/anvaka/ngraph.generators/master/doc/balancedBinTree.png)](http://anvaka.github.io/ngraph/examples/three.js/Basic/index.html?graph=balancedBinTree&n=5)

## path

``` js
// Generates a path-graph with 10 steps.
var graph = require('ngraph.generators').path(10);
```
[![Path](https://raw.githubusercontent.com/anvaka/ngraph.generators/master/doc/path.png)](http://anvaka.github.io/ngraph/examples/three.js/Basic/index.html?graph=path&n=10)

## circularLadder

``` js
// Generates a graph in a form of a circular ladder with 5 steps.
var graph = require('ngraph.generators').circularLadder(5);
```
[![Circular Ladder](https://raw.githubusercontent.com/anvaka/ngraph.generators/master/doc/circularLadder.png)](http://anvaka.github.io/ngraph/examples/three.js/Basic/index.html?graph=circularLadder&n=5)

## grid

``` js
// Generates a graph in a form of a grid with 10 rows and 10 columns.
var graph = require('ngraph.generators').grid(10, 10);
```
[![Grid](https://raw.githubusercontent.com/anvaka/ngraph.generators/master/doc/grid.png)](http://anvaka.github.io/ngraph/examples/three.js/Basic/index.html?graph=grid&n=10&m=10)

## grid3

``` js
// Generates a graph in a form of a 3d grid with 5 rows and 5 columns and 5 levels.
var graph = require('ngraph.generators').grid3(5, 5, 5);
```
[![Grid 3d](https://raw.githubusercontent.com/anvaka/ngraph.generators/master/doc/grid3.png)](http://anvaka.github.io/ngraph/examples/three.js/Basic/index.html?graph=grid3&z=800&n=10&m=10&k=10)

## noLinks

``` js
// Creates graph with 100 nodes and 0 links
var graph = require('ngraph.generators').noLinks(100);
```
[![No Links](https://raw.githubusercontent.com/anvaka/ngraph.generators/master/doc/noLinks.png)](http://anvaka.github.io/ngraph/examples/three.js/Basic/index.html?graph=noLinks&n=100)

## cliqueCircle

``` js
var cliqueCount = 10;
var cliqueSize = 5;

// create a circle, with `cliqueCount` nodes. Each node is a fully connected
// graph with `cliqueSize` nodes
var graph = require('ngraph.generators').cliqueCircle(cliqueCount, cliqueSize);
```

## WattsStrogatz

This is a "small world" random graph, generated by [Watts and Strogatz model](http://en.wikipedia.org/wiki/Watts_and_Strogatz_model).
In this model generator takes three arguments:

* `n` - number of nodes
* `k` - number of edges for each node. Originally node is connected with `k` nearest neighbours on a circle graph
* `b` - probability of an edge rewrite. In other words node changes it's nearest neighbor to a random
node inside graph with probability `b`.

``` js
// Creates graph with 100 nodes, each node is connected with 20 neighbours,
// and probability of neighbour to be outside of local node community is 1%.
var g1 = require('ngraph.generators').wattsStrogatz(100, 20, 0.00);
var g2 = require('ngraph.generators').wattsStrogatz(100, 20, 0.01);
var g3 = require('ngraph.generators').wattsStrogatz(100, 20, 0.10);
var g4 = require('ngraph.generators').wattsStrogatz(100, 20, 0.50);
var g5 = require('ngraph.generators').wattsStrogatz(20, 4, 0.02);
```

### Watts Strogatz n = 100 k = 20 b = 0.00 (g1):
[![Watts Strogatz n = 100 k = 20 b = 0.00](https://raw.githubusercontent.com/anvaka/ngraph.generators/master/doc/wattsStrogatz_100_20_00.png)](http://anvaka.github.io/ngraph/examples/three.js/Basic/index.html?graph=wattsStrogatz&n=100&m=20&k=0.00)

### Watts Strogatz n = 100 k = 20 b = 0.01 (g2):
[![Watts Strogatz n = 100 k = 20 b = 0.01](https://raw.githubusercontent.com/anvaka/ngraph.generators/master/doc/wattsStrogatz_100_20_01.png)](http://anvaka.github.io/ngraph/examples/three.js/Basic/index.html?graph=wattsStrogatz&n=100&m=20&k=0.01)

### Watts Strogatz n = 100 k = 20 b = 0.10 (g3):
[![Watts Strogatz n = 100 k = 20 b = 0.10](https://raw.githubusercontent.com/anvaka/ngraph.generators/master/doc/wattsStrogatz_100_20_10.png)](http://anvaka.github.io/ngraph/examples/three.js/Basic/index.html?graph=wattsStrogatz&n=100&m=20&k=0.10)

### Watts Strogatz n = 100 k = 20 b = 0.50 (g4):
[![Watts Strogatz n = 100 k = 20 b = 0.50](https://raw.githubusercontent.com/anvaka/ngraph.generators/master/doc/wattsStrogatz_100_20_50.png)](http://anvaka.github.io/ngraph/examples/three.js/Basic/index.html?graph=wattsStrogatz&n=100&m=20&k=0.50)

### Watts Strogatz n = 20 k = 04 b = 0.02 (g5):
[![Watts Strogatz n = 20 k = 04 b = 0.02](https://raw.githubusercontent.com/anvaka/ngraph.generators/master/doc/wattsStrogatz_20_04_02.png)](http://anvaka.github.io/ngraph/examples/three.js/Basic/index.html?graph=wattsStrogatz&n=20&m=4&k=0.02)

# Custom `createGraph()`

By default this library uses `ngraph.graph` module to create new instances
of a graph. If you want to use your own module, you can use `factory` method:

``` js
var generate = require('ngraph.generators').factory(function createGraph() {
  // the following methods are required from the createGraph api:
  return {
    addLink(from, to) {
      // ...
    },
    addNode(nodeId) {
    },
    getNodesCount() {
    }
  }
});

// now generators have the same methods as regular ngraph.generators:
var graph = generate.ladder(3);
generate.grid(10, 10);
generate.balancedBinTree(4);
// etc.
```
