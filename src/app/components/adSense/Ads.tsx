'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function AdSense() {
  useEffect(() => {
    try {
    //   @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <>
      <Script
        id="adsense-script"
        async
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8924375033562590"
        crossOrigin="anonymous"
      />

      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-8924375033562590"
        data-ad-slot="6037473465"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </>
  );
}