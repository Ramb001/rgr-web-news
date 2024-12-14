import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { PB } from "../constants";
import Posts from "../components/Posts";
import { Modal, Sheet, Typography } from "@mui/joy";
import { useNavigate, useSearchParams } from "react-router-dom";

const Profile = () => {
  const [posts, setPosts] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const auth_data = useSelector((state) => state.auth.auth_data);
  const [searchParams, _] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getPosts = async () => {
      const request = await PB.collection("posts").getList(1, 25, {
        sort: "-created",
        expand: "user",
        filter: `user.id="${searchParams.get("id")}"`,
      });

      setPosts(request.items);
      setTotalPages(request.totalPages);
    };
    getPosts();
  }, [searchParams.get("id")]);

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);

  function handleFileChange(event) {
    const files = Array.from(event.target.files);
    setImages(files);
  }

  async function handleCreatePost() {
    const formData = new FormData();

    formData.append("user", auth_data.id);
    formData.append("title", title);
    formData.append("text", text);
    formData.append("likes", JSON.stringify([]));

    images.forEach((file) => {
      formData.append("images", file);
    });

    await PB.collection("posts").create(formData);

    const newData = await PB.collection("posts").getList(1, 30, {
      expand: "user",
      sort: "-created",
      filter: `user="${auth_data.id}"`,
    });

    setPosts(newData.items);

    setOpen(false);
    setTitle("");
    setText("");
    setImages([]);
  }

  async function handleDeleteUser() {
    await PB.collection("users").delete(searchParams.get("id"));
    navigate("/feed");
  }

  return (
    posts && (
      <>
        <Navbar />
        <div className="px-8 py-6 w-full flex flex-col gap-6 items-center">
          {searchParams.get("id") === auth_data.id && (
            <button
              className="border border-[#0a3a40] rounded-lg px-4 py-2 bg-[#0a3a40] text-[#fff] w-full"
              onClick={() => setOpen(true)}
            >
              Новый пост
            </button>
          )}
          {searchParams.get("id") !== auth_data.id &&
            auth_data.accessLevel === "admin" && (
              <button
                className="border border-[#0a3a40] rounded-lg px-4 py-2 bg-red-700 text-[#fff] w-full"
                onClick={handleDeleteUser}
              >
                Удалить пользователя
              </button>
            )}
          <Posts posts={posts} isProfile={true} />
        </div>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Sheet
            sx={{
              minWidth: 300,
              borderRadius: "md",
              p: 3,
              bgcolor: "rgba(0,0,0,0.9)",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: "50%",
              minWidth: "300px",
              maxWidth: "526px",
              maxHeight: "80%",
            }}
          >
            <Typography level="title-lg">Новый пост 📰</Typography>
            <input
              placeholder="Название"
              type="text"
              className="w-full border-[#0a3a40] border-2 rounded-lg px-4 py-2 outline-none bg-transparent text-[#fff]"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <textarea
              placeholder="Текст"
              type="text"
              className="w-full border-[#0a3a40] border-2 rounded-lg px-4 py-2 outline-none bg-transparent text-[#fff]"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <label className="border border-[#0a3a40] rounded-lg px-4 py-2 bg-[#0a3a40] text-[#fff] w-full text-center cursor-pointer">
              {images.length === 0
                ? "Загрузить изображения"
                : `${images.length} ${
                    images.length === 1 ? "изображение" : "изображений"
                  }`}

              <input
                type="file"
                onChange={handleFileChange}
                multiple={true}
                accept="image/*"
                className="hidden"
              />
            </label>
            <button
              className="border border-[#0a3a40] rounded-lg px-4 py-2 bg-[#0a3a40] text-[#fff] w-full"
              onClick={handleCreatePost}
            >
              Создать
            </button>
          </Sheet>
        </Modal>
      </>
    )
  );
};

export default Profile;
