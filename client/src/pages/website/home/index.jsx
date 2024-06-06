import React, { useEffect, useState } from "react";
import Card from "../../../components/ui/Card";
import VideoCard from "../../../components/partials/video_card";
import axios from "axios";
import { videosApi } from "../../../constant/apiRoutes";

const Home = () => {
  const [data, setData] = useState({});
  const [isLaoding, setIsLaoding] = useState(false);

  const getData = async () => {
    try {
      setIsLaoding(true);
      const { data } = await axios.get(videosApi);
      if (data.success) {
        console.log(data.data);
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
    <Card className="min-h-screen">
      <div className="grid grid-cols-4 gap-3">
        {!isLaoding &&
          data?.videos?.map((item) => <VideoCard data={item} key={item._id} />)}
      </div>
    </Card>
  );
};

export default Home;
