import {Network} from "vis-network";
import {useEffect, useRef, useState} from "react";
import * as vis from "vis-data";
import {useDispatch, useSelector} from "react-redux";

export default function DepTree() {

    const [nodes, setNodes] = useState(new vis.DataSet());
    const [edges, setGraph] = useState(new vis.DataSet());
    useDispatch();
    let data = useSelector((state) => state.chart);
    useEffect(() => {
        setNodes(new vis.DataSet(data.nodes))
        setGraph(new vis.DataSet(data.edges))
    }, [])


    const visJsRef = useRef(null);

    useEffect(() => {
        const network =
            visJsRef.current &&
            new Network(visJsRef.current,
                {nodes, edges},
                {
                    height: "2000px",
                    edges: {
                        smooth: {
                            enabled: true,
                            type: 'cubicBezier',
                            roundness: 0.4
                        },
                        arrows: {
                            to: {enabled: true, scaleFactor: 5} // adds an arrow pointing towards the "to" node
                        },
                        color: {
                            color: '#848484',
                            highlight: '#848484',
                            hover: '#848484',
                            inherit: 'from',
                            opacity: 1.0
                        },
                        chosen: {
                            edge: function (values, id, selected, hovering) {
                                values.color = selected ? '#9309FE' : '#848484';  // change color when selected
                            }
                        },
                        dashes: false
                    },
                    nodes: {

                        size: 80, // Adjust the size of the nodes
                        font: {
                            size: 100, // Adjust the font size
                        }
                    },
                    layout: {
                        improvedLayout: true,
                        hierarchical: {
                            enabled: false
                        }
                    },
                    physics: {
                        solver: 'forceAtlas2Based',
                        forceAtlas2Based: {
                            gravitationalConstant: -1000, // increase this
                            centralGravity: 0.001, // decrease this
                            springLength: 1000, // increase this
                            springConstant: 0.001, // decrease this
                            avoidOverlap: 1 // to avoid overlap
                        },
                        timestep: 0.5
                    },
                }
            );


        network.once("afterDrawing", () => {
            network.moveTo({
                scale: 0.25,
                animation: {
                    duration: 500,
                    easingFunction: "easeInOutQuad",
                },
            });
        });

        network.once("afterDrawing", () => {
            network.fit();
        });


        let originalStyles = {};


        network.on("click", function (params) {
            if (params.nodes.length > 0) {
                const nodeId = params.nodes[0];
                const connectedNodesTo = network.getConnectedNodes(nodeId, "to");
                const connectedNodesFrom = network.getConnectedNodes(nodeId, "from");

                const allNodes = [nodeId, ...connectedNodesTo, ...connectedNodesFrom];

                // change the color and size of the clicked node and all connected nodes
                for (let id of connectedNodesTo) {
                    if (!originalStyles.hasOwnProperty(id)) {
                        let node = network.body.nodes[id];
                        node.options.color = {
                            background: '#00FF00',
                            border: '#00FF00',
                            highlight: {background: '#00FF00', border: '#00FF00'}
                        };
                    }

                }
                for (let id of connectedNodesFrom) {
                    if (!originalStyles.hasOwnProperty(id)) {
                        let node = network.body.nodes[id];
                        node.options.color = {
                            background: '#FF0000',
                            border: '#FF0000',
                            highlight: {background: '#FF0000', border: '#FF0000'}
                        };
                    }

                }
                for (let id of allNodes) {
                    originalStyles[id] = 1;
                }
            } else {
                // if no node is clicked, restore the original styles
                for (let id in originalStyles) {
                    let node = network.body.nodes[id];
                    console.log(originalStyles[id]);
                    node.options.color = {
                        background: '#97C2FC',
                        border: '#2B7CE9',
                        highlight: {
                            border: '#2B7CE9',
                            background: '#D2E5FF'
                        },
                    };
                }
                originalStyles = {};  // clear the saved styles
            }
            network.redraw();
        })


    }, [visJsRef, nodes, edges]);
    {
        return <div ref={visJsRef}/>;
    }
}
