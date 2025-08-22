"use client";

import * as React from "react";
import { GooeyText } from "@/components/ui/gooey-text-morphing";

function GooeyTextDemo() {
  return (
    <div className="h-[200px] flex items-center justify-center">
      <GooeyText
        texts={["Buy.", "Sell.", "Play."]}
        morphTime={1}
        cooldownTime={0.25}
        className="font-bold"
        textClassName="text-white"
      />
    </div>
  );
}

export { GooeyTextDemo };









