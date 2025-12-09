# Software Setup
## Step1: Installation

The SDK is currently tested for Python 3.10 and above.

### Recommended: install via pip

**For Mac and Linux:**

```bash
pip install aero-open-sdk
```

**For Windows (using PowerShell):**

```powershell
python -m pip install --upgrade pip
python -m pip install aero-open-sdk
```

### Option 2: install from source (fetch latest updates)

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/TetherIA/aero-hand-open.git
   ```

2. Navigate to the SDK directory:
   ```bash
   cd aero-hand-open/sdk
   ```

3. Install the package in editable mode:
   ```bash
   pip install -e .
   ```

---

## Step2: GUI — Aero Hand Open Control App

Launch the GUI from a terminal after installation:

**For Mac and Linux:**

```bash
aero-open-gui
```

**For Windows:**

```powershell
python -m aero_open_sdk
```

> **Note:** If your system can't find the command, ensure your Python environment's scripts directory is on PATH and that the package was installed into the active environment.

<div align="center">
  ![Screenshot of GUI](imgs/gui.png)
</div>


### Find port
TODO(harsh): add how to find port, in Mac/linux and in Windows


### Homing
TODO(harsh): add how to do homing


### Slide slider bar for position control

TODO(harsh): add how to slide slider bar for position control


## Step 3: Python Control & Examples


### Find port
TODO(harsh): add how to find port, in Mac/linux and in Windows


### Run examples
TODO(harsh): add explanation of two examples

#### run_sequence

#### power_grasp

#### Explore more examples
More examples are avaiable at the [sdk folder](https://github.com/TetherIA/aero-hand-open/tree/main/sdk/examples)




## Troubleshooting


<div align="center">

Made with ❤️ by **TetherIA Robotics**

</div>



