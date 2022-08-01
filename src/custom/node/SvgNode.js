import React, {memo} from 'react';

import {Handle} from 'react-flow-renderer';

import {NODE_KEYS} from "../editors/editorUtil";
import {getShape} from "./nodeUtil";


export default memo(({data, isConnectable}) => {

    let width = data[NODE_KEYS.WIDTH];
    let height = data[NODE_KEYS.HEIGHT];

    let fontsize = data[NODE_KEYS.FONTSIZE];

    let element = getShape(data[NODE_KEYS.SHAPE], data[NODE_KEYS.FILL], data[NODE_KEYS.STROKE], data[NODE_KEYS.STROKE_WIDTH]);

    return (
        <>
            <svg style={{width: width, height: height}}>
                <svg style={{width: width}} key={Math.random()}>

                    {
                        element
                    }

                </svg>

                <svg style={{width: width, height: height}}>
                    {data[NODE_KEYS.IMAGE] &&
                        (getShape(data[NODE_KEYS.IMAGE]) ||
                            <image key={Math.random()} href={data[NODE_KEYS.IMAGE]} width="100%" height="100%"
                                   preserveAspectRatio="xMinYMin slice"/>)
                    }
                </svg>


                <text fontSize={fontsize}  /*x="50%" y="50%"*/ /*dominantBaseline="middle" textAnchor="middle"*/>
                    {data[NODE_KEYS.TITLE] &&
                        <tspan key={Math.random()} x="50%" y={(data[NODE_KEYS.STROKE_WIDTH] || 1) + fontsize}
                               dominantBaseline="middle" textAnchor="middle">{data.title}</tspan>
                    }
                    {data[NODE_KEYS.LABEL] &&
                        data.label.split("\n").map((e, i) => {
                            if (i !== 0) {
                                return <tspan key={i} x="50%" dy={fontsize} dominantBaseline="middle"
                                              textAnchor="middle">{e}</tspan>
                            } else {
                                return <tspan key={i} x="50%"
                                              y={50 - ((data[NODE_KEYS.LABEL].split("\n").length - 1) * height / fontsize / 2) + "%"}
                                              dominantBaseline="middle" textAnchor="middle">{e}</tspan>
                            }
                        })}

                </text>

            </svg>

            {
                // type, position, id
                [["source", "right", "right-source"], ["source", "bottom", "bottom-source"],
                    ["target", "left", "left-target"], ["target", "top", "top-target"],
                    ["source", "top", "top-source"], ["source", "left", "left-source"],
                    ["target", "bottom", "bottom-target"], ["target", "right", "right-target"]
                ].map((e, i) => {
                    return (
                        <Handle
                            type={e[0]}
                            position={e[1]}
                            id={e[2]}
                            style={{visibility: "hidden"}}
                            isConnectable={isConnectable}
                            key={i}
                        />
                    );
                })
            }

        </>
    );
});
