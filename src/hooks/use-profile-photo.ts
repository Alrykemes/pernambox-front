import { useEffect, useState } from "react";
import { usePresignedUrlStore } from "@/stores/presigned-url-store";

export function useProfilePhoto(key: string | null) {
  const [url, setUrl] = useState<string | null>(() => {
    if (!key) return null;
    const st = usePresignedUrlStore.getState();
    return st.images[key]?.url ?? null;
  });

  useEffect(() => {
    if (!key) {
      // Key inválida → limpa a URL
      setUrl(null);
      return;
    }

    const store = usePresignedUrlStore.getState();

    store.initImage(key);

    const unsub = store.subscribeToImage(key, setUrl);

    return () => unsub();
  }, [key]);

  return url;
}
