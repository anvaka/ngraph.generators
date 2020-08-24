declare module "ngraph.generators" {
    import { Graph } from 'ngraph.graph'

    interface Factory { 
        /**
         * Ladder graph is a graph in form of ladder
         * @param {Number} n Represents number of steps in the ladder
         */
        ladder<NodeData = any, LinkData = any>(n: number): Graph<NodeData, LinkData>
        /**
         * Complete graph Kn.
         *
         * @param {Number} n represents number of nodes in the complete graph.
         */
        complete<NodeData = any, LinkData = any>(n: number): Graph<NodeData, LinkData>
        /**
         * Complete bipartite graph K n,m. Each node in the
         * first partition is connected to all nodes in the second partition.
         *
         * @param {Number} n represents number of nodes in the first graph partition
         * @param {Number} m represents number of nodes in the second graph partition
         */
        completeBipartite<NodeData = any, LinkData = any>(n: number, m: number): Graph<NodeData, LinkData>

        /**
         * Balanced binary tree with n levels.
         *
         * @param {Number} n of levels in the binary tree
         */
        balancedBinTree<NodeData = any, LinkData = any>(n: number): Graph<NodeData, LinkData>
        balancedBinaryTree<NodeData = any, LinkData = any>(n: number): Graph<NodeData, LinkData>
        binaryTree<NodeData = any, LinkData = any>(n: number): Graph<NodeData, LinkData>
        binTree<NodeData = any, LinkData = any>(n: number): Graph<NodeData, LinkData>

        /**
         * Path graph with n steps.
         *
         * @param {Number} n number of nodes in the path
         */
        path<NodeData = any, LinkData = any>(n: number): Graph<NodeData, LinkData>
        /**
         * Circular ladder with n steps.
         *
         * @param {Number} n of steps in the ladder.
         */
        circularLadder<NodeData = any, LinkData = any>(n: number): Graph<NodeData, LinkData>
        /**
         * Grid graph with n rows and m columns.
         *
         * @param {Number} n of rows in the graph.
         * @param {Number} m of columns in the graph.
         */
        grid<NodeData = any, LinkData = any>(n: number, m: number): Graph<NodeData, LinkData>
        /**
         * 3D grid with n rows and m columns and z levels.
         *
         * @param {Number} n of rows in the graph.
         * @param {Number} m of columns in the graph.
         * @param {Number} z of levels in the graph.
         */
        grid3<NodeData = any, LinkData = any>(n: number, m: number, z: number): Graph<NodeData, LinkData>
        /**
         * Graph with no links
         *
         * @param {Number} n of nodes in the graph
         */
        noLinks<NodeData = any, LinkData = any>(n: number): Graph<NodeData, LinkData>
        /**
         * Watts-Strogatz small-world graph.
         *
         * @param {Number} n The number of nodes
         * @param {Number} k Each node is connected to k nearest neighbors in ring topology
         * @param {Number} p The probability of rewiring each edge
         * @see https://github.com/networkx/networkx/blob/master/networkx/generators/random_graphs.py
         */
        wattsStrogatz<NodeData = any, LinkData = any>(n: number, m: number, p: number): Graph<NodeData, LinkData>
        /**
         * A circular graph with cliques instead of individual nodes
         *
         * @param {Number} cliqueCount number of cliques inside circle
         * @param {Number} cliqueSize number of nodes inside each clique
         */
        cliqueCircle<NodeData = any, LinkData = any>(n: number, m: number): Graph<NodeData, LinkData>
    }

    const factory: Factory;

    export default factory;
}