// pages/VideoPlayerPage.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MainLayout } from "../components/layouts/MainLayout";
import { VideoPlayer } from "../components/VideoPlayer";
import { type IExtendedVideoCard } from "../api/dto";
import { videoRequest } from "../api/requests";

export const VideoPlayerPage = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const [videoCard, setVideoCard] = useState<IExtendedVideoCard | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      if (!videoId) {
        setError("No video ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await videoRequest(videoId);
        setVideoCard(response);
      } catch (err) {
        setError("Failed to load video");
        console.error("Error fetching video:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [videoId]);

  const content = () => {
    if (loading) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "400px",
          }}
        >
          <div>Loading video...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "#f44336",
          }}
        >
          <div>Error: {error}</div>
          <button
            onClick={() => window.history.back()}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            Go Back
          </button>
        </div>
      );
    }

    if (!videoCard) {
      return (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
          }}
        >
          <div>Video not found</div>
          <button
            onClick={() => window.history.back()}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            Go Back
          </button>
        </div>
      );
    }

    return <VideoPlayer {...videoCard} />;
  };

  return <MainLayout>{content()}</MainLayout>;
};
