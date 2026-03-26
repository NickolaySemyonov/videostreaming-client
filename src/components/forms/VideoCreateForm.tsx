import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { IVideoDataRequest } from "../../api/dto";

import { createVideoRequest } from "../../api/requests";

// Form data structure
interface ICreateVideoFormData {
  videoName: string;
  videoDescription: string;
  video: FileList;
  thumbnail: FileList;
}

export const CreateVideoForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ICreateVideoFormData>({
    mode: "onChange",
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ICreateVideoFormData> = async (data) => {
    try {
      const videoFile = data.video[0];
      const thumbnailFile = data.thumbnail[0];

      if (!videoFile || !thumbnailFile) {
        throw new Error("Please select both video and thumbnail files");
      }

      // Rename this variable to avoid conflict with the interface name
      const videoRequestData: IVideoDataRequest = {
        name: data.videoName,
        description: data.videoDescription,
      };

      const result = await createVideoRequest(
        videoRequestData,
        videoFile,
        thumbnailFile,
      );

      console.log("Video created successfully:", result);

      reset();
      setTimeout(() => {
        navigate("/feed");
      }, 100);
    } catch (error) {
      console.error("Video upload failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="video-form">
      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          id="title"
          type="text"
          placeholder="Enter video title"
          {...register("videoName", {
            required: "videoName is required",
            minLength: {
              value: 3,
              message: "videoName must be at least 3 characters",
            },
            maxLength: {
              value: 255,
              message: "videoName cannot exceed 255 characters",
            },
          })}
        />
        {errors.videoName && (
          <p className="error-message">{errors.videoName.message}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder="Enter video description"
          rows={4}
          {...register("videoDescription", {
            maxLength: {
              value: 5000,
              message: "Description cannot exceed 5000 characters",
            },
          })}
        />
        {errors.videoDescription && (
          <p className="error-message">{errors.videoDescription.message}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="video">Video File *</label>
        <input
          id="video"
          type="file"
          accept="video/*"
          {...register("video", {
            required: "Video file is required",
            validate: {
              fileType: (files) => {
                if (!files?.[0]) return true;
                const allowedTypes = [
                  "video/mp4",
                  "video/mpeg",
                  "video/quicktime",
                  "video/x-msvideo",
                ];
                return (
                  allowedTypes.includes(files[0].type) ||
                  "Only video files are allowed (MP4, MPEG, MOV, AVI)"
                );
              },
              fileSize: (files) => {
                if (!files?.[0]) return true;
                const maxSize = 1024 * 1024 * 500; // 500MB
                return (
                  files[0].size <= maxSize ||
                  "Video file must be less than 500MB"
                );
              },
            },
          })}
        />
        {errors.video && (
          <p className="error-message">{errors.video.message}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="thumbnail">Thumbnail Image *</label>
        <input
          id="thumbnail"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          {...register("thumbnail", {
            required: "Thumbnail is required",
            validate: {
              fileType: (files) => {
                if (!files?.[0]) return true;
                const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
                return (
                  allowedTypes.includes(files[0].type) ||
                  "Only JPEG, PNG, or WEBP images are allowed"
                );
              },
              fileSize: (files) => {
                if (!files?.[0]) return true;
                const maxSize = 1024 * 1024 * 5; // 5MB
                return (
                  files[0].size <= maxSize || "Thumbnail must be less than 5MB"
                );
              },
            },
          })}
        />
        {errors.thumbnail && (
          <p className="error-message">{errors.thumbnail.message}</p>
        )}
      </div>

      <button type="submit" disabled={isSubmitting} className="submit-button">
        {isSubmitting ? "Uploading..." : "Create Video"}
      </button>
    </form>
  );
};
