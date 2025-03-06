import React, { useEffect, useState } from "react";
import VideoCard from "../../../components/partials/video_card";
import axios from "axios";
import { videoApi } from "../../../constant/apiRoutes";
import Loading from "../../../components/Loading";

const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(videoApi);
      if (data.success) {
        // console.log(data.data);
        setData(data.data);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <section className="p-4">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {data?.videos?.map((item) => (
            <VideoCard data={item} key={item._id} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Home;
