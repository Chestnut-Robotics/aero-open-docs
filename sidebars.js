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
    'intro', // Introduction page
    {
      type: 'category',
      label: 'Quick Start',
      link: {
        type: 'generated-index',
        title: 'Quick Start',
        description: 'Assembly, hardware setup, and first use.',
      },
      collapsed: false,
      items: [
        'assembly',
        'hardware_setup',
        'software_setup',
      ],
    },
    {
      type: 'category',
      label: 'Advanced Topics',
      link: {
        type: 'generated-index',
        title: 'Advanced Topics',
        description: 'SDK usage, ROS 2 integration, and simulation.',
      },
      collapsed: false,
      items: [
        'firmware',
        'sdk',
        'ros2',
        'hand_sim',
      ],
    },
    {
      type: 'category',
      label: 'Hardware Reference',
      link: {
        type: 'generated-index',
        title: 'Hardware Reference',
        description: 'Mechanical overview and PCB details.',
      },
      collapsed: false,
      items: [
        'mechanical_overview',
        'pcb',
        'mechanical',
      ],
    },
  ],
};

export default sidebars;
