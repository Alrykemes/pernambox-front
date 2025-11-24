interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function cropImage(src: string, crop: CropArea): Promise<File> {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = crop.width;
      canvas.height = crop.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(
        img,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
      );

      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const file = new File([blob], "profile.jpg", { type: "image/jpeg" });
          resolve(file);
        },
        "image/jpeg",
        0.9
      );
    };
  });
}