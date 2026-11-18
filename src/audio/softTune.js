// Procedurally generated shaadi ambience (no audio file needed):
//  - reedy shehnai-style lead with vibrato and meend (glides), playing Raag Bhupali phrases
//  - tanpura plucks (Pa-Sa-Sa-Sa) and a very soft dholak pulse, all through a warm reverb.
// Drop a real recording in /public/audio/shehnai.mp3 and it is used instead.
export function createTune({ onChange } = {}) {
  let ctx, master, bus, timer, stopTimer, playing = false;
  const LEVEL = 0.55;
  const BEAT = 0.7; // seconds per beat
  const HB = BEAT / 2;
  const SA = 293.66; // D4

  // swar -> ratio to Sa
  const R = { ".d": 5 / 6, ".p": 3 / 4, s: 1, r: 9 / 8, g: 5 / 4, p: 3 / 2, d: 5 / 3, S: 2, R: 9 / 4, _: null };
  // 8-beat phrases: [swar, beats]
  const PHRASES = [
    [["g", 1.5], ["r", 0.5], ["g", 1], ["p", 1.5], ["g", 0.5], ["r", 1], ["s", 2]],
    [["s", 1], ["r", 0.5], ["g", 0.5], ["p", 1], ["d", 1], ["p", 1], ["g", 1], ["r", 0.5], ["s", 0.5], ["_", 1]],
    [["p", 1], ["d", 1], ["S", 1.5], ["d", 0.5], ["p", 1], ["g", 1], ["r", 0.5], ["s", 0.5], ["_", 1]],
    [[".d", 1], ["s", 1], ["r", 1], ["g", 2], ["r", 0.5], ["g", 0.5], ["p", 1], ["g", 1]],
  ];
  let queue = [], phraseNo = 0, prevFreq = null;
  const refill = () => {
    const order = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
    order.forEach((i, k) => {
      queue.push(...PHRASES[i]);
      if (k % 2) queue.push(["_", 4]); // breathing space
    });
    phraseNo++;
  };

  const impulse = (c) => {
    const len = Math.floor(c.sampleRate * 3.2);
    const buf = c.createBuffer(2, len, c.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.4);
    }
    return buf;
  };

  const build = () => {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    const verb = ctx.createConvolver();
    verb.buffer = impulse(ctx);
    const wet = ctx.createGain(); wet.gain.value = 0.5;
    const dry = ctx.createGain(); dry.gain.value = 0.8;
    bus = ctx.createGain();
    bus.connect(dry); dry.connect(master);
    bus.connect(verb); verb.connect(wet); wet.connect(master);

    // faint sustained Sa pad
    const pad = ctx.createOscillator(); pad.type = "sine"; pad.frequency.value = 146.83;
    const pg = ctx.createGain(); pg.gain.value = 0.03;
    pad.connect(pg); pg.connect(bus); pad.start();

    document.addEventListener("visibilitychange", () => {
      if (!playing) return;
      document.hidden ? ctx.suspend() : ctx.resume();
    });
    return true;
  };

  // reedy shehnai voice
  const shehnai = (freq, t, dur, from) => {
    const out = ctx.createGain();
    const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 3200; lp.Q.value = 0.7;
    const f1 = ctx.createBiquadFilter(); f1.type = "peaking"; f1.frequency.value = 1250; f1.gain.value = 9; f1.Q.value = 1.2;
    const f2 = ctx.createBiquadFilter(); f2.type = "peaking"; f2.frequency.value = 2500; f2.gain.value = 5; f2.Q.value = 1.5;
    out.connect(f1); f1.connect(f2); f2.connect(lp); lp.connect(bus);
    const dryTap = ctx.createGain(); dryTap.gain.value = 0.25; lp.connect(dryTap); dryTap.connect(master);

    const end = t + dur;
    out.gain.setValueAtTime(0.0001, t);
    out.gain.linearRampToValueAtTime(0.13, t + 0.09);
    out.gain.setValueAtTime(0.12, Math.max(t + 0.1, end - 0.18));
    out.gain.linearRampToValueAtTime(0.0001, end + 0.12);

    const lfo = ctx.createOscillator(); lfo.frequency.value = 5.4;
    const lg = ctx.createGain();
    lg.gain.setValueAtTime(0, t);
    lg.gain.linearRampToValueAtTime(freq * 0.008, t + Math.min(0.5, dur)); // vibrato blooms
    lfo.connect(lg);
    lfo.start(t); lfo.stop(end + 0.2);

    [0, 9].forEach((det) => {
      const o = ctx.createOscillator(); o.type = "sawtooth"; o.detune.value = det;
      if (from && Math.abs(from - freq) > 1) {
        o.frequency.setValueAtTime(from, t);
        o.frequency.exponentialRampToValueAtTime(freq, t + 0.14); // meend
      } else o.frequency.setValueAtTime(freq, t);
      lg.connect(o.frequency);
      o.connect(out);
      o.start(t); o.stop(end + 0.2);
    });
  };

  const tanpura = (freq, t) => {
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.07, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0006, t + 3.4);
    const lp = ctx.createBiquadFilter(); lp.type = "lowpass";
    lp.frequency.setValueAtTime(2600, t);
    lp.frequency.exponentialRampToValueAtTime(500, t + 2.5);
    lp.connect(g); g.connect(bus);
    [0, 5].forEach((det) => {
      const o = ctx.createOscillator(); o.type = "sawtooth"; o.frequency.value = freq; o.detune.value = det;
      o.connect(lp); o.start(t); o.stop(t + 3.5);
    });
  };

  const thump = (t) => {
    const o = ctx.createOscillator(); o.type = "sine";
    o.frequency.setValueAtTime(130, t);
    o.frequency.exponentialRampToValueAtTime(55, t + 0.18);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.24, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
    o.connect(g); g.connect(bus); g.connect(master);
    o.start(t); o.stop(t + 0.4);
  };
  let noiseBuf;
  const tick = (t, vol = 0.07) => {
    if (!noiseBuf) {
      noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate);
      const d = noiseBuf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    const s = ctx.createBufferSource(); s.buffer = noiseBuf;
    const hp = ctx.createBiquadFilter(); hp.type = "bandpass"; hp.frequency.value = 2200; hp.Q.value = 1.1;
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
    s.connect(hp); hp.connect(g); g.connect(bus);
    s.start(t); s.stop(t + 0.1);
  };

  // cursors
  let tTan = 0, tPerc = 0, tMel = 0, tanStep = 0, percStep = 0;
  const TAN = [110, 146.83, 146.83, 73.42];
  const PERC = ["D", "", "t", "", "D", "t", "t", ""];

  const schedule = () => {
    const now = ctx.currentTime, ahead = now + 1.5;
    if (tTan < now) tTan = now + 0.1;
    if (tPerc < now) tPerc = now + 0.1;
    if (tMel < now) tMel = now + 0.1;
    while (tTan < ahead) { tanpura(TAN[tanStep++ % 4], tTan); tTan += 0.95; }
    while (tPerc < ahead) {
      const p = PERC[percStep++ % 8];
      if (p === "D") thump(tPerc); else if (p === "t") tick(tPerc);
      tPerc += HB;
    }
    while (tMel < ahead) {
      if (!queue.length) refill();
      const [sw, beats] = queue.shift();
      const dur = beats * BEAT;
      const r = R[sw];
      if (r) {
        const f = SA * r;
        shehnai(f, tMel, dur, prevFreq);
        prevFreq = f;
      } else prevFreq = null;
      tMel += dur;
    }
  };

  const set = (v) => { playing = v; onChange?.(v); };

  return {
    get playing() { return playing; },
    start() {
      if (playing) return;
      if (!ctx && !build()) return;
      clearTimeout(stopTimer);
      ctx.resume();
      const now = ctx.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setTargetAtTime(LEVEL, now, 1.2);
      tTan = now + 0.4; tPerc = now + 2.4; tMel = now + 2.4 + 4 * BEAT; // tanpura first, then pulse, then shehnai
      tanStep = 0; percStep = 0; queue = []; prevFreq = null;
      schedule();
      timer = setInterval(schedule, 300);
      set(true);
    },
    stop() {
      if (!playing) return;
      clearInterval(timer);
      const now = ctx.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setTargetAtTime(0, now, 0.5);
      stopTimer = setTimeout(() => ctx.suspend(), 2500);
      set(false);
    },
  };
}
