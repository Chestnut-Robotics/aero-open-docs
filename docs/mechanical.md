# Mechanical

![Aero Hand Open – external view](https://raw.githubusercontent.com/TetherIA/aero-hand-open/main/assets/overview1.png)

Aero Hand Open is an anthropomorphic, tendon‑driven robotic hand with five fingers and 16 total joints.
The mechanics are optimized for:

* **High dexterity** with only 7 actuators
* **Back‑drivable, compliant behavior** through tendons and springs
* **Easy fabrication and repair** using 3D‑printed parts and off‑the‑shelf hardware

The sections below describe how the hand is built mechanically and how the main subsystems work.

---

## 1. Key Mechanical Specifications

| Item                          | Value                                                                       |
| ----------------------------- | --------------------------------------------------------------------------- |
| Overall size                  | **198 × 95 × 53.5 mm** (L × W × H)                                         |
| Mass                          | **< 400 g** (typical assembled mass ≈ 389 g)                 |
| Structure                     | 5‑finger anthropomorphic hand                                               |
| Total joints                  | **16 joints** (4 fingers × 3 + thumb with 4)                 |
| Active DoF                    | **7 active DoF** (1 per finger, 3 for thumb)                 |
| Passive DoF                   | **9 passive joints** via coupled tendon/spring design        |
| Actuation                     | 7 × coreless serial‑bus servos, tendon‑driven, back‑drivable |
| Fingertip force (approx.)     | **~12 N**                                                    |
| Open/close cycle              | **~1.2 Hz** full open–close motion                             |
| Finger joint range            | Flexion/extension up to **90°**                              |
| Thumb abduction               | **0° – 100°** at the CMC abduction joint                     |
| Thumb CMC flexion             | **55°** range                                                |
| Thumb proximal/distal flexion | **90°** combined range                                       |
| Material (structural)         | 3D‑printed **nylon** (SLS/FFF)                               |
| Bearings                      | Miniature radial bearings on all revolute joints                            |
| Power input                   | **6 V DC**, max **8 A**                                      |
| MCU & interface               | On‑board ESP32‑S3, USB 2.0 serial communication              |

---

## 2. Overall Mechanical Architecture

![Aero Hand Open – internal view](https://raw.githubusercontent.com/TetherIA/aero-hand-open/main/assets/overview5.png)

Mechanically, the hand consists of three major subsystems:

1. **Finger modules (×4)**

   * Each finger is a self‑contained mechanism powered by a single tendon‑driven servo.
   * Three revolute joints (MCP, PIP, DIP) are coupled so that one actuator curls the whole finger.

2. **Thumb module (×1)**

   * Three active DoFs: abduction/adduction at the CMC joint, CMC flexion/extension, and MCP/IP flexion.
   * Uses both linkage and tendon mechanisms to achieve human‑like opposition and grasp shapes.

3. **Palm and servo frame**

   * A two‑piece palm shell (front and rear frames) houses 4 finger servos and 3 thumb servos, along with the servo bus bar and control PCB.
   * A dedicated **servo frame** prints as a single part that locks the thumb actuators, abduction linkage, and routing channels together.

The entire structure is assembled from 3D‑printed components, steel pins, miniature bearings, and return springs. The design is intentionally modular: any finger or the thumb can be removed and replaced without disassembling the entire hand.([GitHub][3])

---

## 3. Degrees of Freedom & Kinematics

### 3.1 DOF Breakdown

* **Fingers (index, middle, ring, little)**

  * 3 anatomical joints each: MCP, PIP, DIP.
  * Actuated DoF: **1 per finger** (flexion/extension via tendon).
  * Passive DoF: **2 per finger** through internal coupling.

* **Thumb**

  * **Abduction/adduction CMC** – 1 active DoF via servo and crank‑rocker linkage.
  * **CMC flexion/extension** – 1 active DoF via tendon.
  * **MCP/IP flexion** – 1 active DoF via tendon, with passive coupling between proximal and distal phalanges.

Total: **7 active DoF + 9 passive joints = 16 joints.**

### 3.2 Joint Coupling Strategy

The hand uses coupling to increase functional dexterity without adding actuators:

* **DIP–PIP coupling (fingers & thumb)**
  A dedicated **coupling cable** links the distal and medial joints in each finger.
  The cable is routed through the medial link and wrapped around a cross‑bar in the distal link, then mechanically anchored with a small screw. When the tendon flexes the finger, this cable enforces a **passive 1:1 motion** between DIP and PIP, ensuring natural curling.

* **Adaptive MCP behavior**
  MCP joints use extension springs anchored between the palm and the finger proximal link. When the tendon is pulled, the distal joints flex first; once contact is made with an object, additional tendon tension causes the MCP to flex, creating **adaptive, compliant grasps**.

This under‑actuated strategy allows each finger to wrap around objects of varying shapes while still being driven by a single motor.

---

## 4. Finger Module Design

Each finger is built from five 3D‑printed parts: **Finger Base, MCP link, Proximal, Medial, and Distal phalanges**.

### 4.1 Joint Hardware

* **Bearings**
  Every joint uses two miniature **2 × 5 × 2.5 mm radial bearings** pressed into the mating links, captured by **2 mm steel pins**. This reduces friction, improves repeatability, and protects the plastic parts from wear.

* **Pins**
  Stainless pins of varying lengths (2×10 mm, 2×14 mm, 2×20 mm) form the revolute axes and anchor springs and linkage bars. The assembly guide recommends verifying free rotation after deburring the printed parts.

* **Return springs**

  * One spring spans the MCP joint to restore the finger to an extended posture.
  * A second spring connects the medial and distal links and helps open the finger after flexion.

### 4.2 Tendon Routing (Finger Flexion)

Each finger has two internal cable systems:

1. **Pull cable (from servo)**

   * Originates at a spool mounted directly on the servo output shaft.
   * Runs through the finger base, between the bearings in the distal link, and exits near the fingertip where it is tied off using an Ashley stopper knot.
   * When the servo winds the cable, the entire finger curls; when released, springs and contact forces extend it.

2. **Coupling cable (DIP–PIP)**

   * Independent of the pull cable, routed through the proximal and medial links and looped around the distal cross‑member.
   * Fixed by clamping under a small M2 screw; tension is set during assembly so that DIP and PIP maintain the same angle throughout motion.

This combination gives each finger a natural, human‑like curling trajectory with only one actuator and supports adaptive wrap around objects.

---

## 5. Thumb Module Design

The thumb is mechanically richer than the fingers, providing 3 active DoFs.

### 5.1 Thumb Skeleton

The thumb uses four printed parts: **CMC base, MCP block, proximal phalanx, and distal phalanx**. These are joined with bearings, pins, and springs similar to the fingers, plus a dedicated thumb return spring at the CMC/MCP interface.

### 5.2 Abduction/Adduction (Servo 0 + Linkage)

![Thumb abduction linkage](https://raw.githubusercontent.com/TetherIA/aero-hand-open/main/assets/overview6.png)

* A dedicated servo with a **two‑disk crank linkage** rotates the thumb around its CMC abduction axis.
* An aluminum servo plate is sandwiched between upper and lower plastic disks; a short **linkage bar** connects this disk pair to the CMC base using a 2×10 mm pin.
* This arrangement converts servo rotation into smooth abduction/adduction over approximately **0–100°**.

### 5.3 CMC Flexion Tendon (Servo 1)

* A second servo mounted in the servo frame drives a spool whose cable routes along the palm and attaches to the MCP block through a dedicated hole closer to the back of the hand.
* Pulling this tendon flexes the CMC joint (bringing the thumb across the palm), with a total flexion range of about **55°**.

### 5.4 MCP/IP Flexion Tendon (Servo 2 + Coupling Cable)

* The third thumb servo controls the **overall curl** of the thumb.
* Its tendon passes through the CMC base, around a bearing at the MCP, then through the proximal link and anchors in the distal link.
* A **thumb coupling cable** (similar to the finger DIP–PIP cable) is routed inside the thumb to keep the proximal and distal joints coordinated, so the thumb curls like a human thumb when the tendon is flexed.

Combined, these three actuators allow the thumb to oppose any finger, perform pinch, tripod, and power grasps, and adjust its orientation for in‑hand manipulation.

---

## 6. Palm, Servo Frame & Electronics Integration

### 6.1 Palm Structure

The palm is split into:

* **Rear palm frame**

  * Provides the structural backbone and mounting for all four finger bases.
  * Contains anchor points for MCP extension springs and cavities for the servo frame and wiring.

* **Front palm shell**

  * Covers the mechanism and provides external contact surface.
  * Optionally carries a silicone pad for improved friction and impact absorption.

Both are 3D‑printed in nylon and fastened with self‑tapping screws and heat‑set inserts where necessary.

### 6.2 Servo Layout

![Servo and internal layout](https://raw.githubusercontent.com/TetherIA/aero-hand-open/main/assets/overview7.png)

* **Finger servos (×4)** are mounted inline along the back of the palm, each directly behind its corresponding finger. Tendon routing is short and nearly straight, reducing compliance and friction.
* **Thumb servos (×3)** are mounted on a dedicated **servo frame** that slides into the palm as a module. This frame also carries the abduction linkage components.

The serial‑bus servos are daisy‑chained via a small bus bar board or using 3‑way connectors. A power lead and single USB‑connected ESP32‑S3 board handle power and communication for the entire hand.

---

## 7. Materials & Manufacturing

### 7.1 3D‑Printed Parts

* All structural parts (fingers, thumb, palm, servo frame) are manufactured from **nylon** using standard FFF or SLS processes.
* Reference print settings (from the open‑source release): printed on a Bambu X1C with **0.4 mm nozzle, 0.2 mm layer height, tree supports, “support on build plate only”**. Maintaining the original print orientation helps minimize support and ensures consistent joint clearances.([GitHub][3])

After printing, parts are:

* **Deburred and cleaned** with flush cutters, files, and sandpaper, especially around joint bores and mating surfaces.
* **Joint holes** are opened to final size using **1.0, 2.0, and 2.1 mm drill bits** as indicated in the assembly guide.

### 7.2 Metal Hardware & Tendons

* Joints use steel pins and miniature bearings for long‑term durability.

* Tendons are made from **Vectran** cable, pre‑cut to 300 mm segments and terminated with **Ashley stopper knots**. Marked lengths on the cable ensure consistent pre‑tension across hands.

* Optional **silicone fingertip inserts and palm pads** can be molded and glued into the distal and proximal shells to increase friction and protect the plastic during high‑cycle operation.

---

## 8. Compliance, Backdrivability & Protection

The hand is designed to be both **back‑drivable** and robust for high‑cycle experiments:

* **Tendon drive + coreless servos** make joints naturally compliant in the presence of external forces while retaining position controllability.
* **Extension springs** at each MCP joint bring the fingers back to neutral and absorb impact when the hand strikes or releases objects suddenly.
* For sustained testing (**>10,000 cycles** per joint), the assembly guide recommends adding a small drop of super glue at the ends of all pins to prevent axial creep.

Together, these design choices allow Aero Hand Open to withstand repeated impact and grasp cycles without sacrificing safety or mechanical transparency.

---

## 9. CAD Models & Further Resources

* **Full CAD & mechanical files**: [`hardware/`](https://github.com/TetherIA/aero-hand-open/tree/main/hardware) folder in the GitHub repository (STEP files, assemblies, and 3D print files).
* **Interactive 3D model** (Onshape): [Online CAD visualization](https://cad.onshape.com/documents/afc7e0ca7eb6d412ec8771f8/w/bc4d7e45e17e23d622d2bad2/e/c711982b7882da925263fb55)
* **Assembly instructions**: detailed step‑by‑step guide covering joint assembly, tendon routing, and cable tensioning.

If you’re planning to modify the mechanics (custom fingers, new sensors, different servos), the recommended starting point is to fork the `hardware` CAD, keep the existing interface points to the palm and servo frame, and then re‑export your modified parts using the same print orientations and tolerances.

---

[3]: https://github.com/TetherIA/aero-hand-open?tab=readme-ov-file "GitHub - TetherIA/aero-hand-open: https://shop.tetheria.ai/"
