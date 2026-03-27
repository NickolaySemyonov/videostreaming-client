import type {
  IAuthRequest,
  IExtendedVideoCard,
  IVideoCard,
  IVideoDataRequest,
  IVideoResponse,
} from "./dto";
import api from "./api";

const BASE_URL = "http://localhost:8080";

export const getMediaUrl = (fileType: string, fileName: string) => {
  return `${BASE_URL}/media/${fileType}/${fileName}`;
};

//#region auth

export const loginRequest = async (req: IAuthRequest) => {
  try {
    const res = await api.post("/auth/login", {
      email: req.email,
      password: req.password,
    });

    return res.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const registerRequest = async (req: IAuthRequest) => {
  try {
    const res = await api.post("/auth/register", {
      email: req.email,
      password: req.password,
    });

    return res.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const logoutRequest = async () => {
  try {
    const res = await api.post("/auth/logout");
    return res.data;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

//#endregion

//#region my channel
export const myChannelRequest = async () => {
  try {
    const res = await api.get("/me");

    return res.data;
  } catch (error) {
    console.error("error:", error);
    throw error;
  }
};

export const channelVideosRequest = async (
  channelTag: string,
): Promise<IVideoCard[]> => {
  try {
    const res = await api.get(`/channel/${channelTag}/video`);
    return res.data;
  } catch (error) {
    console.error("error fetching my videos:", error);
    throw error;
  }
};

// #endregion

//#region feed
export const feedRequest = async (): Promise<IVideoCard[]> => {
  try {
    const res = await api.get("/feed");
    return res.data;
  } catch (error) {
    console.error("error fetching feed:", error);
    throw error;
  }
};

export const videoRequest = async (
  videoId: string,
): Promise<IExtendedVideoCard> => {
  try {
    const res = await api.get(`/feed/${videoId}`);
    return res.data;
  } catch (error) {
    console.error("error fetching video:", error);
    throw error;
  }
};

//#endregion

//#region video management
export const createVideoRequest = async (
  request: IVideoDataRequest,
  videoFile: File,
  thumbnailFile: File,
): Promise<IVideoResponse> => {
  try {
    const formData = new FormData();

    formData.append(
      "videoToCreate",
      new Blob([JSON.stringify(request)], { type: "application/json" }),
    );
    formData.append("thumbnail", thumbnailFile);
    formData.append("video", videoFile);

    const response = await api.post("/video", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("error creating video:", error);
    throw error;
  }
};

export const updateVideoRequest = async (
  videoId: string,
  request: IVideoDataRequest,
  thumbnailFile: File | undefined,
): Promise<IVideoResponse> => {
  try {
    const formData = new FormData();
    formData.append(
      "videoToUpdate",
      new Blob([JSON.stringify(request)], { type: "application/json" }),
    );
    if (thumbnailFile !== undefined)
      formData.append("thumbnail", thumbnailFile);

    const response = await api.put(`/video/${videoId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("error updating video:", error);
    throw error;
  }
};

export const deleteVideoRequest = async (videoId: number): Promise<void> => {
  try {
    await api.delete(`/video/${videoId}`);
  } catch (error) {
    console.error("error deleting video:", error);
    throw error;
  }
};

//#endregion
