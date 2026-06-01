"use client";

import Script from "next/script";

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    trackPurchase?: (data: any) => void;
  }
}

export default function GoogleAnalytics() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-4KS5MG3XMJ"
        strategy="afterInteractive"
      />

      <Script
        id="google-analytics"
        strategy="afterInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];

          function gtag(){
            dataLayer.push(arguments);
          }

          window.gtag = gtag;

window.trackPurchase = function(data) {
  gtag('event', 'purchase', data);
};

gtag('js', new Date());

gtag('config', 'G-4KS5MG3XMJ', {
  page_path: window.location.pathname,
});
        `}
      </Script>
    </>
  );
}