// Reference:
// Show coordinates of each atom: https://nglviewer.org/ngl/api/class/src/proxy/atom-proxy.js~AtomProxy.html

import React, {useEffect} from 'react';
import * as NGL from 'ngl';

export default function Viewer({url, file, numbers})  {

    useEffect (() => {
        var stage = new NGL.Stage("viewport");
        // create tooltip element and add to the viewer canvas
        var tooltip = document.createElement("div");
        Object.assign(tooltip.style, {
          display: "none",
          position: "absolute",
          zIndex: 10,
          pointerEvents: "none",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          color: "lightgrey",
          padding: "0.5em",
          fontFamily: "sans-serif"
        });
        stage.viewer.container.appendChild(tooltip);

        if(url) {
        stage.loadFile(url, {defaultRepresentation: true, ext: 'pdb'})
            .then(function(o){
                if(numbers == null) {
                    return
                }
                numbers.forEach((e) => {
                    let mid = parseInt(numbers.length/2)
                    var selection = new NGL.Selection( e[0]+":"+e[1] );
                    var atomSet = o.structure.getAtomSetWithinSelection( selection, 1 );
                    o.addRepresentation( "point", {pointSize:2,sele:atomSet.toSeleString(), color:'blue'});
                    o.addRepresentation( "cartoon" );
                    o.autoView();
                })
            });
        }
        if(file) {
            stage.loadFile(file, {defaultRepresentation: true, ext: 'pdb'})
            .then(function(o){
                stage.autoView();
                if(numbers == null) {
                    return
                }
                numbers.forEach((e) => {
                    let mid = parseInt(numbers.length/2)
                    var selection = new NGL.Selection( e[0]+":"+e[1] );
                    var atomSet = o.structure.getAtomSetWithinSelection( selection, 1 );
                    o.addRepresentation( "point", {pointSize:2,sele:atomSet.toSeleString(), color:'blue'});
                    o.addRepresentation( "cartoon" );
                    o.autoView();
                })
            });           
        }
        
        // listen to `hovered` signal to move tooltip around and change its text
        stage.signals.hovered.add(function (pickingProxy) {
            if (pickingProxy && (pickingProxy.atom || pickingProxy.bond)){
            var atom = pickingProxy.atom || pickingProxy.closestBondAtom;
            var cp = pickingProxy.canvasPosition;
            tooltip.innerText = "x: "+atom.x.toFixed(3)+", y: "+atom.y.toFixed(3)+", z: "+atom.z.toFixed(3);
            tooltip.style.bottom = cp.y;
            tooltip.style.left = cp.x;
            tooltip.style.display = "block";
            tooltip.style.padding = "0px 4px";
            tooltip.style.color = "white";
            }else{
                tooltip.style.display = "none";
            }
        });
    });

    return (
        <div>
        <div id="viewport" style={{width:"100%", height:"73vh"}}/>
        <p>Ctrl + Left click to drag the molecule.<br/>
        Acknowledgment: <a href="https://nglviewer.org/ngl/api/" target="_blank">NGL</a></p>
        </div>
    );
}