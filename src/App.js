import React, {useCallback} from 'react';

import ReactFlow, {addEdge, Controls, useEdgesState, useNodesState,} from 'react-flow-renderer';

import SvgNode from "./custom/node/SvgNode";

import EditorArea from "./custom/editors/EditorArea";


//const edgeTypes = {
//  custom: CustomEdge,
//};


const nodeTypes = {
    custom: SvgNode
}


//TODO: before parsing, check if all necessary keys are present, if not, do user friendly error handling


const EdgesFlow = () => {

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

    return (
        <>
            <div style={{float: "right", marginRight: "5px"}}>
                <a href={"https://github.com/TiboStr/dataflow-visualization#readme"} target="_blank" rel="noreferrer">
                    Read the docs
                </a>
            </div>
            <EditorArea setNodes={setNodes} setEdges={setEdges}/>


            <div style={{
                width: window.innerWidth * 0.96,
                height: window.innerHeight * 0.96,
                border: "solid 1px black",
                margin: "10px auto 10px auto"
            }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    snapToGrid={true}
                    // edgeTypes={edgeTypes}
                    nodeTypes={nodeTypes}
                    fitView
                    attributionPosition="top-right"
                >
                    <Controls/>
                    {/*<Background/>*/}
                </ReactFlow>
            </div>
        </>
    );
};

export default EdgesFlow;
