# ROS 2 Control Stack

The **TetherIA Aero Hand Open** ROS 2 workspace is composed of tightly coupled packages that wrap
the hardware SDK, expose teleoperation interfaces, define the shared communication schema, and
provide tooling for reinforcement-learning policy deployment. This page summarizes what each
package does and how they fit together so you can deploy, debug, and extend the stack quickly.

---

## 🚀 Workspace Setup

1. Install a supported ROS 2 distribution (Humble and Rolling are the primary targets).
2. Clone [`aero-hand-open`](https://github.com/TetherIA/aero-hand-open) inside a ROS 2 overlay:
   ```bash
   mkdir -p ~/aero_hand_ws/src
   cd ~/aero_hand_ws/src
   git clone https://github.com/TetherIA/aero-hand-open.git
   cd ..
   colcon build --symlink-install
   source install/setup.bash
   ```
3. Confirm that ROS 2 can discover the packages:
   ```bash
   ros2 pkg list | grep aero_hand
   ```

Once sourced, the following sections outline the role of each package and how they interact.

---

## 1. `aero_hand_open`: The AeroHandNode

`ros2/src/aero_hand_open/aero_hand_open/aero_hand_node.py` hosts the main ROS 2 node that bridges
the physical hand with the rest of the ecosystem.

### 1.1 Responsibilities

- Manages the hardware connection through the Python SDK (`AeroHand` class) and continuously
  synchronizes device state with ROS 2.
- Publishes tendon, joint, and diagnostic state so other nodes (teleoperation, logging, RL, etc.) can
  react in real time.
- Subscribes to command topics (tendon-length, velocity, or high-level pose targets) and relays them
  to the actuators with built-in safety limits.
- Provides ROS 2 services for one-off actions such as homing, tendon calibration, or zeroing of the
  strain gauges, enabling repeatable bring-up procedures.
- Surfaces parameters—serial port, publish rate, limit thresholds, smoothing gains—so you can tune
  the node without editing code.

### 1.2 Launching the node

After sourcing the workspace, start the hardware bridge with:

```bash
ros2 run aero_hand_open aero_hand_node
```

Common parameters (see the top of `aero_hand_node.py`) include:

| Parameter | Description |
|-----------|-------------|
| Serial device path | USB/serial interface that connects to the Aero Hand controller. |
| Publish rate | Loop frequency for streaming state. |
| Safety toggles | Enable/disable software limits, watchdog timers, or automatic estop behaviour. |
| Calibration data | JSON/YAML file with tendon offsets captured during bring-up. |

You can override parameters via `--ros-args -p name:=value` or by supplying a YAML file to the node.

### 1.3 ROS 2 interfaces

The node exposes a consistent ROS 2 API that is shared by the rest of the ecosystem:

- **State publishers:** Tendon states, inferred joint states, and aggregated diagnostics are
  published on `/aero_hand/*` topics using message types from `aero_hand_open_msgs`.
- **Command subscribers:** Tendon-length or posture commands are accepted on `/aero_hand/*` topics
  and translated into low-level actuator calls.
- **Services:** Homing, zeroing, and posture selection services standardize how other nodes trigger
  one-off actions.

> 💡 **Tip:** When developing new capabilities, reuse these interfaces to stay compatible with
> teleoperation nodes and RL deployment tools.

---

## 2. `aero_hand_open_teleop`: Human-in-the-loop control

This package contains teleoperation bridges that translate human input devices into tendon commands.

### 2.1 Modules

Typical modules include keyboard, VR controller, and glove bridges. Each module:

- Subscribes to the state topics published by `AeroHandNode` for responsive feedback.
- Applies device-specific scaling, filtering, or gesture mapping before publishing tendon commands.
- Exposes ROS 2 parameters so you can tune gains, dead zones, and rate limits without changing code.

### 2.2 Launch configuration

Launch files in the package bundle input drivers, the AeroHand node, and optional visualization
nodes. Example:

```bash
ros2 launch aero_hand_open_teleop teleop.launch.py \
  device:=keyboard \
  port:=/dev/ttyACM0
```

Swap the `device` argument (e.g., `manus_glove`, `vr_controller`) or point to a YAML config file to
load custom scaling factors. Because each module relies on the shared messages, you can mix human
control with autonomous nodes by simply enabling or disabling publishers.

---

## 3. `aero_hand_open_msgs`: Shared message definitions

All custom ROS 2 messages are consolidated inside `ros2/src/aero_hand_open_msgs/msg` so every node
speaks the same dialect.

### 3.1 Tendon-centric messages

Message definitions cover tendon commands, measured tendon states (lengths, velocities, tensions),
and auxiliary status flags. They ensure that control, logging, and visualization nodes agree on the
layout of numeric arrays, unit conventions, and frame identifiers.

### 3.2 Higher-level coordination

Additional messages provide wrappers for:

- Aggregated hardware diagnostics (fault flags, temperature, supply voltage).
- Named posture definitions that bundle tendon targets for gestures like pinch or cylinder grip.
- Reinforcement-learning observations and actions so policies can plug directly into the ROS 2 stack.

### 3.3 Extending the interface

To add a new message:

1. Create the `.msg` file in `ros2/src/aero_hand_open_msgs/msg`.
2. Update `CMakeLists.txt` and `package.xml` to reference the new file.
3. Rebuild with `colcon build` and re-source `install/setup.bash` so Python bindings regenerate.

---

## 4. `aero_hand_open_rl`: Policy deployment toolkit

The reinforcement-learning package bundles launch files and utilities for taking policies trained in
simulation and running them on hardware.

### 4.1 Policy layout

Checkpoints, normalization statistics, and metadata live alongside the launch files. The README in
`ros2/src/aero_hand_open_rl/` outlines the directory structure and how to add new policies.

### 4.2 Running a policy on hardware

A deployment launch file sets up the full pipeline: it starts the AeroHand node, subscribes to the
state topics, feeds observations into the policy runtime, and publishes tendon commands using the
messages described above. Typical launch arguments include the policy name, checkpoint path, serial
port, and observation topic.

### 4.3 Logging and evaluation

Utility scripts record rollouts to rosbag files containing tendon states, policy observations, and
resulting actions. These logs make it easy to compare sim and real performance or replay sessions in
post-processing notebooks.

---

## 🧭 Putting it all together

1. **Bring up the hardware** with `AeroHandNode` to stream reliable state into ROS 2.
2. **Choose your control source:** launch a teleoperation bridge for human-in-the-loop demos or start
   an RL policy for autonomous behaviours.
3. **Leverage the shared messages** so tools remain interoperable—every package listens to and
   publishes the same message definitions.
4. **Extend the stack** by adding new teleoperation interfaces, alternative controllers, or custom
   diagnostics while keeping the existing ROS 2 interfaces intact.

With these packages in place, you have a full ROS 2 stack that spans hardware control, human input,
and learning-based autonomy for the TetherIA Aero Hand Open.
