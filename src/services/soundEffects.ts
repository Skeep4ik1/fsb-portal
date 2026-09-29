// Web Audio API tactical sound effects synthesizer

class TacticalAudioEngine {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    try {
      if (!this.ctx) {
        const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtxClass) {
          this.ctx = new AudioCtxClass();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  /**
   * Sound 1: Warning notification (30 minutes before event)
   * Military radio beep + double harmonic chime
   */
  public play30MinWarning(volume: number = 0.3) {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // First beep (Radio squelch start)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, now); // D5
      osc1.frequency.exponentialRampToValueAtTime(880, now + 0.08); // A5
      gain1.gain.setValueAtTime(volume * 0.4, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.2);

      // Second affirmative chime (F#5 -> B5)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(739.99, now + 0.12); // F#5
      osc2.frequency.exponentialRampToValueAtTime(987.77, now + 0.25); // B5
      gain2.gain.setValueAtTime(0.001, now);
      gain2.gain.setValueAtTime(volume * 0.5, now + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.12);
      osc2.stop(now + 0.55);
    } catch {
      // Ignore audio failure
    }
  }

  /**
   * Sound 2: Combat alarm notification (Event starts NOW)
   * High-priority tactical siren sequence (3 fast resonant pulses)
   */
  public playEventStartAlarm(volume: number = 0.35) {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const pulses = [0, 0.18, 0.36];

      pulses.forEach((delay) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(980, now + delay);
        osc.frequency.exponentialRampToValueAtTime(1318.5, now + delay + 0.1);
        gain.gain.setValueAtTime(volume * 0.45, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.15);

        // Filter to make sawtooth sound crisp & tactical, not harsh
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2400, now + delay);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + delay);
        osc.stop(now + delay + 0.16);
      });
    } catch {
      // Ignore audio failure
    }
  }

  /**
   * Sound 3: Quick click / toggle feedback
   */
  public playClick(volume: number = 0.2) {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(volume * 0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // Ignore audio failure
    }
  }
}

export const tacticalAudio = new TacticalAudioEngine();
