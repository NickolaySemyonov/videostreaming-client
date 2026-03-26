// components/video/VideoPlayer.tsx
import { useRef } from "react";
import { type IExtendedVideoCard } from "../api/dto";
import { getMediaUrl } from "../api/requests";

export const VideoPlayer = (videoCard: IExtendedVideoCard) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div style={{ width: "100%", maxWidth: "1000px", margin: "0 auto" }}>
      {/* Video Element */}
      <video
        ref={videoRef}
        src={getMediaUrl("video", videoCard.videoUrl)}
        poster={getMediaUrl("thumbnail", videoCard.thumbnailUrl)}
        controls
        style={{
          width: "100%",
          borderRadius: "8px",
          backgroundColor: "#000",
          maxHeight: "70vh",
        }}
      >
        Your browser does not support the video tag.
      </video>

      {/* Video Info */}
      <div style={{ marginTop: "20px" }}>
        <h1 style={{ margin: "0 0 12px 0", fontSize: "24px" }}>
          {videoCard.videoName}
        </h1>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "16px",
          }}
        >
          <img
            src={getMediaUrl("miniature", videoCard.miniatureUrl)}
            alt={videoCard.channelName}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />

          <p style={{ margin: 0, fontWeight: "500" }}>
            {videoCard.channelName}
          </p>
        </div>

        <div
          style={{
            padding: "16px",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            marginTop: "16px",
          }}
        >
          <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>
            {videoCard.videoDescription || "No description available."}
          </p>
        </div>
      </div>
    </div>
  );
};
