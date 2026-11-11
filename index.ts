import * as THREE from 'three';
import * as xb from 'xrblocks';
import { JarvisCore } from './3d/JarvisCore';
import { AgentHolograms } from './3d/AgentHolograms';
import { SpatialCards } from './3d/SpatialCards';
import { HudOverlay } from './ui/HudOverlay';
import { swarmOrchestrator } from './services/swarmOrchestrator';

class AetherXRScene extends xb.Script {
  private jarvisCore?: JarvisCore;
  private agentHolograms?: AgentHolograms;
  private spatialCards?: SpatialCards;
  private groundGrid?: THREE.GridHelper;
  private hudOverlay?: HudOverlay;
  private clock = new THREE.Clock();

  init() {
    // 1. Studio Lighting Setup
    this.add(new THREE.HemisphereLight(0x38bdf8, 0x0f172a, 2.5));

    const keyLight = new THREE.DirectionalLight(0x67e8f9, 2.0);
    keyLight.position.set(2, 4, 3);
    this.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xa855f7, 1.8);
    rimLight.position.set(-2, 3, -2);
    this.add(rimLight);

    // 2. Holographic Ground Grid
    this.groundGrid = new THREE.GridHelper(16, 32, 0x38bdf8, 0x1e293b);
    this.groundGrid.position.set(0, 0, 0);
    this.add(this.groundGrid);

    // Responsive 3D scaling and positioning for mobile screens
    const isMobile = window.innerWidth <= 768;
    const coreZ = isMobile ? -1.8 : -1.5;
    const coreY = isMobile ? 1.35 : 1.45;
    const coreScale = isMobile ? 0.72 : 1.0;

    // 3. Central 3D Jarvis Core
    this.jarvisCore = new JarvisCore();
    this.jarvisCore.position.set(0, coreY, coreZ);
    this.jarvisCore.scale.setScalar(coreScale);
    this.add(this.jarvisCore);

    // 4. Floating 3D Agent Holograms
    this.agentHolograms = new AgentHolograms();
    if (isMobile) {
      this.agentHolograms.scale.setScalar(0.75);
      this.agentHolograms.position.set(0, -0.1, -0.3);
    }
    this.add(this.agentHolograms);

    this.agentHolograms.onAgentSelected = (agentId) => {
      const agent = swarmOrchestrator.getAgent(agentId);
      if (agent) {
        swarmOrchestrator.handleUserInput(`Diagnostic check for ${agent.name}: "${agent.title}". Summarize status.`);
      }
    };

    // 5. XR Blocks World Spatial Cards
    this.spatialCards = new SpatialCards();
    if (isMobile) {
      this.spatialCards.swarmCard.scale.setScalar(0.7);
      this.spatialCards.modelCard.scale.setScalar(0.7);
      this.spatialCards.codeCard.scale.setScalar(0.7);
      this.spatialCards.swarmCard.position.set(0, 1.3, -1.6);
      this.spatialCards.modelCard.position.set(-0.55, 1.3, -1.45);
      this.spatialCards.codeCard.position.set(0.55, 1.3, -1.45);
    }
    this.add(this.spatialCards.swarmCard);
    this.add(this.spatialCards.modelCard);
    this.add(this.spatialCards.codeCard);

    // Window resize handler for 3D scale adjustment
    window.addEventListener('resize', () => {
      const mob = window.innerWidth <= 768;
      const s = mob ? 0.72 : 1.0;
      const z = mob ? -1.8 : -1.5;
      const y = mob ? 1.35 : 1.45;
      if (this.jarvisCore) {
        this.jarvisCore.position.set(0, y, z);
        this.jarvisCore.scale.setScalar(s);
      }
      if (this.agentHolograms) {
        this.agentHolograms.scale.setScalar(mob ? 0.75 : 1.0);
        this.agentHolograms.position.set(0, mob ? -0.1 : 0, mob ? -0.3 : 0);
      }
      if (this.spatialCards) {
        const cardScale = mob ? 0.7 : 1.0;
        this.spatialCards.swarmCard.scale.setScalar(cardScale);
        this.spatialCards.modelCard.scale.setScalar(cardScale);
        this.spatialCards.codeCard.scale.setScalar(cardScale);
        if (mob) {
          this.spatialCards.swarmCard.position.set(0, 1.3, -1.6);
          this.spatialCards.modelCard.position.set(-0.55, 1.3, -1.45);
          this.spatialCards.codeCard.position.set(0.55, 1.3, -1.45);
        } else {
          this.spatialCards.swarmCard.position.set(0, 1.45, -1.25);
          this.spatialCards.modelCard.position.set(-0.66, 1.45, -1.05);
          this.spatialCards.codeCard.position.set(0.66, 1.45, -1.05);
        }
      }
    });

    // 6. Initialize 2D DOM Futuristic HUD Overlay
    this.hudOverlay = new HudOverlay();
  }

  update() {
    const delta = this.clock.getDelta();
    const elapsed = this.clock.getElapsedTime();

    if (this.jarvisCore) {
      this.jarvisCore.update(delta, elapsed);
    }

    if (this.agentHolograms) {
      this.agentHolograms.update(delta, elapsed);
    }

    if (this.groundGrid) {
      this.groundGrid.rotation.y += 0.02 * delta;
    }
  }

  onSelectStart(event: xb.SelectEvent) {
    if (this.agentHolograms && event.target) {
      this.agentHolograms.handleRaycastHit(event.target);
    }
  }

  dispose() {
    this.jarvisCore?.dispose();
    this.agentHolograms?.dispose();
    this.groundGrid?.geometry.dispose();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const options = new xb.Options();
  options.enableReticles();
  options.simulator.defaultMode = xb.SimulatorMode.CONTROLLER;

  xb.add(new AetherXRScene());
  xb.init(options);
});
