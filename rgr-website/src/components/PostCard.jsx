import { PB, PocketBaseUrl } from "../constants";
import { CCarousel, CCarouselItem, CImage } from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import { useSelector } from "react-redux";
import LikeIcon from "../assets/icons/LikeIcon";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

const dataCard = ({ post, isProfile, setPosts }) => {
  const [data, setData] = useState(post);
  const auth_data = useSelector((state) => state.auth.auth_data);
  const [searchParams, _] = useSearchParams();
  const navigate = useNavigate();

  async function handleLikedata() {
    if (!data.likes.includes(auth_data.id)) {
      data.likes.push(auth_data.id);
    } else {
      data.likes.splice(data.likes.indexOf(auth_data.id), 1);
    }

    await PB.collection("posts").update(data.id, {
      likes: data.likes,
    });

    const newData = await PB.collection("posts").getOne(data.id, {
      expand: "user",
    });

    setData(newData);
  }

  async function handleDeletePost() {
    await PB.collection("posts").delete(data.id);

    const newData = await PB.collection("posts").getList(1, 30, {
      expand: "user",
      filter: `user="${auth_data.id}"`,
    });

    setPosts(newData.items);
  }

  return (
    <div className="w-full border-2 border-[#0a3a40] rounded-2xl bg-[#000]/30 shadow-xl backdrop-blur-3xl overflow-hidden">
      <div className="flex flex-row items-start justify-between px-3 py-2 border-b-2 border-b-[#0a3a40]">
        <span
          className="cursor-pointer"
          onClick={() => navigate(`/profile?id=${data.expand.user?.id}`)}
        >
          @{data.expand.user?.login}
        </span>
        <span>{data.created.slice(0, 10)}</span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 px-3 py-2">
          <h2>{data.title}</h2>
          <p>{data.text}</p>
        </div>
        {data.images.length !== 0 && (
          <div className="w-full h-full aspect-square overflow-hidden">
            <CCarousel controls indicators dark interval={false}>
              {data.images.map((image, index) => (
                <CCarouselItem key={index}>
                  <CImage
                    className="d-block w-full object-cover"
                    src={`${PocketBaseUrl}/api/files/posts/${data.id}/${image}`}
                  />
                </CCarouselItem>
              ))}
            </CCarousel>
          </div>
        )}
      </div>
      <div className="flex flex-row items-center px-3 py-2 border-t-2 border-t-[#0a3a40] justify-between">
        <div className="flex flex-row items-center gap-2">
          <div onClick={handleLikedata} className="cursor-pointer">
            <LikeIcon
              color={data.likes.includes(auth_data.id) ? "red" : "#fff"}
            />
          </div>
          <span>{data.likes.length}</span>
        </div>
        {((isProfile && searchParams.get("id") === auth_data.id) ||
          auth_data.accessLevel === "admin") && (
          <button
            className="bg-red-700 px-3 py-1 rounded-lg text-white cursor-pointer"
            onClick={handleDeletePost}
          >
            Удалить
          </button>
        )}
      </div>
    </div>
  );
};

export default dataCard;
