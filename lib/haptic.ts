let switchLabel: HTMLLabelElement | null = null;

function ensureSwitch(): HTMLLabelElement | null {
  if (typeof document === "undefined") return null;
  if (switchLabel && document.body.contains(switchLabel)) return switchLabel;
  const label = document.createElement("label");
  const input = document.createElement("input");
  input.type = "checkbox";
  input.setAttribute("switch", "");
  input.tabIndex = -1;
  input.setAttribute("aria-hidden", "true");
  label.appendChild(input);
  label.style.cssText =
    "position:fixed;left:-100px;top:-100px;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none;";
  label.setAttribute("aria-hidden", "true");
  document.body.appendChild(label);
  switchLabel = label;
  return label;
}

const canVibrate = typeof navigator !== "undefined" && "vibrate" in navigator;
function tick() {
  ensureSwitch()?.click();
}
function ticks(count: number) {
  tick();
  for (let i = 1; i < count; i++) window.setTimeout(tick, i * 80);
}
const vibrate = (p: number | number[]) => navigator.vibrate(p);

export const haptic = {
  complete: () => (canVibrate ? vibrate([10, 30, 10]) : ticks(2)),
  select: () => (canVibrate ? vibrate(5) : ticks(1)),
  drag: () => (canVibrate ? vibrate(8) : ticks(1)),
  delete: () => (canVibrate ? vibrate([15, 10, 15]) : ticks(2)),
  error: () => (canVibrate ? vibrate([20, 40, 20, 40, 20]) : ticks(3)),
};
