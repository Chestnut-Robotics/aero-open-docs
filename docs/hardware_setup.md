# Hardware Setup

import cableConnection from './hardware_setup_assets/cable_connection.jpg';
import setupImage from './hardware_setup_assets/setupimage.png';
import powerConnection from './hardware_setup_assets/powerconnection.png';
import finishedSetup from './hardware_setup_assets/finishedsetup.png';
import finishedSetup2 from './hardware_setup_assets/finishedsetup2.png';
import finishedSetup3 from './hardware_setup_assets/finishedsetup3.png';

This page covers everything you need to wire and power the Aero Hand Open.

### **Option 1 (Recommended)**

If you purchase the pre-assembled hand, choose this option—no extra parts required.

If you assembled the hand yourself, we strongly recommend using our PCBs and power supply for the fastest, most reliable setup: [Order PCBs](https://shop.tetheria.ai/products/pcbs) · [Order Power Supply](https://shop.tetheria.ai/products/10a-6vdc-power-supply)

<img src={cableConnection} alt="Complete wiring with Aero PCBs" width="40%" />

If you bought everything from us, you can skip the rest of the page.

### Option 2 (For advanced DIY)
Prefer to manufacture and solder the PCBs yourself? All fabrication files are in the [PCB](https://github.com/TetherIA/aero-hand-open/tree/main/hardware/PCB) folder.

### Option 3 (For hardcore DIY)
Hand-wire everything using protoboard and connectors (Molex 3‑pin, JST). This requires careful soldering and may not support peak current for all motors. You will need:
- Protoboard
- Molex 3-pin connectors (for servos)
- JST connectors
- Servo cables
- Soldering tools

Once you have all parts, follow the quick-start below (full details are in the **Hardware Setup Guide** folder).

1. Solder pin headers to the ESP and connect to the TTLinker Mini Board.
   <img src={setupImage} alt="ESP to TTLinker Mini Board wiring" width="70%" />

2. Connect the regulated 6V 10A power supply.
   <img src={powerConnection} alt="6V 10A power supply wiring" width="70%" />

3. Verify the final layout looks similar to this.
   <img src={finishedSetup} alt="Finished wiring layout example 1" width="70%" />

**OR** if you want to do soldered connections on a board directly instead of using a protoboard, then your connections will look like this.

<img src={finishedSetup2} alt="Finished wiring layout example 2" width="70%" />

**OR** it will looks like this, depending on how you soldered it.

<img src={finishedSetup3} alt="Finished wiring layout example 3" width="70%" />


:::tip
If you have any questions, please reach out to our community on [Discord](https://discord.gg/ZQKWK7NebQ).
:::

<div align="center">

Made with ❤️ by **TetherIA Robotics**

</div>
