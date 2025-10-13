# First - Time Setup
## 🖥️ GUI — Aero Hand Open Control App

Launch the GUI from a terminal after installation:

```bash
aero-hand-gui
```

> If your system can’t find the command, ensure your Python environment’s scripts directory is on PATH and that the package was installed into the active environment.

<p align="center">
  <em>Screenshot of the GUI</em><br/>
  <img alt="Aero Hand GUI" src="imgs/gui.png" width="98%"/>
</p>

### 🧩 First‑Time Setup: Servo IDs (One‑by‑One)

1. **Power** the board with the servo rail 6V and connect USB.
2. **Connect exactly one servo** to the bus.
3. In the GUI, choose the correct **COM Port**, press **Connect**.
4. Click **Set ID** and assign the servo for the channel you’re wiring:

   * `0 → thumb_abduction_actuator`
   * `1 → thumb_flex_actuator`
   * `2 → thumb_tendon_actuator`
   * `3 → index_finger_actuator`
   * `4 → middle_finger_actuator`
   * `5 → ring_finger_actuator`
   * `6 → pinky_finger_actuator`
5. If the id is successfully set, You will receive an ACK in the RX bar below.
6. If you receive 65535 in oldid,new id and current as ACK , It indicates that the id is not successfully set.
7. Further after setting up the ID , you can move the responsible slider to make sure whether the actuator is moving or not.
8. Disconnect that servo, plug the next one, and **repeat** until all seven are assigned.

> The Set‑ID flow expects only **one** responding servo. If multiple are found, it will refuse to proceed to avoid accidental re‑ID.

### 🎛️ Top Bar Controls

* **Port**: Dropdown of available serial ports.
  Use **Refresh** to re‑scan if you plug/unplug devices.
* **Baud**: Serial speed. Default 921600 is typical for fast streaming and our firmware uses the same baudrate as well.
* **Connect / Disconnect**: Open or close the selected serial port.
* **Rate (Hz)**: How often the GUI streams **CTRL_POS** frames while you move sliders.
  **Recommended:** 50 Hz for smooth motion without saturating USB.

### 🧪 Action Buttons (left→right)

* **Homing** 🏠: Sends opcode `0x01` to run the on‑board homing routine.Any Other Input is ignored while homing is active; wait for ACK under a given timeout of 3minutes.
* **Set ID** 🆔: Guided flow to set a servo’s bus ID. Requires a **single** servo connected; the firmware verifies this before writing.
* **Trim Servo** ✂️: Fine‑tune alignment per channel. Enter **channel (0–6)** and **degrees offset** (±). The firmware adjusts/persists the channel’s `extend_count` in NVS so it survives reboots. Use small steps (±5–10°) and test.
* **Upload Firmware** ⬆️: Flash a `.bin` directly from the GUI. After selection, the board is reset into bootloader, the image is written, and the device restarts.
* **Set to Extend** 🔄: Sends a single **CTRL_POS** frame that sets **all channels to 0.000** (fully open / extend posture). Handy as a “panic open”.
* **GET_POS** 📍: Requests positions. Values are shown normalized **0.000 → 1.000**, computed from each channel’s `extend↔grasp` calibration (host 0..65535).
* **GET_VEL** 💨: Requests velocities of the actuator motions.
* **GET_CURR** 🔌: Requests currents in **mA**, **signed** — the **sign reflects motor direction** relative to the channel’s servo direction (use magnitude to gauge load).
* **GET_TEMP** 🌡️: Requests temperatures (°C) from each servo.
* **GET_ALL** 📦: Convenience burst that triggers **POS + VEL + CURR + TEMP** reads in one go and prints results to the log.

### 🧷 Sliders Panel (Center)

Each row controls a single actuator channel with a **normalized slider**:

* **0.000 → 1.000** maps linearly to the channel’s calibrated **extend ↔ grasp** range in 2 bytes and sent as 14 bytes payload using CTRL_POS Command.
* While you drag, the GUI streams **CTRL_POS** frames at the selected **Rate (Hz)**.
* Two small numeric readouts show the current command and (when polled) the latest normalized feedback.4

**Channel map (top→bottom):** `thumb_abduction_actuator`, `thumb_flex_actuator`, `thumb_tendon_actuator`, `index_finger_actuator`, `middle_finger_actuator`, `ring_finger_actuator`, `pinky_finger_actuator`.

### 📟 Status & Logs (Bottom)

* **Status bar** (left): Connection state (e.g., *Disconnected*, *COM12 @ 921600*), last error, and homing/flash progress messages.
* **RX Log**: Text console of responses/telemetry. Useful for debugging, verifying opcodes, and viewing GET_* results.
* **Clear Log**: Clears the RX Log display (does not affect device state).

### 🧰 Tips & Troubleshooting

* **Port not listed?** Click **Refresh**; check drivers, cables, and that no other app is holding the port.
* **Set‑ID fails?** Ensure only one servo is connected and the servo rail is powered.
* **No motion?** Verify you selected the correct hand build (left/right), try **Set to Extend**, then move sliders slowly.
* **Choppy control?** Lower **Rate (Hz)** or close other serial/USB‑heavy apps.

### 🐍 Python Control & Examples

Prefer scripting or automation? Use the Python SDK to send the same 16‑byte frames programmatically and log telemetry.

* Import the high‑level class (e.g., `AeroHand`) and browse **examples** in this repo’s `examples/` folder.
* The GUI and SDK speak the **same protocol**, so your scripts and the app can be used interchangeably during development.
