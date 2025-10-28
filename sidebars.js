// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  // Manual sidebar configuration to control page order
  tutorialSidebar: [
    'intro',                    // Introduction page
    'assembly',                 // Assembly Instructions
    'hardware_setup',           // Hardware setup
    'getting_started',          // Getting Started guide
    'sdk',                      // SDK documentation
    'hand_sim',                 // Hand simulation
    'pcb',                      // PCB documentation
    'firmware',                 // Firmware documentation
    'mechanical',               // Mechanical documentation
    // 'ros2_comm',                // ROS2 communication
    // 'teleop',                   // Teleoperation
  ],
};

export default sidebars;
