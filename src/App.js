import React, { Component }  from 'react';
import logo from './logo.svg';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import './App.css';

class App extends Component {


  componentDidMount() {
      this.sceneSetup();
      this.addCustomSceneObjects();
      this.startAnimationLoop();
  }
  sceneSetup = () => {
    // get container dimensions and use them for scene sizing
    const el = document.getElementById("thing")
    const width =1000;
    const height = 500;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
        75, // fov = field of view
        width / height, // aspect ratio
        0.1, // near plane
        1000 // far plane
    );
    
    // set some distance from a cube that is located at z = 0
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( width, height );
    el.appendChild( this.renderer.domElement ); // mount using React ref

  };

  addCustomSceneObjects = () => {
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshPhongMaterial( {
        color: 0x156289,
        emissive: 0x072534,
        side: THREE.DoubleSide,
        flatShading: true
    } );
    this.cube = new THREE.Mesh( geometry, material );
    this.scene.add( this.cube );

    const lights = [];
    lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
    lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
    lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

    lights[ 0 ].position.set( 0, 200, 0 );
    lights[ 1 ].position.set( 100, 200, 100 );
    lights[ 2 ].position.set( - 100, - 200, - 100 );

    this.scene.add( lights[ 0 ] );
    this.scene.add( lights[ 1 ] );
    this.scene.add( lights[ 2 ] );
  };
  startAnimationLoop = () => {
      this.cube.rotation.x += 0.01;
      this.cube.rotation.y += 0.01;

      this.renderer.render( this.scene, this.camera );
      this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  };
  render(){
    return (
      <div className="App">
        <div id="thing"></div>

      </div>
    );
  }
}

export default App;
