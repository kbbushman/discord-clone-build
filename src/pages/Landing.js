import React from "react";
import LandingLayout from "components/layouts/LandingLayout";
import Hero from "components/sections/Hero";

export default function Landing() {
  return (
    <LandingLayout>
      <Hero
        title="An invite-only place with plenty of room to talk"
        subtitle="Discord servers are organized into topic-based channels where you can collaborate, share, and just talk about your day without clogging up a group chat."
        image="/landing.svg"
        ctaText="Get Started"
        ctaLink="/register"
      />
    </LandingLayout>
  );
}
