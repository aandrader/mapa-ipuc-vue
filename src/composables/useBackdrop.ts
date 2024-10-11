export function useBackdrop(onBackdrop: () => void) {
  const refId = useId();
  const drawer = useTemplateRef<HTMLDivElement>(refId);
  const closeElement = (event: any) => {
    if (!drawer.value!.contains(event.target as Node)) {
      onBackdrop();
    }
  };
  onMounted(() => {
    document.addEventListener("mousedown", closeElement);
  });
  onUnmounted(() => {
    document.removeEventListener("mousedown", closeElement);
  });

  return refId;
}
