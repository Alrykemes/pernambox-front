import { cropImage } from "@/utils/cropImage";
import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";

interface CropperModalProps {
  image: string;
  onCancel: () => void;
  onComplete: (file: File) => void;
}

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function CropperModal({ image, onCancel, onComplete }: CropperModalProps) {
  const [zoom, setZoom] = useState<number>(1);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea | null>(null);

  const onCropComplete = useCallback(
    (_: any, areaPixels: CropArea) => {
      setCroppedAreaPixels(areaPixels);
    },
    []
  );

  const handleConfirm = async () => {
    if (!croppedAreaPixels) return;
    const croppedFile = await cropImage(image, croppedAreaPixels);
    onComplete(croppedFile);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-md space-y-4 shadow-xl">
        <div className="relative w-[300px] h-[300px]">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-3 py-1 border rounded">
            Cancelar
          </button>

          <button
            onClick={handleConfirm}
            className="px-3 py-1 bg-green-600 text-white rounded"
          >
            Confirmar Corte
          </button>
        </div>
      </div>
    </div>
  );
}