# Screenshot Delay 5s - Firefox Extension

A Firefox extension that captures a screenshot of the visible page after a 5-second delay and copies it directly to your clipboard. Works just like running `:screenshot --clipboard --delay 5` in Firefox DevTools.

## Features

- 📸 Takes a screenshot of the visible viewport
- ⏱️ 5-second countdown delay to let you set up the page
- 📋 Automatically copies the screenshot to your clipboard
- 🔢 Live countdown badge shows remaining seconds
- ✅ Visual feedback on success/failure

## Installation

### Temporary Installation (for development/testing)

1. Open Firefox and navigate to `about:debugging`
2. Click "This Firefox" in the left sidebar
3. Click "Load Temporary Add-on..."
4. Navigate to this extension folder and select `manifest.json`

### Permanent Installation

1. Package the extension:
   - Zip all files (manifest.json, background.js, icons folder)
   - Rename `.zip` to `.xpi`
2. Go to `about:addons` in Firefox
3. Click the gear icon and select "Install Add-on From File..."
4. Select the `.xpi` file

## Usage

1. Click the camera icon (with "5") in your Firefox toolbar
2. The badge will count down from 5 to 1
3. Use this time to set up your page (hover states, dropdowns, etc.)
4. After 5 seconds, the screenshot is taken and copied to your clipboard
5. A green checkmark confirms success

## Permissions

- `activeTab` - To capture the current tab's visible content
- `<all_urls>` - To execute the clipboard write on any page
- `clipboardWrite` - To write the screenshot to your clipboard

## Icon

The extension icon shows a camera with a red "5" badge to indicate the 5-second delay feature.

