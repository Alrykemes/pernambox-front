import { create } from "zustand";
import { authApi } from "@/lib/api"; // ajusta conforme o teu path

type Subscriber = (url: string | null) => void;

type Entry = {
  url: string | null;
  interval: number | null;
  initialized: boolean;
  subscribers: Set<Subscriber>;
};

type PresignedUrlState = {
  images: Record<string, Entry>;

  initImage: (key: string) => void;
  subscribeToImage: (key: string, subscriber: Subscriber) => () => void;
};

export const usePresignedUrlStore = create<PresignedUrlState>((set, get) => {
  const ensureEntry = (key: string) => {
    const st = get();
    if (!st.images[key]) {
      st.images[key] = {
        url: null,
        interval: null,
        initialized: false,
        subscribers: new Set()
      };
      set((s) => ({ images: { ...s.images } }));
    }
    return st.images[key];
  };

  const initImage = (key: string) => {
    const entry = ensureEntry(key);

    if (entry.initialized) return;
    entry.initialized = true;

    const updateUrl = async () => {
      try {
        const res = await authApi.get(`/files/url/${key}`);
        const newUrl = res.data;

        entry.url = newUrl;

        // notificar subscribers
        for (const sub of entry.subscribers) {
          sub(newUrl);
        }

        // atualizar Zustand
        set((s) => ({ images: { ...s.images } }));
      } catch (error) {
        console.error(`Erro ao buscar presigned URL para "${key}":`, error);
      }
    };

    updateUrl();

    entry.interval = window.setInterval(updateUrl, 10 * 60 * 1000); // 10 min
  };

  const subscribeToImage = (key: string, subscriber: Subscriber) => {
    const entry = ensureEntry(key);

    entry.subscribers.add(subscriber);
    subscriber(entry.url);

    return () => {
      entry.subscribers.delete(subscriber);

      if (entry.subscribers.size === 0) {
        if (entry.interval !== null) {
          clearInterval(entry.interval);
        }
        entry.interval = null;
        entry.initialized = false;

        const st = get();
        delete st.images[key];
        set((s) => ({ images: { ...st.images } }));
      }
    };
  };

  return {
    images: {},
    initImage,
    subscribeToImage
  };
});
