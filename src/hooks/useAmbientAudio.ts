/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";

/**
 * Silent, high-performance dummy hook to completely remove audio playback 
 * from the application while maintaining TypeScript safety.
 */
export function useAmbientAudio() {
  const [isPlaying] = useState(false);

  const startAudio = () => {};
  const stopAudio = () => {};
  const toggleAudio = () => {};
  const triggerTrainTracks = (active: boolean) => {};
  const triggerCityNoise = (active: boolean) => {};
  const triggerThemeSuspense = () => {};

  return { 
    isPlaying, 
    toggleAudio, 
    startAudio, 
    stopAudio,
    triggerTrainTracks,
    triggerCityNoise,
    triggerThemeSuspense
  };
}
