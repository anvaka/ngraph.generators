(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.generators = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var createGraph = require('ngraph.graph');

module.exports = factory(createGraph);

// Allow other developers have their own createGraph
module.exports.factory = factory;

function factory(createGraph) {
  return {
    ladder: ladder,
    complete: complete,
    completeBipartite: completeBipartite,

    // these are synonyms
    balancedBinTree: balancedBinTree,
    balancedBinaryTree: balancedBinTree,
    binaryTree: balancedBinTree,
    binTree: balancedBinTree,

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
      throw new Error('Invalid number of nodes');
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
          throw new Error('Invalid number of nodes');
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
      throw new Error('At least two nodes are expected for complete graph');
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

  function completeBipartite(n, m) {
  /**
  * Complete bipartite graph K n,m. Each node in the
  * first partition is connected to all nodes in the second partition.
  *
  * @param {Number} n represents number of nodes in the first graph partition
  * @param {Number} m represents number of nodes in the second graph partition
  */
    if (!n || !m || n < 0 || m < 0) {
      throw new Error('Graph dimensions are invalid. Number of nodes in each partition should be greater than 0');
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
      throw new Error('Invalid number of nodes');
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
      throw new Error('Invalid number of nodes in grid graph');
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
      throw new Error('Invalid number of nodes in grid3 graph');
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
    if (n === undefined || n < 0) {
      throw new Error('Invalid number of levels in balanced tree');
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
      throw new Error('Number of nodes should be >= 0');
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

},{"ngraph.graph":3,"ngraph.random":4}],2:[function(require,module,exports){
module.exports = function eventify(subject) {
  validateSubject(subject);

  var eventsStorage = createEventsStorage(subject);
  subject.on = eventsStorage.on;
  subject.off = eventsStorage.off;
  subject.fire = eventsStorage.fire;
  return subject;
};

function createEventsStorage(subject) {
  // Store all event listeners to this hash. Key is event name, value is array
  // of callback records.
  //
  // A callback record consists of callback function and its optional context:
  // { 'eventName' => [{callback: function, ctx: object}] }
  var registeredEvents = Object.create(null);

  return {
    on: function (eventName, callback, ctx) {
      if (typeof callback !== 'function') {
        throw new Error('callback is expected to be a function');
      }
      var handlers = registeredEvents[eventName];
      if (!handlers) {
        handlers = registeredEvents[eventName] = [];
      }
      handlers.push({callback: callback, ctx: ctx});

      return subject;
    },

    off: function (eventName, callback) {
      var wantToRemoveAll = (typeof eventName === 'undefined');
      if (wantToRemoveAll) {
        // Killing old events storage should be enough in this case:
        registeredEvents = Object.create(null);
        return subject;
      }

      if (registeredEvents[eventName]) {
        var deleteAllCallbacksForEvent = (typeof callback !== 'function');
        if (deleteAllCallbacksForEvent) {
          delete registeredEvents[eventName];
        } else {
          var callbacks = registeredEvents[eventName];
          for (var i = 0; i < callbacks.length; ++i) {
            if (callbacks[i].callback === callback) {
              callbacks.splice(i, 1);
            }
          }
        }
      }

      return subject;
    },

    fire: function (eventName) {
      var callbacks = registeredEvents[eventName];
      if (!callbacks) {
        return subject;
      }

      var fireArguments;
      if (arguments.length > 1) {
        fireArguments = Array.prototype.splice.call(arguments, 1);
      }
      for(var i = 0; i < callbacks.length; ++i) {
        var callbackInfo = callbacks[i];
        callbackInfo.callback.apply(callbackInfo.ctx, fireArguments);
      }

      return subject;
    }
  };
}

function validateSubject(subject) {
  if (!subject) {
    throw new Error('Eventify cannot use falsy object as events subject');
  }
  var reservedWords = ['on', 'fire', 'off'];
  for (var i = 0; i < reservedWords.length; ++i) {
    if (subject.hasOwnProperty(reservedWords[i])) {
      throw new Error("Subject cannot be eventified, since it already has property '" + reservedWords[i] + "'");
    }
  }
}

},{}],3:[function(require,module,exports){
/**
 * @fileOverview Contains definition of the core graph object.
 */

// TODO: need to change storage layer:
// 1. Be able to get all nodes O(1)
// 2. Be able to get number of links O(1)

/**
 * @example
 *  var graph = require('ngraph.graph')();
 *  graph.addNode(1);     // graph has one node.
 *  graph.addLink(2, 3);  // now graph contains three nodes and one link.
 *
 */
module.exports = createGraph;

var eventify = require('ngraph.events');

/**
 * Creates a new graph
 */
function createGraph(options) {
  // Graph structure is maintained as dictionary of nodes
  // and array of links. Each node has 'links' property which
  // hold all links related to that node. And general links
  // array is used to speed up all links enumeration. This is inefficient
  // in terms of memory, but simplifies coding.
  options = options || {};
  if ('uniqueLinkId' in options) {
    console.warn(
      'ngraph.graph: Starting from version 0.14 `uniqueLinkId` is deprecated.\n' +
      'Use `multigraph` option instead\n',
      '\n',
      'Note: there is also change in default behavior: From now on each graph\n'+
      'is considered to be not a multigraph by default (each edge is unique).'
    );

    options.multigraph = options.uniqueLinkId;
  }

  // Dear reader, the non-multigraphs do not guarantee that there is only
  // one link for a given pair of node. When this option is set to false
  // we can save some memory and CPU (18% faster for non-multigraph);
  if (options.multigraph === undefined) options.multigraph = false;

  if (typeof Map !== 'function') {
    // TODO: Should we polyfill it ourselves? We don't use much operations there..
    throw new Error('ngraph.graph requires `Map` to be defined. Please polyfill it before using ngraph');
  } 

  var nodes = new Map(); // nodeId => Node
  var links = new Map(); // linkId => Link
    // Hash of multi-edges. Used to track ids of edges between same nodes
  var multiEdges = {};
  var suspendEvents = 0;

  var createLink = options.multigraph ? createUniqueLink : createSingleLink,

    // Our graph API provides means to listen to graph changes. Users can subscribe
    // to be notified about changes in the graph by using `on` method. However
    // in some cases they don't use it. To avoid unnecessary memory consumption
    // we will not record graph changes until we have at least one subscriber.
    // Code below supports this optimization.
    //
    // Accumulates all changes made during graph updates.
    // Each change element contains:
    //  changeType - one of the strings: 'add', 'remove' or 'update';
    //  node - if change is related to node this property is set to changed graph's node;
    //  link - if change is related to link this property is set to changed graph's link;
    changes = [],
    recordLinkChange = noop,
    recordNodeChange = noop,
    enterModification = noop,
    exitModification = noop;

  // this is our public API:
  var graphPart = {
    /**
     * Sometimes duck typing could be slow. Giving clients a hint about data structure
     * via explicit version number here:
     */
    version: 20.0,

    /**
     * Adds node to the graph. If node with given id already exists in the graph
     * its data is extended with whatever comes in 'data' argument.
     *
     * @param nodeId the node's identifier. A string or number is preferred.
     * @param [data] additional data for the node being added. If node already
     *   exists its data object is augmented with the new one.
     *
     * @return {node} The newly added node or node with given id if it already exists.
     */
    addNode: addNode,

    /**
     * Adds a link to the graph. The function always create a new
     * link between two nodes. If one of the nodes does not exists
     * a new node is created.
     *
     * @param fromId link start node id;
     * @param toId link end node id;
     * @param [data] additional data to be set on the new link;
     *
     * @return {link} The newly created link
     */
    addLink: addLink,

    /**
     * Removes link from the graph. If link does not exist does nothing.
     *
     * @param link - object returned by addLink() or getLinks() methods.
     *
     * @returns true if link was removed; false otherwise.
     */
    removeLink: removeLink,

    /**
     * Removes node with given id from the graph. If node does not exist in the graph
     * does nothing.
     *
     * @param nodeId node's identifier passed to addNode() function.
     *
     * @returns true if node was removed; false otherwise.
     */
    removeNode: removeNode,

    /**
     * Gets node with given identifier. If node does not exist undefined value is returned.
     *
     * @param nodeId requested node identifier;
     *
     * @return {node} in with requested identifier or undefined if no such node exists.
     */
    getNode: getNode,

    /**
     * Gets number of nodes in this graph.
     *
     * @return number of nodes in the graph.
     */
    getNodeCount: getNodeCount,

    /**
     * Gets total number of links in the graph.
     */
    getLinkCount: getLinkCount,

    /**
     * Gets total number of links in the graph.
     */
    getEdgeCount: getLinkCount,

    /**
     * Synonym for `getLinkCount()`
     */
    getLinksCount: getLinkCount,
    
    /**
     * Synonym for `getNodeCount()`
     */
    getNodesCount: getNodeCount,

    /**
     * Gets all links (inbound and outbound) from the node with given id.
     * If node with given id is not found null is returned.
     *
     * @param nodeId requested node identifier.
     *
     * @return Set of links from and to requested node if such node exists;
     *   otherwise null is returned.
     */
    getLinks: getLinks,

    /**
     * Invokes callback on each node of the graph.
     *
     * @param {Function(node)} callback Function to be invoked. The function
     *   is passed one argument: visited node.
     */
    forEachNode: forEachNode,

    /**
     * Invokes callback on every linked (adjacent) node to the given one.
     *
     * @param nodeId Identifier of the requested node.
     * @param {Function(node, link)} callback Function to be called on all linked nodes.
     *   The function is passed two parameters: adjacent node and link object itself.
     * @param oriented if true graph treated as oriented.
     */
    forEachLinkedNode: forEachLinkedNode,

    /**
     * Enumerates all links in the graph
     *
     * @param {Function(link)} callback Function to be called on all links in the graph.
     *   The function is passed one parameter: graph's link object.
     *
     * Link object contains at least the following fields:
     *  fromId - node id where link starts;
     *  toId - node id where link ends,
     *  data - additional data passed to graph.addLink() method.
     */
    forEachLink: forEachLink,

    /**
     * Suspend all notifications about graph changes until
     * endUpdate is called.
     */
    beginUpdate: enterModification,

    /**
     * Resumes all notifications about graph changes and fires
     * graph 'changed' event in case there are any pending changes.
     */
    endUpdate: exitModification,

    /**
     * Removes all nodes and links from the graph.
     */
    clear: clear,

    /**
     * Detects whether there is a link between two nodes.
     * Operation complexity is O(n) where n - number of links of a node.
     * NOTE: this function is synonym for getLink()
     *
     * @returns link if there is one. null otherwise.
     */
    hasLink: getLink,

    /**
     * Detects whether there is a node with given id
     * 
     * Operation complexity is O(1)
     * NOTE: this function is synonym for getNode()
     *
     * @returns node if there is one; Falsy value otherwise.
     */
    hasNode: getNode,

    /**
     * Gets an edge between two nodes.
     * Operation complexity is O(n) where n - number of links of a node.
     *
     * @param {string} fromId link start identifier
     * @param {string} toId link end identifier
     *
     * @returns link if there is one; undefined otherwise.
     */
    getLink: getLink
  };

  // this will add `on()` and `fire()` methods.
  eventify(graphPart);

  monitorSubscribers();

  return graphPart;

  function monitorSubscribers() {
    var realOn = graphPart.on;

    // replace real `on` with our temporary on, which will trigger change
    // modification monitoring:
    graphPart.on = on;

    function on() {
      // now it's time to start tracking stuff:
      graphPart.beginUpdate = enterModification = enterModificationReal;
      graphPart.endUpdate = exitModification = exitModificationReal;
      recordLinkChange = recordLinkChangeReal;
      recordNodeChange = recordNodeChangeReal;

      // this will replace current `on` method with real pub/sub from `eventify`.
      graphPart.on = realOn;
      // delegate to real `on` handler:
      return realOn.apply(graphPart, arguments);
    }
  }

  function recordLinkChangeReal(link, changeType) {
    changes.push({
      link: link,
      changeType: changeType
    });
  }

  function recordNodeChangeReal(node, changeType) {
    changes.push({
      node: node,
      changeType: changeType
    });
  }

  function addNode(nodeId, data) {
    if (nodeId === undefined) {
      throw new Error('Invalid node identifier');
    }

    enterModification();

    var node = getNode(nodeId);
    if (!node) {
      node = new Node(nodeId, data);
      recordNodeChange(node, 'add');
    } else {
      node.data = data;
      recordNodeChange(node, 'update');
    }

    nodes.set(nodeId, node);

    exitModification();
    return node;
  }

  function getNode(nodeId) {
    return nodes.get(nodeId);
  }

  function removeNode(nodeId) {
    var node = getNode(nodeId);
    if (!node) {
      return false;
    }

    enterModification();

    var prevLinks = node.links;
    if (prevLinks) {
      prevLinks.forEach(removeLinkInstance);
      node.links = null;
    }

    nodes.delete(nodeId);

    recordNodeChange(node, 'remove');

    exitModification();

    return true;
  }


  function addLink(fromId, toId, data) {
    enterModification();

    var fromNode = getNode(fromId) || addNode(fromId);
    var toNode = getNode(toId) || addNode(toId);

    var link = createLink(fromId, toId, data);
    var isUpdate = links.has(link.id);

    links.set(link.id, link);

    // TODO: this is not cool. On large graphs potentially would consume more memory.
    addLinkToNode(fromNode, link);
    if (fromId !== toId) {
      // make sure we are not duplicating links for self-loops
      addLinkToNode(toNode, link);
    }

    recordLinkChange(link, isUpdate ? 'update' : 'add');

    exitModification();

    return link;
  }

  function createSingleLink(fromId, toId, data) {
    var linkId = makeLinkId(fromId, toId);
    var prevLink = links.get(linkId);
    if (prevLink) {
      prevLink.data = data;
      return prevLink;
    }

    return new Link(fromId, toId, data, linkId);
  }

  function createUniqueLink(fromId, toId, data) {
    // TODO: Find a better/faster way to store multigraphs
    var linkId = makeLinkId(fromId, toId);
    var isMultiEdge = multiEdges.hasOwnProperty(linkId);
    if (isMultiEdge || getLink(fromId, toId)) {
      if (!isMultiEdge) {
        multiEdges[linkId] = 0;
      }
      var suffix = '@' + (++multiEdges[linkId]);
      linkId = makeLinkId(fromId + suffix, toId + suffix);
    }

    return new Link(fromId, toId, data, linkId);
  }

  function getNodeCount() {
    return nodes.size;
  }

  function getLinkCount() {
    return links.size;
  }

  function getLinks(nodeId) {
    var node = getNode(nodeId);
    return node ? node.links : null;
  }

  function removeLink(link, otherId) {
    if (otherId !== undefined) {
      link = getLink(link, otherId);
    }
    return removeLinkInstance(link);
  }

  function removeLinkInstance(link) {
    if (!link) {
      return false;
    }
    if (!links.get(link.id)) return false;

    enterModification();

    links.delete(link.id);

    var fromNode = getNode(link.fromId);
    var toNode = getNode(link.toId);

    if (fromNode) {
      fromNode.links.delete(link);
    }

    if (toNode) {
      toNode.links.delete(link);
    }

    recordLinkChange(link, 'remove');

    exitModification();

    return true;
  }

  function getLink(fromNodeId, toNodeId) {
    if (fromNodeId === undefined || toNodeId === undefined) return undefined;
    return links.get(makeLinkId(fromNodeId, toNodeId));
  }

  function clear() {
    enterModification();
    forEachNode(function(node) {
      removeNode(node.id);
    });
    exitModification();
  }

  function forEachLink(callback) {
    if (typeof callback === 'function') {
      var valuesIterator = links.values();
      var nextValue = valuesIterator.next();
      while (!nextValue.done) {
        if (callback(nextValue.value)) {
          return true; // client doesn't want to proceed. Return.
        }
        nextValue = valuesIterator.next();
      }
    }
  }

  function forEachLinkedNode(nodeId, callback, oriented) {
    var node = getNode(nodeId);

    if (node && node.links && typeof callback === 'function') {
      if (oriented) {
        return forEachOrientedLink(node.links, nodeId, callback);
      } else {
        return forEachNonOrientedLink(node.links, nodeId, callback);
      }
    }
  }

  // eslint-disable-next-line no-shadow
  function forEachNonOrientedLink(links, nodeId, callback) {
    var quitFast;

    var valuesIterator = links.values();
    var nextValue = valuesIterator.next();
    while (!nextValue.done) {
      var link = nextValue.value;
      var linkedNodeId = link.fromId === nodeId ? link.toId : link.fromId;
      quitFast = callback(nodes.get(linkedNodeId), link);
      if (quitFast) {
        return true; // Client does not need more iterations. Break now.
      }
      nextValue = valuesIterator.next();
    }
  }

  // eslint-disable-next-line no-shadow
  function forEachOrientedLink(links, nodeId, callback) {
    var quitFast;
    var valuesIterator = links.values();
    var nextValue = valuesIterator.next();
    while (!nextValue.done) {
      var link = nextValue.value;
      if (link.fromId === nodeId) {
        quitFast = callback(nodes.get(link.toId), link);
        if (quitFast) {
          return true; // Client does not need more iterations. Break now.
        }
      }
      nextValue = valuesIterator.next();
    }
  }

  // we will not fire anything until users of this library explicitly call `on()`
  // method.
  function noop() {}

  // Enter, Exit modification allows bulk graph updates without firing events.
  function enterModificationReal() {
    suspendEvents += 1;
  }

  function exitModificationReal() {
    suspendEvents -= 1;
    if (suspendEvents === 0 && changes.length > 0) {
      graphPart.fire('changed', changes);
      changes.length = 0;
    }
  }

  function forEachNode(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Function is expected to iterate over graph nodes. You passed ' + callback);
    }

    var valuesIterator = nodes.values();
    var nextValue = valuesIterator.next();
    while (!nextValue.done) {
      if (callback(nextValue.value)) {
        return true; // client doesn't want to proceed. Return.
      }
      nextValue = valuesIterator.next();
    }
  }
}

/**
 * Internal structure to represent node;
 */
function Node(id, data) {
  this.id = id;
  this.links = null;
  this.data = data;
}

function addLinkToNode(node, link) {
  if (node.links) {
    node.links.add(link);
  } else {
    node.links = new Set([link]);
  }
}

/**
 * Internal structure to represent links;
 */
function Link(fromId, toId, data, id) {
  this.fromId = fromId;
  this.toId = toId;
  this.data = data;
  this.id = id;
}

function makeLinkId(fromId, toId) {
  return fromId.toString() + '👉 ' + toId.toString();
}

},{"ngraph.events":2}],4:[function(require,module,exports){
module.exports = random;

// TODO: Deprecate?
module.exports.random = random,
module.exports.randomIterator = randomIterator

/**
 * Creates seeded PRNG with two methods:
 *   next() and nextDouble()
 */
function random(inputSeed) {
  var seed = typeof inputSeed === 'number' ? inputSeed : (+new Date());
  return new Generator(seed)
}

function Generator(seed) {
  this.seed = seed;
}

/**
  * Generates random integer number in the range from 0 (inclusive) to maxValue (exclusive)
  *
  * @param maxValue Number REQUIRED. Omitting this number will result in NaN values from PRNG.
  */
Generator.prototype.next = next;

/**
  * Generates random double number in the range from 0 (inclusive) to 1 (exclusive)
  * This function is the same as Math.random() (except that it could be seeded)
  */
Generator.prototype.nextDouble = nextDouble;

/**
 * Returns a random real number from uniform distribution in [0, 1)
 */
Generator.prototype.uniform = nextDouble;

/**
 * Returns a random real number from a Gaussian distribution
 * with 0 as a mean, and 1 as standard deviation u ~ N(0,1)
 */
Generator.prototype.gaussian = gaussian;

function gaussian() {
  // use the polar form of the Box-Muller transform
  // based on https://introcs.cs.princeton.edu/java/23recursion/StdRandom.java
  var r, x, y;
  do {
    x = this.nextDouble() * 2 - 1;
    y = this.nextDouble() * 2 - 1;
    r = x * x + y * y;
  } while (r >= 1 || r === 0);

  return x * Math.sqrt(-2 * Math.log(r)/r);
}

/**
 * See https://twitter.com/anvaka/status/1296182534150135808
 */
Generator.prototype.levy = levy;

function levy() {
  var beta = 3 / 2;
  var sigma = Math.pow(
      gamma( 1 + beta ) * Math.sin(Math.PI * beta / 2) / 
        (gamma((1 + beta) / 2) * beta * Math.pow(2, (beta - 1) / 2)),
      1/beta
  );
  return this.gaussian() * sigma / Math.pow(Math.abs(this.gaussian()), 1/beta);
}

// gamma function approximation
function gamma(z) {
  return Math.sqrt(2 * Math.PI / z) * Math.pow((1 / Math.E) * (z + 1 / (12 * z - 1 / (10 * z))), z);
}

function nextDouble() {
  var seed = this.seed;
  // Robert Jenkins' 32 bit integer hash function.
  seed = ((seed + 0x7ed55d16) + (seed << 12)) & 0xffffffff;
  seed = ((seed ^ 0xc761c23c) ^ (seed >>> 19)) & 0xffffffff;
  seed = ((seed + 0x165667b1) + (seed << 5)) & 0xffffffff;
  seed = ((seed + 0xd3a2646c) ^ (seed << 9)) & 0xffffffff;
  seed = ((seed + 0xfd7046c5) + (seed << 3)) & 0xffffffff;
  seed = ((seed ^ 0xb55a4f09) ^ (seed >>> 16)) & 0xffffffff;
  this.seed = seed;
  return (seed & 0xfffffff) / 0x10000000;
}

function next(maxValue) {
  return Math.floor(this.nextDouble() * maxValue);
}

/*
 * Creates iterator over array, which returns items of array in random order
 * Time complexity is guaranteed to be O(n);
 */
function randomIterator(array, customRandom) {
  var localRandom = customRandom || random();
  if (typeof localRandom.next !== 'function') {
    throw new Error('customRandom does not match expected API: next() function is missing');
  }

  return {
    forEach: forEach,

    /**
     * Shuffles array randomly, in place.
     */
    shuffle: shuffle
  };

  function shuffle() {
    var i, j, t;
    for (i = array.length - 1; i > 0; --i) {
      j = localRandom.next(i + 1); // i inclusive
      t = array[j];
      array[j] = array[i];
      array[i] = t;
    }

    return array;
  }

  function forEach(callback) {
    var i, j, t;
    for (i = array.length - 1; i > 0; --i) {
      j = localRandom.next(i + 1); // i inclusive
      t = array[j];
      array[j] = array[i];
      array[i] = t;

      callback(t);
    }

    if (array.length) {
      callback(array[0]);
    }
  }
}
},{}]},{},[1])(1)
});
