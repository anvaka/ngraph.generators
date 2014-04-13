var createFabricGraphics = require('ngraph.fabric');
var generators = require('../');

var factoryParams = {
  ladder: { args: [10] },
  complete: { args: [6] },
  completeBipartite: { args: [3 , 3] },
  balancedBinTree: { args: [5] },
  path: { args: [10] },
  circularLadder: { args: [5] },
  grid: { args: [10, 10] },
  grid3: { args: [5, 5, 5] },
  noLinks: { args: [100] }
};

Object.keys(generators).forEach(renderGraph);

function renderGraph(name) {
  var factorySettings = factoryParams[name];
  var graph = generators[name].apply(null, factorySettings.args);
  var layout = layoutGraph(graph, factorySettings.iterations || 200);
  var canvas = renderToCanvas(graph, layout);
  saveCanvasToFile(canvas, name + '.png');
}

function layoutGraph(graph, iterationsCount) {
  // we are going to use our own layout:
  var layout = require('ngraph.forcelayout')(graph);
  console.log('Running layout...');
  for (var i = 0; i < iterationsCount; ++i) {
    layout.step();
  }
  console.log('Done. Rendering graph...');
  return layout;
}

function renderToCanvas(graph, layout) {
  var graphRect = layout.getGraphRect();
  var size = Math.max(graphRect.x2 - graphRect.x1, graphRect.y2 - graphRect.y1) + 200;

  var fabricGraphics = createFabricGraphics(graph, { width: size, height: size, layout: layout });
  var fabric = require('fabric').fabric;

  var scale = 1;
  fabricGraphics.setTransform(size/2, size/2, scale);
  fabricGraphics.renderOneFrame(); // One frame is enough

  return fabricGraphics.canvas;
}

function saveCanvasToFile(canvas, fileName) {
  var fs = require('fs');
  var path = require('path');
  var fullName = path.join(__dirname, fileName);
  var outFile = fs.createWriteStream(fullName);

  canvas.createPNGStream().on('data', function(chunk) {
    outFile.write(chunk);
  }).on('end', function () {
    console.log('Graph saved to: ' + fullName);
  });
}
