// components/PWAInstallPrompt.jsx
import React, { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Check localStorage for dismissal timestamp
    const dismissedUntil = localStorage.getItem("pwaDismissedUntil");
    if (dismissedUntil && Date.now() < parseInt(dismissedUntil, 10)) {
      return; // Still in the "cooldown" period, don't show
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;

    if (choiceResult.outcome === "accepted") {
      console.log("PWA setup accepted");
    } else {
      console.log("PWA setup dismissed");
    }

    setDeferredPrompt(null);
    setVisible(false);
  };

  const handleCancel = () => {
    // Hide for 7 days
    const sevenDaysLater = Date.now() + 7 * 24 * 60 * 60 * 1000;
    localStorage.setItem("pwaDismissedUntil", sevenDaysLater.toString());

    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-50">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Download className="text-blue-600" size={20} />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 text-sm">Install App</h4>
            <p className="text-gray-600 text-xs mt-1">
              Add to home screen for quick access
            </p>
          </div>
        </div>
        <button
          onClick={handleCancel}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={18} />
        </button>
      </div>
      
      <div className="flex space-x-2 mt-3">
        <button
          onClick={handleInstall}
          className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
        >
          Install
        </button>
        <button
          onClick={handleCancel}
          className="px-3 py-2 text-gray-600 text-sm hover:text-gray-800 transition-colors"
        >
          Not now
        </button>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
