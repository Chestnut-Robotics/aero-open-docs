---
id: ros2
title: ROS2
sidebar_position: 6
description: Hardware node, teleoperation, common message types, and RL policy deployment for the Aero Hand Open.
keywords:
  - ROS2
  - Aero Hand Open
  - teleop
  - reinforcement learning
  - messages
---

The ROS 2 stack for **Aero Hand Open** provides:

- a hardware bridge node for serial comms to the hand,
- teleoperation pipelines (Manus gloves or webcam/MediaPipe),
- common message definitions shared across sim and real,
- and a ready-to-run RL policy deployment node.

All components live under the repo’s [`ros2/`](https://github.com/TetherIA/aero-hand-open/tree/main/ros2) directory and use a single message interface for clean sim-to-real handoffs.

---

## Repository layout

```text
aero-hand-open/
└─ ros2/
   └─ src/
      ├─ aero_hand_open/          # Hardware node (serial bridge)
      ├─ aero_hand_open_teleop/   # Teleoperation pipelines & launch files
      ├─ aero_hand_open_msgs/     # Message definitions (ROS 2)
      └─ aero_hand_open_rl/       # RL policy deployment
```

- Hardware node: [github.com/TetherIA/aero-hand-open/blob/main/ros2/src/aero_hand_open/aero_hand_open/aero_hand_node.py](https://github.com/TetherIA/aero-hand-open/blob/main/ros2/src/aero_hand_open/aero_hand_open/aero_hand_node.py)
- Teleop: [github.com/TetherIA/aero-hand-open/tree/main/ros2/src/aero_hand_open_teleop/aero_hand_open_teleop](https://github.com/TetherIA/aero-hand-open/tree/main/ros2/src/aero_hand_open_teleop/aero_hand_open_teleop)
- Messages: [github.com/TetherIA/aero-hand-open/tree/main/ros2/src/aero_hand_open_msgs/msg](https://github.com/TetherIA/aero-hand-open/tree/main/ros2/src/aero_hand_open_msgs/msg)
- RL deploy: [github.com/TetherIA/aero-hand-open/blob/main/ros2/src/aero_hand_open_rl/README.md](https://github.com/TetherIA/aero-hand-open/blob/main/ros2/src/aero_hand_open_rl/README.md)

---

## Quick start

### 1) Build

```bash
# In your ROS 2 workspace (e.g., ~/aero_ws/src)
git clone https://github.com/TetherIA/aero-hand-open.git
cd aero-hand-open/ros2
colcon build
source install/setup.bash
```

We recommend **ROS 2 Humble**.

### 2) Run the hardware node (right hand)

```bash
# Find your serial device path, e.g. /dev/serial/by-id/usb-FTDI_FT232R_USB_UART_XXXX
ros2 run aero_hand_open aero_hand_node \
  --ros-args \
  -p right_port:=/dev/serial/by-id/usb-FTDI_FT232R_USB_UART_XXXX \
  -p baudrate:=921600 \
  -p feedback_frequency:=100.0 \
  -p control_space:=joint
```

### 3) (Optional) Teleoperate

**[Option 1] Webcam + MediaPipe (pipeline pieces):**

```bash
ros2 run aero_hand_open_teleop mediapipe_mocap
ros2 run aero_hand_open_teleop mediapipe_retargeting
```

**[Option 2] Manus gloves:**

```bash
ros2 launch aero_hand_open_teleop manus_teleop.launch.py
```



### 4) (Optional) Deploy an RL policy

```bash
# Terminal 1: bring up hardware node
ros2 run aero_hand_open aero_hand_node --ros-args -p right_port:=/dev/serial/by-id/...

# Terminal 2: run the deployer (see RL section below)
ros2 run aero_hand_open_rl rl_z_rotation_deploy
```

---

## 1) Hardware node — aero_hand_open

### What it does

Bridges ROS 2 topics to the physical hand via serial. You choose control space:

- `joint` — publish 16 joint targets (radians) for kinematic control
- `actuator` — publish 7 actuator positions (degrees) for direct actuation

### Common parameters

| Name            | Type   | Default    | Description                              |
|-----------------|--------|------------|------------------------------------------|
| `right_port`    | string | `""`       | Serial device path for right hand        |
| `left_port`     | string | `""`       | Serial device path for left hand         |
| `baudrate`      | int    | `921600`   | Serial baudrate                          |
| `feedback_frequency` | double | `100.0` | Telemetry publish rate (Hz)              |
| `control_space` | string | `joint`    | `joint` or `actuator`                    |

If neither `right_port` nor `left_port` is provided, the node exits.

### Topics (per enabled side)

When `control_space:=joint`

- Subscribe: `{right|left}/joint_control` — `aero_hand_open_msgs/JointControl` (length 16, radians)

When `control_space:=actuator`

- Subscribe: `{right|left}/actuator_control` — `aero_hand_open_msgs/ActuatorControl` (length 7, degrees)

Always

- Publish: `{right|left}/actuator_states` — `aero_hand_open_msgs/ActuatorStates` (positions, speeds, currents, temps)

Example (left hand, actuator space):

```bash
ros2 run aero_hand_open aero_hand_node \
  --ros-args \
  -p left_port:=/dev/serial/by-id/usb-FTDI_FT232R_USB_UART_YYYY \
  -p control_space:=actuator \
  -p feedback_frequency:=200.0
```

---

## 2) Teleoperation — aero_hand_open_teleop

Two supported pipelines share the same message interface used by the hardware node.

### A) Manus gloves → robot

- Input: Manus gloves via `manus_ros2`
- Retargeting: converts glove joint states to the hand’s 16 joint targets (radians)
- Output: publishes to `{right|left}/joint_control` (consumed by the hardware node)

One-shot launch (edit ports inside the launch file if needed):

```bash
ros2 launch aero_hand_open_teleop manus_teleop.launch.py
```

This launch typically brings up:

- Manus data publisher
- Retargeting node
- `aero_hand_node` with your chosen side/ports

### B) Webcam (MediaPipe) → robot

- `mediapipe_mocap` estimates 3D hand keypoints and publishes a `HandMocap` message
- `mediapipe_retargeting` converts keypoints → 16 joint targets (radians)
- Publishes to `{right|left}/joint_control`

Run the pieces:

```bash
ros2 run aero_hand_open_teleop mediapipe_mocap
ros2 run aero_hand_open_teleop mediapipe_retargeting
```

Executables (from `setup.py`):

- `manus_joint_states_retargeting`
- `mediapipe_mocap`
- `mediapipe_retargeting`
- Launch: `manus_teleop.launch.py`

---

## 3) Common messages — aero_hand_open_msgs/msg

Browse the `.msg` files here: [github.com/TetherIA/aero-hand-open/tree/main/ros2/src/aero_hand_open_msgs/msg](https://github.com/TetherIA/aero-hand-open/tree/main/ros2/src/aero_hand_open_msgs/msg)

**JointControl.msg**

- `std_msgs/Header header`
- `float32[] target_positions` — length 16 (radians)

**ActuatorControl.msg**

- `std_msgs/Header header`
- `int8 control_mode` — e.g., POSITION/TORQUE/VELOCITY
- `float32[] actuation_positions` — length 7 (degrees)
- `float32[] actuation_torques`
- `float32[] actuation_velocities`

The hardware node uses `actuation_positions` when `control_space:=actuator`.

**ActuatorStates.msg**

- `std_msgs/Header header`
- `string side` — "right" or "left"
- `float32[] actuations` — 7 (degrees)
- `float32[] actuator_speeds` — RPM
- `float32[] actuator_currents` — mA
- `float32[] actuator_temperatures` — °C

**HandMocap.msg**

- `std_msgs/Header header`
- `string side` — "right" or "left"
- `geometry_msgs/Pose[] keypoints` — typically 25 hand keypoints

Minimal Python publisher (joint space):

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import Header
from aero_hand_open_msgs.msg import JointControl


class Demo(Node):
    def __init__(self):
        super().__init__('demo_joint_pub')
        self.pub = self.create_publisher(JointControl, 'right/joint_control', 10)
        self.timer = self.create_timer(0.02, self.tick)  # 50 Hz

    def tick(self):
        msg = JointControl()
        msg.header = Header()
        msg.target_positions = [0.0] * 16  # radians
        self.pub.publish(msg)


rclpy.init()
rclpy.spin(Demo())
```

Minimal Python subscriber (actuator states):

```python
import rclpy
from rclpy.node import Node
from aero_hand_open_msgs.msg import ActuatorStates


class Echo(Node):
    def __init__(self):
        super().__init__('echo_states')
        self.sub = self.create_subscription(
            ActuatorStates, 'right/actuator_states', self.cb, 10)

    def cb(self, msg: ActuatorStates):
        self.get_logger().info(f'Right actuations (deg): {list(msg.actuations)}')


rclpy.init()
rclpy.spin(Echo())
```

---

## 4) RL policy deployment — aero_hand_open_rl

See README: [github.com/TetherIA/aero-hand-open/blob/main/ros2/src/aero_hand_open_rl/README.md](https://github.com/TetherIA/aero-hand-open/blob/main/ros2/src/aero_hand_open_rl/README.md)

### What it does

Loads a pretrained policy (e.g., PPO) trained in sim (MuJoCo/Brax/etc.), subscribes to telemetry, and publishes actuator commands to the real hand. This package contains the sim-to-real mapping utilities used by the deployer.

### Typical I/O

- Subscribe: `{right|left}/actuator_states`
- Publish: `{right|left}/actuator_control` (uses `actuation_positions`, degrees)

### Run

```bash
# Terminal 1: hardware node with your actual port
ros2 run aero_hand_open aero_hand_node --ros-args -p right_port:=/dev/serial/by-id/...

# Terminal 2: deploy a bundled example policy
ros2 run aero_hand_open_rl rl_z_rotation_deploy
```

Check the README for exact dependencies (SDK/firmware versions, sim environment, model checkpoints, and any path parameters like `model_path` or `dt`).

---

## Tips & troubleshooting

- **Find serial devices:** Linux/macOS: `ls /dev/serial/by-id/` (or `ls /dev/tty.*` on macOS); Windows: use `COMx` names.
- **Permissions (Linux):** If you see `Permission denied` on the serial port, add your user to the `dialout` group and re-login: `sudo usermod -a -G dialout $USER`.
- **Check the graph:** Use `rqt_graph` to confirm publishers/subscribers are connected as expected.
- **Units:** `JointControl.target_positions` → radians (length 16); `ActuatorControl.actuation_positions` → degrees (length 7); `ActuatorStates.actuations` → degrees (length 7).

---

## FAQ

- **Which control mode should I start with?** Start with `control_space:=joint` for high-level kinematic targets. Switch to actuator only if you need direct low-level control.
- **Can I run both hands?** Yes—provide both `right_port` and `left_port`. The node creates topics for each side.
- **How do I change teleop normalization (per-user fit)?** See the teleop package config; adjust the normalization YAML and restart the retargeting node.

---

## See also

- Source repo (ROS 2): [github.com/TetherIA/aero-hand-open/tree/main/ros2](https://github.com/TetherIA/aero-hand-open/tree/main/ros2)
- Messages: [github.com/TetherIA/aero-hand-open/tree/main/ros2/src/aero_hand_open_msgs/msg](https://github.com/TetherIA/aero-hand-open/tree/main/ros2/src/aero_hand_open_msgs/msg)
- Teleop: [github.com/TetherIA/aero-hand-open/tree/main/ros2/src/aero_hand_open_teleop/aero_hand_open_teleop](https://github.com/TetherIA/aero-hand-open/tree/main/ros2/src/aero_hand_open_teleop/aero_hand_open_teleop)
- RL deploy README: [github.com/TetherIA/aero-hand-open/blob/main/ros2/src/aero_hand_open_rl/README.md](https://github.com/TetherIA/aero-hand-open/blob/main/ros2/src/aero_hand_open_rl/README.md)

With these packages in place, you have a full ROS 2 stack that spans hardware control, human input,
and learning-based autonomy for the TetherIA Aero Hand Open.
