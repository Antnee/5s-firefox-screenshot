// Screenshot Delay 5s - Firefox Extension
// Takes a screenshot of the visible page after 5 seconds and copies to clipboard

const DELAY_SECONDS = 5;

browser.browserAction.onClicked.addListener(async (tab) => {
  try {
    // Update badge to show countdown
    await browser.browserAction.setBadgeBackgroundColor({ color: "#e63946" });
    
    // Countdown from 5 to 1
    for (let i = DELAY_SECONDS; i > 0; i--) {
      await browser.browserAction.setBadgeText({ text: String(i) });
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Clear badge and show capturing state
    await browser.browserAction.setBadgeText({ text: "📷" });
    
    // Capture the visible tab
    const dataUrl = await browser.tabs.captureVisibleTab(null, {
      format: "png"
    });
    
    // Convert data URL to blob and copy to clipboard
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    
    // Use the Clipboard API via content script injection
    // because background scripts can't directly access navigator.clipboard
    await browser.tabs.executeScript(tab.id, {
      code: `
        (async () => {
          try {
            const response = await fetch("${dataUrl}");
            const blob = await response.blob();
            await navigator.clipboard.write([
              new ClipboardItem({ "image/png": blob })
            ]);
            return { success: true };
          } catch (err) {
            return { success: false, error: err.message };
          }
        })();
      `
    });
    
    // Show success feedback
    await browser.browserAction.setBadgeBackgroundColor({ color: "#2a9d8f" });
    await browser.browserAction.setBadgeText({ text: "✓" });
    
    // Clear badge after 2 seconds
    setTimeout(async () => {
      await browser.browserAction.setBadgeText({ text: "" });
    }, 2000);
    
  } catch (error) {
    console.error("Screenshot error:", error);
    
    // Show error feedback
    await browser.browserAction.setBadgeBackgroundColor({ color: "#e63946" });
    await browser.browserAction.setBadgeText({ text: "✗" });
    
    // Clear badge after 2 seconds
    setTimeout(async () => {
      await browser.browserAction.setBadgeText({ text: "" });
    }, 2000);
  }
});

