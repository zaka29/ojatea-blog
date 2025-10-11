"use client";

import { useState, useEffect } from "react";

interface WindowAlias extends Window {
  MSStream?: object;
}

export function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
        !(window as WindowAlias).MSStream
    );

    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
  }, []);

  const [showModal, setShowModal] = useState(false);

  if (isStandalone) {
    return null;
  }

  return (
    <div className="w-full p-4 rounded bg-gray-800">
      <h3 className="text-xl mb-2">Install App</h3>
      <button
        className="bg-teal-500 py-2 px-2 rounded text-sm font-bold"
        onClick={() => setShowModal(true)}
      >
        Add to Home Screen
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h4 className="text-lg font-bold mb-2">How to Install</h4>
            {isIOS ? (
              <p className="text-gray-800">
                To install this app on your iOS device, tap the share button
                <span role="img" aria-label="share icon">
                  {" "}
                  ⎋{" "}
                </span>
                and then &#34;Add to Home Screen&#34;
                <span role="img" aria-label="plus icon">
                  {" "}
                  ➕{" "}
                </span>
                .
              </p>
            ) : (
              <p className="text-gray-800">
                Follow your browser&#39;s instructions to install this app.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
