Graph generators
=================
This module generates various graphs. It is part of larger [ngraph](https://github.com/anvaka/ngraph)
family. If you something not as simple as generated graphs, please check out
[ngraph.sparce-collection](https://github.com/anvaka/ngraph.sparse-collection) repository
which contains graphs from University of Florida collection.

[![build status](https://secure.travis-ci.org/anvaka/ngraph.generators.png)](http://travis-ci.org/anvaka/ngraph.generators)

# Supported graphs

## Ladder

``` js
// Creates a ladder with 10 steps
var graph = require('ngraph.generators').ladder(10);
```
![Ladder](https://raw.githubusercontent.com/anvaka/ngraph.generators/master/doc/ladder.png)

## Complete

``` js
// Creates complete graph K6
var graph = require('ngraph.generators').complete(6);
```
![Complete](https://raw.githubusercontent.com/anvaka/ngraph.generators/master/doc/complete.png)

## CompleteBipartite

``` js
// Creates complete bipartite graph K 3,3.
var graph = require('ngraph.generators').completeBipartite(3, 3);
```
![Complete Bipartite](https://raw.githubusercontent.com/anvaka/ngraph.generators/master/doc/completeBipartite.png)

## BalancedBinTree

``` js
// Creates balanced binary tree with n levels.
var graph = require('ngraph.generators').balancedBinTree(5);
```
![Balanced Binary Tree](https://raw.githubusercontent.com/anvaka/ngraph.generators/master/doc/balancedBinTree.png)

## Path

``` js
// Generates a path-graph with 10 steps.
var graph = require('ngraph.generators').path(10);
```
![Path](https://raw.githubusercontent.com/anvaka/ngraph.generators/master/doc/path.png)

## CircularLadder

``` js
// Generates a graph in a form of a circular ladder with 5 steps.
var graph = require('ngraph.generators').circularLadder(5);
```
![Circular Ladder](https://raw.githubusercontent.com/anvaka/ngraph.generators/master/doc/circularLadder.png)

## Grid

``` js
// Generates a graph in a form of a grid with 10 rows and 10 columns.
var graph = require('ngraph.generators').grid(10, 10);
```
![Grid](https://raw.githubusercontent.com/anvaka/ngraph.generators/master/doc/grid.png)

## Grid3

``` js
// Generates a graph in a form of a 3d grid with 5 rows and 5 columns and 5 levels.
var graph = require('ngraph.generators').grid3(5, 5, 5);
```
![Grid 3d](https://raw.githubusercontent.com/anvaka/ngraph.generators/master/doc/grid3.png)

## NoLinks

``` js
// Creates graph with 100 nodes and 0 links
var graph = require('ngraph.generators').noLinks(100);;
```
![No Links](https://raw.githubusercontent.com/anvaka/ngraph.generators/master/doc/noLinks.png)

## WattsStrogatz

This is a "small world" random graph, generated by [Watts and Strogatz model](http://en.wikipedia.org/wiki/Watts_and_Strogatz_model).
In this model generator takes three arguments:

* `n` - number of nodes
* `k` - number of edges for each node. Originally node is connected with `k` nearest neighbours on a circle graph
* `b` - probabilty of an edge rewrite. In other words node changes it's nearest neighbor to a random
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

![](https://raw.githubusercontent.com/anvaka/ngraph.generators/master/doc/ladder.png)

![Watts Strogatz n = 100 k = 20 b = 0.00](https://raw.githubusercontent.com/anvaka/ngraph.generators/master/doc/wattsStrogatz_100_20_00.png)
![Watts Strogatz n = 100 k = 20 b = 0.01](https://raw.gi.com/anvaka/ngraph.generators/master/doc/wattsStrogatz_100_20_01.png)
![Watts Strogatz n = 100 k = 20 b = 0.10](https://raw.gi.com/anvaka/ngraph.generators/master/doc/wattsStrogatz_100_20_10.png)
![Watts Strogatz n = 100 k = 20 b = 0.50](https://raw.gi.com/anvaka/ngraph.generators/master/doc/wattsStrogatz_100_20_50.png)
![Watts Strogatz n = 20 k = 04 b = 0.02](https://raw.gi.com/anvaka/ngraph.generators/master/doc/wattsStrogatz_20_04_02.png)
