import React from 'react';
import './LogisticsHero.css';

const CLOUDFRONT_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261005_115944_095d91d4-030f-4e82-b42b-a388c0816d24.mp4';

export const LogisticsHero: React.FC = () => {
  return (
    <div className="logistics-hero-frame">
      {/* Background aerial freight train video */}
      <video
        className="bg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-label="Aerial view of a container freight train crossing black coal terrain"
      >
        <source src={CLOUDFRONT_VIDEO_URL} type="video/mp4" />
      </video>

      {/* Multistep luminance tint overlay */}
      <div className="tint" aria-hidden="true" />

      {/* 1280x800 Stage (Scaled on landscape desktop, reflowed on portrait tablet and phone) */}
      <main className="stage">
        {/* Eyebrow */}
        <p className="eyebrow">
          <span>WHY US</span>
        </p>

        {/* 4 Stacked Headline Lines */}
        <h1 className="headline">
          <span className="hl1">LOGISTICS</span>
          <span className="hl2">THAT WORKS</span>
          <span className="hl3">AS HARD AS</span>
          <span className="hl4">YOU DO.</span>
        </h1>

        {/* Left Feature Block: One point of contact */}
        <section className="feature f-left">
          <div className="feature-tag">
            <span className="dot" />
            <span>UNIFIED DISPATCH</span>
          </div>
          <h2>
            <span className="t1">One point of</span>
            <span className="t2">contact</span>
          </h2>
          <p>
            <span className="b1">No more chasing multiple vendors. One</span>
            <span className="b2">team manages your entire end-o-end flow</span>
            <span className="b3">origin to destination.</span>
          </p>
        </section>

        {/* Right Feature Block: Full supply chain visibility */}
        <section className="feature f-right">
          <div className="feature-tag">
            <span className="dot" />
            <span>LIVE TELEMETRY</span>
          </div>
          <h2>
            <span className="t1">Full supply chain</span>
            <span className="t2">visibility</span>
          </h2>
          <p>
            <span className="b1">Track your freight in real time and get</span>
            <span className="b2">proactive updates before issues become</span>
            <span className="b3">delays.</span>
          </p>
        </section>
      </main>
    </div>
  );
};
