export function getImgUrl(templeId: string | false) {
  const config = useRuntimeConfig();
  return templeId ? "https://" + config.public.mediaUrl + "/" + templeId + ".webp" : "/logo_ipuc.webp";
}
