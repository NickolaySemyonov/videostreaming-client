import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import type { IVideoDataRequest, IVideoResponse } from "../../api/dto";
import { updateVideoRequest } from "../../api/requests";
import { useEffect, useState } from "react";

// Form data structure for update
interface IUpdateVideoFormData {
  videoName: string;
  videoDescription: string;
  thumbnail: FileList;
}

// Props for fetching existing video data
interface UpdateVideoFormProps {
  existingVideo?: {
    id: string;
    name: string;
    description: string;
    thumbnailUrl?: string;
  };
}

export const UpdateVideoForm = ({ existingVideo }: UpdateVideoFormProps) => {
  //   const { videoId } = useParams<{ videoId: string }>();
  const [currentThumbnail, setCurrentThumbnail] = useState<string | undefined>(
    existingVideo?.thumbnailUrl,
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<IUpdateVideoFormData>({
    mode: "onChange",
    defaultValues: {
      videoName: existingVideo?.name || "",
      videoDescription: existingVideo?.description || "",
    },
  });

  const navigate = useNavigate();

  // Pre-populate form with existing video data
  useEffect(() => {
    if (existingVideo) {
      setValue("videoName", existingVideo.name);
      setValue("videoDescription", existingVideo.description);
    }
  }, [existingVideo, setValue]);

  const onSubmit: SubmitHandler<IUpdateVideoFormData> = async (data) => {
    try {
      // Prepare the video data request (without the video file since it's not being updated)
      const videoRequestData: IVideoDataRequest = {
        name: data.videoName,
        description: data.videoDescription,
      };

      // Get the thumbnail file if provided
      const thumbnailFile = data.thumbnail?.[0];

      // Use videoId from params or props
      const id = existingVideo?.id;

      if (!id) {
        throw new Error("Video ID is required for update");
      }

      const result: IVideoResponse = await updateVideoRequest(
        id,
        videoRequestData,
        thumbnailFile,
      );

      console.log("Video updated successfully:", result);

      // Reset only the thumbnail field since we want to keep text data
      reset({}, { keepValues: true });

      // Update current thumbnail preview if a new one was uploaded
      if (thumbnailFile) {
        const previewUrl = URL.createObjectURL(thumbnailFile);
        setCurrentThumbnail(previewUrl);

        // Cleanup old preview URL
        return () => {
          if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
      }

      // Navigate back after successful update
      setTimeout(() => {
        navigate(`/video/${id}`);
      }, 100);
    } catch (error) {
      console.error("Video update failed:", error);
    }
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
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
            required: "Video title is required",
            minLength: {
              value: 3,
              message: "Video title must be at least 3 characters",
            },
            maxLength: {
              value: 255,
              message: "Video title cannot exceed 255 characters",
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
        <label htmlFor="thumbnail">Thumbnail Image</label>
        {currentThumbnail && (
          <div className="current-thumbnail">
            <img
              src={currentThumbnail}
              alt="Current thumbnail"
              className="thumbnail-preview"
            />
            <p className="thumbnail-note">
              Current thumbnail (upload new to replace)
            </p>
          </div>
        )}
        <input
          id="thumbnail"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          {...register("thumbnail", {
            validate: {
              fileType: (files) => {
                if (!files?.[0]) return true; // Optional field
                const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
                return (
                  allowedTypes.includes(files[0].type) ||
                  "Only JPEG, PNG, or WEBP images are allowed"
                );
              },
              fileSize: (files) => {
                if (!files?.[0]) return true; // Optional field
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
        <p className="help-text">
          Leave empty to keep current thumbnail. Max size: 5MB
        </p>
      </div>

      <div className="form-actions">
        <button
          type="button"
          onClick={handleCancel}
          className="cancel-button"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button type="submit" disabled={isSubmitting} className="submit-button">
          {isSubmitting ? "Updating..." : "Update Video"}
        </button>
      </div>
    </form>
  );
};
