import React, { useEffect, useState } from "react";
import Card from "../../../components/ui/Card";
import VideoCard from "../../../components/partials/video_card";
import axios from "axios";
import { videosApi } from "../../../constant/apiRoutes";
import Loading from "../../../components/Loading";

const Home = () => {
  const [data, setData] = useState({});
  const [isLaoding, setIsLaoding] = useState(false);

  const getData = async () => {
    try {
      setIsLaoding(true);
      const { data } = await axios.get(videosApi);
      if (data.success) {
        // console.log(data.data);
        setData(data.data);
      } else {
        console.log(data.message);
        setData({});
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLaoding(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Card bodyClass="p-2 sm:p-4 md:p-5" className="min-h-screen">
      {isLaoding ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {data?.videos?.map((item) => (
            <VideoCard data={item} key={item._id} />
          ))}
        </div>
      )}
    </Card>
  );
};

export default Home;
