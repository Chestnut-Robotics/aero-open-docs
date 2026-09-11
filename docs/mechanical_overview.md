# Mechanical Overview

![Aero Hand Open – front view](https://raw.githubusercontent.com/chestnut-robotics/aero-hand-open/main/assets/overview1.png)

Aero Hand Open is a compact, anthropomorphic five‑finger robotic hand designed to be easy to mount, wire, and control.

---

## 1. Form Factor & Appearance

### Overall size & weight

* **Size (L × W × H)**: **198 mm × 95 mm × 53.5 mm**
* **Mass**: **< 400 g** (fully assembled)
* **Layout**: 4 fingers + 1 thumb, human‑like proportions

The hand has a slim back‑of‑hand profile and a gently curved palm so it can work close to cameras, tools, and robot wrists without bulky back‑mounted motors.

### Exterior materials

* **Body & fingers**: 3D‑printed PLA shell
* **Contact surfaces**: optional silicone pads for the fingertips and palm to increase grip and impact protection

The external geometry is identical across kits; printing or color variations only affect appearance, not the interface.

### Left / right variants

Aero Hand Open is available as:

* **Right hand**
* **Left hand** (mirrored geometry)

Both versions share the same mechanical specs and control API.

### Additional views

![Aero Hand – angled view](https://raw.githubusercontent.com/chestnut-robotics/aero-hand-open/main/assets/overview2.png)
![Aero Hand – palm view](https://raw.githubusercontent.com/chestnut-robotics/aero-hand-open/main/assets/overview3.png)
![Aero Hand – side view](https://raw.githubusercontent.com/chestnut-robotics/aero-hand-open/main/assets/overview4.png)

---

## 2. Key Mechanical Specs

| Item                  | Value / Description                          |
| --------------------- | -------------------------------------------- |
| Size (L × W × H)      | **198 × 95 × 53.5 mm**                       |
| Mass                  | **< 400 g**                                  |
| Structure             | Anthropomorphic, 5‑finger hand               |
| Joints                | **16 joints** total                          |
| Active DoF            | **7 active DoF** (3 thumb, 4 fingers)        |
| Passive joints        | **9** (underactuated finger/thumb mechanics) |
| Fingertip force       | ≈ **12 N** per fingertip                     |
| Open/close speed      | ≈ **1.2 Hz** full open + full close            |
| Finger joint ROM      | Up to **90°** flexion per finger             |
| Thumb abduction ROM   | **0°–100°**                                  |
| Thumb CMC flex ROM    | ≈ **55°**                                    |
| Thumb proximal/distal | ≈ **90°** combined flexion                   |
| Working voltage       | **6 V DC** (servo rail)                      |
| Max current           | **8 A** (entire hand)                        |
| Communication         | **USB 2.0** via on‑board ESP32‑S3            |

---

## 3. Degrees of Freedom

### DoF breakdown

From the outside, the hand provides:

* **Thumb (3 DoF)**

  * **Abduction / adduction** – thumb swings in and out of the palm
  * **Base flexion** – thumb moves across the palm
  * **Thumb curl** – tip of the thumb closes for grasping

* **Fingers (4 DoF)**

  * **Index finger flexion**
  * **Middle finger flexion**
  * **Ring finger flexion**
  * **Pinky finger flexion**

Internally, these map to 16 joints (including passive joints) to produce human‑like curling and grasp shapes, but only 7 channels need to be commanded.

### Typical motion ranges

Approximate visible motion ranges:

* **Finger flexion** (index / middle / ring / pinky):
  up to **90°** (from straight to curled)
* **Thumb abduction**:
  **0°–100°** (from inline with the palm to fully spread)
* **Thumb CMC flexion**:
  about **55°** across the palm
* **Thumb curl (proximal + distal)**:
  about **90°** toward the palm

These ranges allow the hand to perform pinch, tripod, cylindrical/power, and hook grasps.

---

## 4. Mounting Interface

The wrist side of the palm provides a flat mounting surface with threaded inserts for attaching to robot wrists and adapters.

* **Mounting surface**: flat circular/oval pad at the wrist
* **Fasteners**: four **M3 threaded inserts** accessible from the outside
* **Usage**: mount directly to your robot flange, or to an intermediate adapter plate

Exact hole spacing and coordinate frames are available in the open CAD:

[Interactive CAD](https://cad.onshape.com/documents/afc7e0ca7eb6d412ec8771f8/w/bc4d7e45e17e23d622d2bad2/e/c711982b7882da925263fb55)

---

## 5. Ports, Power & Electronics Access

All electronics are inside the palm; externally, you only interact with a small set of ports.

### Power

* **Input voltage**: **6 V DC**
* **Max current**: **8 A** (for all 7 servos)
* **Typical supply**: bench supply or robot power bus with appropriate 6 V regulation

The exact connector form factor may vary between board revisions (XT‑style or equivalent). See the PCB / electronics documentation for pinout and wiring examples.

### Data / Communication

* **On‑board MCU**: ESP32‑S3
* **Interface**: **USB 2.0**, single cable to your host
* **Usage**:

  * Commanding actuator targets (positions/velocities)
  * Reading feedback (positions, currents, temperatures, status)
  * Firmware updates and configuration

USB appears as a standard serial device on the host; the GUI and SDK connect to this port directly.


---

## 6. Hand Features (At a Glance)

* **Compact & lightweight**

  * Sub‑400 g with a 198 mm length makes it suitable for desktop arms and mobile platforms.

* **Human‑like motion**

  * 5 fingers, 16 joints, and 7 actuated DoF provide natural curling and thumb opposition.

* **Clean external interface**

  * Flat wrist mounting pad with M3 inserts
  * Single USB data link + 6 V power rail

* **Consistent actuator API**

  * Fixed 7‑channel layout for all units
  * Normalized `[0.0, 1.0]` command range for easy integration into controllers and RL policies.
