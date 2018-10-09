/*=========================================================================
|| FILE: Check if user using iOS
===========================================================================
|| Check using OS add it as class to <html> element
=========================================================================*/


check_device: () => {
  
  let platform = navigator.platform;

  if (/iPad|iPhone|iPod/.test(platform)) {
    Main.ELEMENTS.$html.addClass("system-ios");
    Main.DEVICE.system = "iOS";
  }

},