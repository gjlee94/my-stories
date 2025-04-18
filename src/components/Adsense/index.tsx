"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: any;
  }
}

const AdBanner = () => {
  useEffect(() => {
    const tryPush = () => {
      if (!Array.isArray(window.adsbygoogle)) {
        window.adsbygoogle = [];
      }
      try {
        window.adsbygoogle.push({});
      } catch (e) {
        console.error("Ad push error", e);
      }
    };

    const timeout = setTimeout(tryPush, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", height: "150px", width: "100%" }}
      data-ad-client="ca-pub-9393302787267646"
      data-ad-slot="1234567890"
      data-adtest="on"
      data-full-width-responsive="true"
    />
  );
};

export default AdBanner;
