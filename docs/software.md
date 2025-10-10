# Software

After [assembling your hand](/docs/mechanical.md) and setting up the actuators (more on that in the [GUI section](#️-gui)), you can control your Aero hand using our Python SDK. SDK manages serial communication with the hardware using TetherIA’s custom [communication protocol](link).

---

## ⚙️ Installation

The SDK is currently tested for Python 3.10 and support linux and windows.

### 📦 Install via pip

```bash
pip install aero-hand-sdk
```

### 🧩 Install from source (editable mode)

1. Clone the repository:
   ```bash
   git clone https://github.com/TetherIA/aero-open-sdk.git
   ```

2. Navigate to the cloned repository:
   ```bash
   cd aero-open-sdk
   ```

3. Install the package in editable mode:
   ```bash
   pip3 install -e .
   ```

---

## 🖥️ GUI
When setting up your hand for the first time, the **setup GUI** helps you configure actuator IDs and test the connections.
Make sure you've installed the SDK before running the below command [(see Installation)](#️-installation)

Run the GUI with:

```bash
aero-hand-gui
```

You’ll see an interactive configuration interface similar to below:

![GUI Screen](/img/gui-screen.png)

@Harsh-Panara Add more details on the GUI usage and first time setup here.\

### 🪛 First-Time Setup
GUI will help you with the following steps:
1. Assigning Actuator IDs
2. Testing Actuator Connections
3. Performing Initial Homing and Calibration


## 🧰 SDK Overview

The SDK exposes a high-level Python API for commanding, monitoring, and debugging the hand.

### 🔌 Initialization

You can intialize the hand using the `AeroHand` class:

```python
from aero_open_sdk.aero_hand import AeroHand

aero_hand = AeroHand(port="/dev/ttyACM0")
```
This will open the `serial` port for communicating with the hand. 

:::note
By default, **Linux** assigns the first connected device to `/dev/ttyACM0`, while **Windows** typically uses `COM1` or `COM2`.  
However, this is **not guaranteed**, the exact port may vary depending on your system and connected devices.  
Always verify the correct port before initializing the hand.  
For detailed steps on identifying and configuring serial ports, refer to our [GitHub repository](https://github.com/TetherIA/aero-open-sdk/blob/0253a652b03a7973af04be3f18baab1a736d240e/README.md).
:::

### ✋ Joint Representation

Our Robot Hand has 16 Joints - 4 For the Thumb and 3 for each of the four finger.

#### 🧾 Joint Naming and Indexing Convention

We use the following joint naming and indexing convention to refer to each joint in the software. The naming follows standard anatomical terminology, and the indexing flows:
 - From thumb to pinky finger
 - and from base to tip, within each finger.

| Finger     | Joint Name        | Index |
|------------|-------------------|-------|
| Thumb      | thumb_cmc_abd    | 0     |
| Thumb      | thumb_cmc_flex   | 1     |
| Thumb      | thumb_mcp       | 2     |
| Thumb      | thumb_ip        | 3     |
| Index   | index_flex     | 4     |
| Index   | index_pip      | 5     |
| Index   | index_dip      | 6     |
| Middle  | middle_flex    | 7     |
| Middle  | middle_pip     | 8     |
| Middle  | middle_dip     | 9     |
| Ring    | ring_flex      | 10    |
| Ring    | ring_pip       | 11    |
| Ring    | ring_dip       | 12    |
| Pinky   | pinky_flex     | 13    |
| Pinky   | pinky_pip      | 14    |
| Pinky   | pinky_dip      | 15    |

To get the joint names programmatically:

```python
print(aero_hand.joint_names)
```
Expected output:
```
['thumb_cmc_abd', 'thumb_cmc_flex', 'thumb_mcp', 'thumb_ip', 'index_mcp', 'index_pip', 'index_dip', 'middle_mcp', 'middle_pip', 'middle_dip', 'ring_mcp', 'ring_pip', 'ring_dip', 'pinky_mcp', 'pinky_pip', 'pinky_dip']
```

#### 📏 Joint Limits

Each joint has a specific range of motion defined by its lower and upper limits.

By convention:
- The minimum angle (0 °) corresponds to a fully extended joint, which translates to an open palm pose.
- The maximum angle corresponds to a fully flexed joint, which translates to a closed fist pose.

These conventions are consistent across all joints for clarity and ease of control.

Each joint's limits in degrees are as per below Table:

| Joint Name       | Min (°) | Max (°) |
|------------------|---------------------|---------------------|
| thumb_cmc_abd    | 0                 | 100                  |
| thumb_cmc_flex   | 0                   | 55                  |
| thumb_mcp       | 0                   | 90                  |
| thumb_ip        | 0                   | 90                  |
| index_flex     | 0                   | 90                  |
| index_pip      | 0                   | 110                 |
| index_dip      | 0                   | 90                  |
| middle_flex    | 0                   | 90                  |
| middle_pip     | 0                   | 110                 |
| middle_dip     | 0                   | 90                  |
| ring_flex      | 0                   | 90                  |
| ring_pip       | 0                   | 110                 |
| ring_dip       | 0                   | 90                  |
| pinky_flex     | 0                   | 90                  |
| pinky_pip      | 0                   | 110                 |
| pinky_dip      | 0                   | 90                  |

The a

```
print(aero_hand.joint_lower_limits)
print(aero_hand.joint_upper_limits)
```

To control the hand, api expose `set_joint_positions` method which takes in a list of 16 joint angles in degrees and moves the hand to the desired position.
NOTE: `set_joint_positions` method can also take in a list of 7 joint angles in degrees as input. More on that in later sections.

```
# Example: Move the hand to a specific position
target_positions = [30.0, 20.0, 45.0, 45.0, 90.0, 90.0, 90.0, 90.0, 90.0, 90.0, 90.0, 90.0, 90.0, 90.0, 90.0, 90.0]
aero_hand.set_joint_positions(target_positions)
```


### Joints to Actuations Mapping

Our hand has a total of 7 actuators to control the aforementioned 16 joints. This is achieved through a tendon-driven mechanism where multiple joints are controlled by a single actuator. This results in an under-actuated system. While we can only control 7 actuators, we found it useful to think in terms of 16 independent joints as many teleoprations systems are designed to work joints angles. One more nuance in the system comes from the coupling of actuations to control a single joint in the thumb for example to only move the thumb cmc flex joint we need to actuate the thumb cmc flex actuator which moves the thumb cmc flex joint but as the thumb flex joint moves the tendon that controls the thumb mcp and thump ip joints also gets pulled resulting in movement of those joints as well. Similar coupling exist between thumb cmc abduction joint. We take care of this coupling via the joints to actuation mapping. Curious users can look into the `joints_to_actuations.py` file to understand the mapping in detail. Ideally, the you won't need to access this class directly as the `set_joint_positions` method internally uses it to convert the joint angles to actuator commands.

While using the 16 joint angles to control the hand is descriptive, it can become cumbersome for users to define hand poses, if the values are not comming from a teleoperation system. To make it easier for users to use the hand with joint state control, `set_joint_positions` method can also take in a compact representation of 7 joint angles in degrees as input. The compact representation consists of the following 7 entries:
| Index | Joint Controlled          | Description                     |
|-------|---------------------------|---------------------------------|
| 0     | thumb_cmc_abd         | Thumb CMC Abduction is controlled by a dedicated actuator. |
| 1     | thumb_cmc_flex        | Thumb CMC Flexion is controlled by a dedicated actuator. |
| 2     | thumb_mcp & thumb_ip             | Thumb MCP and IP joints are controlled by a single actuator. |
| 3     | index_mcp, index_pip & index_dip | All three joints of the index finger are controlled by a single actuator. |
| 4     | middle_mcp, middle_pip & middle_dip | All three joints of the middle finger are controlled by a single actuator. |
| 5     | ring_mcp, ring_pip & ring_dip       | All three joints of the ring finger are controlled by a single actuator. |
| 6     | little_mcp, little_pip & little_dip   | All three joints of the little finger are controlled by a single actuator. |

`set_joint_positions` method will convert this compact representation to the full 16 joint angles representation internally by copying the values to the joints that are controlled by the same actuator.
For example if the user provides 7 joint angles as below:
| 45.0 | 30.0 | 60.0 | 30.0 | 45.0 | 60.0 | 90.0 |
code will convert it to 16 joint angles as below:
| 
[45.0, 30.0, 60.0, 60.0, 30.0, 30.0, 30.0, 45.0, 45.0, 45.0, 60.0, 60.0, 60.0, 90.0, 90.0, 90.0]

Below table shows the mapping from 7 to 16 joint angles if the user provides 7 joint angles as below:
Below table shows the mapping from 7 to 16 joint angles if the user provides 7 joint angles as below:

| Input (7 joints) | 45 | 30 | 60 | 30 | 45 | 60 | 90 |
|------------------|------|------|------|------|------|------|------|
| Output (16 joints) | 45 | 30 | 60 60 | 30 30 30 | 45 45 45 | 60 60 60 | 90 90 90 |

The representation intuitively makes sense as the user can think in terms of controlling the fingers as a whole rather than individual joints. The joint limits will still apply and have similar menanign to the 16 joint angles representation. The above example can be intutivey read as:
move the thumb cmc abduction to 45 degrees
move the thumb cmc flexion to 30 degrees
move the thumb mcp and thumb ip to 60 degrees
move all joints of index finger to 30 degrees
move all joints of middle finger to 45 degrees
move all joints of ring finger to 60 degrees
move all joints of little finger to 90 degrees

Note that this dosen't garutee that thet hand will move to this exact position as the sysmte is under-actuated and the actual position will depend on the external forces acting on the hand. However, this representation makes it easier for the user to define hand poses.

### Actuation based control
While we suggest that the user uses the `set_joint_positions` method to control the hand, for advanced users we also provide the `set_actuations` method to control the hand at the actuator level. 
In software we use the below Actuations indexing and Naming conventions to refer to the actuators:
- 0 - thumb_cmc_abd_act
- 1 - thumb_cmc_flex_act
- 2 - thumb_tendon
- 3 - index_tendon
- 4 - middle_tendon
- 5 - ring_tendon
- 6 - pinky_tendon

This can also be accessed in the code by calling the `actuations_names` property of the AeroHand class.

```
print(aero_hand.actuations_names)
```
Similar to joints, each actuator has a specific range of motion defined by its lower and upper limits. Actuation represents the degree of movement of the actuator, by convention we set the zero actuations to correspond to teh open palm pose(zero joint angles) and full actuation to correspond to closed fist pose(maximum joint angles). With this convention and our hands mechanical desing we get the actuation limits as below:
| Actuator Name       | Min Actuation (degrees) | Max Actuation (degrees) |
|---------------------|-------------------------|-------------------------|
| thumb_cmc_abd_act   | 0                       | 100                     |
| thumb_cmc_flex_act  | 0                       | 131.89                      |
| thumb_tendon        | -27.78                | 274.92                       |
| index_tendon        | 0                       | 288.16                       |
| middle_tendon       | 0                       | 288.16                       |
| ring_tendon         | 0                       | 288.16                       |
| pinky_tendon        | 0                       | 288.16                       |

Notice that the thumb_tendon actuator has a negative lower limit. This is due to the fact that the thumb_tendon is not at it's lower extreme when the hand is in open palm pose(zero joint angles). This is a result of the mechanical design of the hand and the tendon routing. For the curious reader the lowest actuation of thumb tendon happends when the thumb cmc flex joint is at it's upper limit(55 degrees) and thumb cmc abduction joint is at it's lower limit(0 degrees). This could be calculated using the joints to actuation mapping. You can investigate the `joints_to_actuations.py` file to understand this in detail.

Actuation limits could also be accessed in the code by calling the `actuations_lower_limits` and `actuations_upper_limits` properties of the AeroHand class.
```
print(aero_hand.actuations_lower_limits)
print(aero_hand.actuations_upper_limits)
```

## Reading from the hand

The API also provides methods to read the current state of the hand via various getter methods. Which are mostly self explanatory.

### Get Actuations
To read the current actuator positions in degrees call the `get_actuations` method.

```
current_actuations = aero_hand.get_actuations()
print(current_actuations)
```

This will return a list of 7 actuations in degrees, which corresponts to the 7 actuators in the hand. The indexing is same as described in the Actuations section above.

### Get actuator currents
To read the current actuator currents in mA call the `get_actuator_currents` method.

```
current_actuation_currents = aero_hand.get_actuator_currents()
print(current_actuation_currents)
```

This will return a list of 7 actuation currents in mA, which corresponts to the 7 actuators in the hand. The indexing is same as described in the Actuations section above.

### Get actuator temperatures
To read the current actuator temperatures in degree Celsius call the `get_actuator_temperatures` method.

```
current_actuation_temperatures = aero_hand.get_actuator_temperatures()
print(current_actuation_temperatures)
```

This will return a list of 7 actuation temperatures in degree Celsius, which corresponts to the 7 actuators in the hand. The indexing is same as described in the Actuations section above.

### Get actuator speed
To read the current actuator speeds in rpm call the `get_actuator_speeds` method.
```
current_actuation_speeds = aero_hand.get_actuator_speeds()
print(current_actuation_speeds)
``` 

This will return a list of 7 actuation speeds in degrees per second, which corresponts to the 7 actuators in the hand. The indexing is same as described in the Actuations section above.


## Once done you can close the connection to the hand by 
calling the `close` method.
```
aero_hand.close()
```