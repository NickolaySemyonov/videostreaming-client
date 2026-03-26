export interface IAuthRequest {
  email: string;
  password: string;
}

export interface IVideoPreview {
  videoId: string; //UUID
  videoName: string;
  thumbnailUrl: string;
}

export interface IChannelPreview {
  channelTag: string;
  channelName: string;
  miniatureUrl: string;
}

export interface IVideoCard extends IVideoPreview, IChannelPreview {}

export interface IExtendedVideoCard extends IVideoCard {
  videoDescription: string;
  videoUrl: string;
  editable: boolean;
}

export interface IVideoDataRequest {
  name: string;
  description: string;
}

export interface IVideoResponse {
  id: string;
  name: string;
  description: string;
  thumbnailPath: string;
  videoPath: string;
  createdAt: Date;
}
