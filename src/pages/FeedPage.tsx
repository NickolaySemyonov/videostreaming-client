import { useEffect, useState } from "react";
import { feedRequest } from "../api/requests";
import { MainLayout } from "../components/layouts/MainLayout";
import { VideoCard } from "../components/ui/VideoCard";
import { type IVideoCard } from "../api/dto";
import { Link } from "react-router-dom";

export const FeedPage = () => {
  const [feed, setFeed] = useState<IVideoCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        setLoading(true);
        const response = await feedRequest();
        setFeed(response);
      } catch (err) {
        setError("Failed to load feed");
        console.error("Error fetching feed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  const content = () => {
    if (loading) {
      return <div>Loading videos...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    if (feed.length === 0) {
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
          <h1 style={{ margin: 0 }}>Video Feed</h1>
          <p style={{ margin: "8px 0 0 0", color: "#666" }}>
            {feed.length} {feed.length === 1 ? "video" : "videos"} available
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {feed.map((video) => (
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

  return <MainLayout>{content()}</MainLayout>;
};
