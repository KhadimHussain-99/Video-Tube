import React from "react";
import thumbnail from "../../../assets/images/thumbnails/thumb-3.png";
import noProfile from "../../../assets/images/avatar/NoProfile.webp";
const VideoCard = ({ data }) => {
  return (
    <article className="space-y-4">
      <div className="w-full h-[120px] sm:h-[128px] md:h-[132px] xl:h-[136px]">
        <img
          className="w-full h-full object-cover"
          src={data?.thumbnail || thumbnail}
          alt="thumbnail"
        />
      </div>
      <div className="text-wite">
        <div className="flex items-center flex-grow gap-4 py-1">
          <img className="size-10 object-cover" src={noProfile} alt="profile" />
          <div className="flex-1">
            <h6 className="text-base text-ellipsis line-clamp-2">
              {data?.title}
            </h6>
          </div>
        </div>
        <div className="pl-14">
          <p className="flex items-center gap-x-2 flex-wrap text-sm text-ellipsis line-clamp-1">
            <span>{data?.views} Views</span>•<span>8 hour ago</span>•
            <span>Khadim Hussain</span>
          </p>
        </div>
      </div>
    </article>
  );
};

export default VideoCard;
