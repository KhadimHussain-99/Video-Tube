import React from "react";
import thumbnail from "../../../assets/images/thumbnails/thumb-3.png";
import noProfile from "../../../assets/images/avatar/NoProfile.webp";
const VideoCard = ({ data }) => {
  return (
    <div className={`col-span-1 bg-slate-50`}>
      <div className="w-full h-[120px] sm:h-[180px] md:h-[1600px] xl:h-[150px]">
        <img
          className="w-full h-full object-cover"
          src={data?.thumbnail || thumbnail}
          alt="thumbnail"
        />
      </div>
      <div className="flex gap-2 px-1 pt-4 pb-2">
        <img
          className="w-10 h-10 object-cover mt-1"
          src={noProfile}
          alt="profile"
        />
        <div className="inline-block">
          <h6 className="text-base text-ellipsis line-clamp-2">
            {data?.title}
          </h6>
          <p className="flex items-center gap-x-2 flex-wrap text-sm text-ellipsis line-clamp-1">
            <span>{data?.views} Views</span>•<span>8 hour ago</span>•
            <span>Khadim Hussain</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
