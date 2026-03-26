import { useEffect, useState } from "react";
import { myChannelRequest } from "../../api/requests";
interface IUserResponse {
  id: number;
  email: string;
  channelTag: string;
  channelName: string;
  channelDescription: string;
  bannerPath: string;
  miniaturePath: string;
  createdAt: Date;
}

export const ChannelDataSection = () => {
  const [channel, setChannel] = useState<IUserResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        setLoading(true);
        const response = await myChannelRequest();
        setChannel(response);
      } catch (err) {
        setError("Failed to load channel data");
        console.error("Error fetching channel:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChannelData();
  }, []);

  const content = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    if (!channel) {
      return <div>No channel data available</div>;
    }

    return (
      <div>
        <h1>{channel.channelName}</h1>
        <p>{channel.channelDescription}</p>
        <p>Tag: {channel.channelTag}</p>
        <p>Email: {channel.email}</p>
        <p>Created: {new Date(channel.createdAt).toLocaleDateString()}</p>
      </div>
    );
  };

  return content();
};
