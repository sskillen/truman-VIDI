# Condition Filter Guide

This guide explains how to specify an experimental condition when deploying locally for testing.

## Overview

The application supports 5 experimental conditions (as defined in `.env`):
- `control_im` 
- `incivility_im`
- `intolerence_im`
- `misinformation_im`
- `us_them_im`
- `control_cl`
- `incivility_cl`
- `intolerence_cl`
- `misinformation_cl`
- `us_them_cl`

By default, users are randomly assigned a condition upon signup. For local testing, you can force all new users to be assigned a specific condition.

## Usage

### Method 1: Using Command-Line Arguments (Recommended)

Start the application with the `--condition` or `-c` flag:

```bash
# Using --condition flag
node app.js --condition control_im

# Using short form -c
node app.js -c control_im

# With npm (if configured in package.json)
npm start -- --condition control_im
```

### Method 2: Setting Environment Variable

Alternatively, export the environment variable before running:

```bash
# Linux/Mac
export OVERRIDE_CONDITION=control_im
node app.js

# Windows (PowerShell)
$env:OVERRIDE_CONDITION="control_im"
node app.js

# Windows (Command Prompt)
set OVERRIDE_CONDITION=control_im
node app.js
```

## What It Does

When you specify a condition:

1. ✓ All new users who sign up will be assigned that condition
2. ✓ The app displays which condition is active when it starts
3. ✓ You can test how the UI renders for different conditions without creating multiple accounts

## Example Session

```bash
$ node app.js --condition control_im

=== EXPERIMENTAL CONDITIONS ===
Available conditions: control_im, incivility_im, intolerence_im, misinformation_im, us_them_im, control_cl, incivility_cl, intolerence_cl, misinformation_cl, us_them_cl

✓ Using condition: control_im
  All new users will be assigned this condition.
==============================

App is running on http://localhost:3000 in development mode.
  Press CTRL-C to stop
```

## Tips

- **No condition specified?** Users are randomly assigned (default behavior)
- **Invalid condition?** The app will show an error and exit with a list of valid options
- **Testing multiple conditions?** Simply restart the app with a different condition value
- **Reverting to random:** Remove the `--condition` flag or set `OVERRIDE_CONDITION=""` to go back to random assignment

## Files Modified

- `config/conditionFilter.js` - New module that handles condition parsing and validation
- `app.js` - Calls condition initialization on startup
- `controllers/user.js` - Uses override condition if available during signup
