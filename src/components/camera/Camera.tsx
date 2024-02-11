import React, { useRef, useEffect, useState } from "react";
import { Button } from "components/button/Button";
import { createAUser } from "services/user";

export const Camera: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const webcamRef = useRef<HTMLVideoElement>(null);

  const cleanupCamera = () => {
    const video = webcamRef.current!;
    if (video.srcObject) {
      const stream = video.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const captureImage = async () => {
    setLoading(true);
    const video = webcamRef.current!;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas
      .getContext("2d")
      ?.drawImage(video, 0, 0, canvas.width, canvas.height);
    const idCardPicture = canvas.toDataURL("image/jpeg");

    try {
      await createAUser(idCardPicture);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const enableCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        webcamRef.current!.srcObject = stream;
      } catch (error) {
        console.log("Error accessing camera:", error);
      }
    };

    enableCamera();

    return () => cleanupCamera();
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <video autoPlay playsInline ref={webcamRef} />
      <Button
        handleOnClick={captureImage}
        textToShow={"Capture"}
        isLoading={loading}
      />
    </div>
  );
};
