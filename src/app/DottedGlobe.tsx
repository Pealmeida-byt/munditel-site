"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// ─────────────────────────────────────────────────────────────────────────────
// GLOBO DE PONTOS (estilo da referência do Pinterest)
//
// Globo 3D feito de milhares de pontos formando os continentes, girando sozinho.
// Verde nos continentes, azul nos oceanos. Mapa de continentes EMBUTIDO no código
// (não depende de internet nem de imagem externa — evita problemas de CORS).
//
// Usa three.js — já instalado com:  npm install three @types/three
// ─────────────────────────────────────────────────────────────────────────────

export default function DottedGlobe() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 320;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const RADIUS = 120;

    // Esfera base escura (oceano de fundo, dá volume ao globo)
    const baseGeo = new THREE.SphereGeometry(RADIUS - 3, 48, 48);
    const baseMat = new THREE.MeshBasicMaterial({ color: 0x04101f });
    globeGroup.add(new THREE.Mesh(baseGeo, baseMat));

    // ── Mapa de continentes EMBUTIDO ──
    // Cada string é uma faixa de latitude (topo = +90°, base = -90°).
    // '#' = terra, ' ' = água.
    const WORLD = [
      "                                                                ",
      "                                                                ",
      "        ###### ####            #######                          ",
      "    ###################       ###########          ###          ",
      "   #####################     #############     ###########       ",
      "   ######################    ##############   #############      ",
      "    #####################   ################  #############      ",
      "     ##################     ################# ############       ",
      "      ###############        ################# ##########        ",
      "        ###########          ################  ########          ",
      "          ########            ##############    #####            ",
      "           ######              ###########       ###             ",
      "            #####               #########         ##             ",
      "            #####                ########          #             ",
      "             ####                #######                         ",
      "             ####                 ######                         ",
      "              ###                 ######          ###           ",
      "              ###                  #####         #####          ",
      "              ###                  #####        ######          ",
      "              ##                    ####         ####           ",
      "              ##                     ###          ##            ",
      "               #                     ###                        ",
      "               #                      ##                        ",
      "                                       #                        ",
      "                                                                ",
      "                                                                ",
    ];

    const landChecker = (lon: number, lat: number) => {
      const rows = WORLD.length;
      const cols = WORLD[0].length;
      const col = Math.floor(((lon + 180) / 360) * cols);
      const row = Math.floor(((90 - lat) / 180) * rows);
      if (row < 0 || row >= rows || col < 0 || col >= cols) return false;
      return WORLD[row][col] === "#";
    };

    // ── Construir os pontos na esfera ──
    const positions: number[] = [];
    const colors: number[] = [];

    const green = new THREE.Color(0x7ec850);
    const greenDark = new THREE.Color(0x4e9b3a);
    const blue = new THREE.Color(0x1f4f86);
    const blueLight = new THREE.Color(0x3b82c4);

    const SAMPLES = 12000;
    const offset = 2 / SAMPLES;
    const increment = Math.PI * (3 - Math.sqrt(5)); // ângulo áureo

    for (let i = 0; i < SAMPLES; i++) {
      const y = i * offset - 1 + offset / 2;
      const r = Math.sqrt(1 - y * y);
      const phi = i * increment;
      const x = Math.cos(phi) * r;
      const z = Math.sin(phi) * r;

      const lat = Math.asin(y) * (180 / Math.PI);
      const lon = Math.atan2(z, x) * (180 / Math.PI);

      const isLand = landChecker(lon, lat);

      // Oceano fica menos denso (pula metade dos pontos de água)
      if (!isLand && i % 2 !== 0) continue;

      positions.push(x * RADIUS, y * RADIUS, z * RADIUS);

      let c: THREE.Color;
      if (isLand) {
        c = Math.random() > 0.5 ? green : greenDark;
      } else {
        c = Math.random() > 0.75 ? blueLight : blue;
      }
      colors.push(c.r, c.g, c.b);
    }

    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    dotGeo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const dotMat = new THREE.PointsMaterial({
      size: 2.6,
      vertexColors: true,
      sizeAttenuation: true,
      transparent: true,
      opacity: 1,
    });

    globeGroup.add(new THREE.Points(dotGeo, dotMat));

    // Leve inclinação do eixo (como a Terra)
    globeGroup.rotation.z = 0.15;

    // ── Animação (giro) ──
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      globeGroup.rotation.y += 0.004;
      renderer.render(scene, camera);
    };
    animate();

    // ── Responsivo ──
    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // ── Cleanup ──
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
}
