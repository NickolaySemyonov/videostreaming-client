import type { IVideoCard } from "../../api/dto";
import { getMediaUrl } from "../../api/requests";

export const VideoCard = ({
  videoId,
  videoName,
  thumbnailUrl,
  channelTag,
  channelName,
  miniatureUrl,
}: IVideoCard) => {
  return (
    <div
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.2s",
        backgroundColor: "white",
      }}
      onClick={() => console.log(`Navigate to video: ${videoId}`)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Thumbnail */}
      <img
        src={getMediaUrl("thumbnail", thumbnailUrl)}
        alt={videoName}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          backgroundColor: "#f5f5f5",
        }}
      />

      {/* Content */}
      <div style={{ padding: "12px", display: "flex", gap: "12px" }}>
        {/* Channel Avatar */}
        <img
          src={getMediaUrl("miniature", miniatureUrl)}
          alt={channelName}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            objectFit: "cover",
            backgroundColor: "#e0e0e0",
          }}
        />

        {/* Video Info */}
        <div style={{ flex: 1 }}>
          <h3
            style={{
              margin: "0 0 8px 0",
              fontSize: "16px",
              fontWeight: "500",
              lineHeight: "1.4",
            }}
          >
            {videoName}
          </h3>
          <p
            style={{
              margin: 0,
              fontSize: "14px",
              color: "#606060",
            }}
          >
            {channelName}
          </p>
        </div>
      </div>
    </div>
  );
};
