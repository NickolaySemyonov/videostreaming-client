import { useEffect, useState } from "react";
import type { IVideoCard } from "../../api/dto";
import { channelVideosRequest } from "../../api/requests";
import { Link } from "react-router-dom";
import { VideoCard } from "../ui/VideoCard";

export const ChannelVideoSection = ({ channelTag }: { channelTag: string }) => {
  const [videos, setVideos] = useState<IVideoCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChannelVideos = async () => {
      try {
        setLoading(true);
        const response = await channelVideosRequest(channelTag);
        setVideos(response);
      } catch (err) {
        setError("Failed to load videos");
        console.error("Error fetching videos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChannelVideos();
  }, []);

  const content = () => {
    if (loading) {
      return <div>Loading videos...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    if (videos.length === 0) {
      return <div>No videos available</div>;
    }

    return (
      <div>
        <div
          style={{
            marginBottom: "24px",
            paddingBottom: "16px",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <h1 style={{ margin: 0 }}>My video</h1>
          <p style={{ margin: "8px 0 0 0", color: "#666" }}>
            {videos.length} {videos.length === 1 ? "video" : "videos"} available
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {videos.map((video) => (
            <Link to={"/feed/" + video.videoId} key={video.videoId}>
              <VideoCard
                videoId={video.videoId}
                videoName={video.videoName}
                thumbnailUrl={video.thumbnailUrl}
                channelTag={video.channelTag}
                channelName={video.channelName}
                miniatureUrl={video.miniatureUrl}
              />
            </Link>
          ))}
        </div>
      </div>
    );
  };
  return content();
};
