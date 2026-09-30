export function panelActivationIntent(pointerType, previewed) {
  return pointerType === "touch" && !previewed ? "preview" : "activate";
}
