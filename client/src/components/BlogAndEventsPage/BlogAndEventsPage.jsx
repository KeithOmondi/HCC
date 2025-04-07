import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  Favorite,
  Repeat,
  ChatBubbleOutline,
  Share,
} from "@mui/icons-material";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";

const initialPosts = [
  {
    id: 1,
    type: "post",
    user: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    content: "Just listed a new rental!",
    image: "https://source.unsplash.com/600x400/?apartment,rent",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    type: "blog",
    user: "Jane Smith",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    content: "New rental opportunities available.",
    image: "https://source.unsplash.com/600x400/?house,rental",
    timestamp: "5 hours ago",
  },
  {
    id: 3,
    type: "event",
    user: "EstateHub Admin",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    content: "We updated our website!",
    image: "https://source.unsplash.com/600x400/?real-estate,website",
    timestamp: "1 day ago",
  },
  {
    id: 4,
    type: "event",
    user: "Sarah Brown",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    content: "Open house this weekend!",
    image: "https://source.unsplash.com/600x400/?open-house,real-estate",
    timestamp: "6 hours ago",
  },
];


const BlogAndEventsPage = () => {
  const [posts, setPosts] = useState(initialPosts);
  const loadMore = () => {
    setTimeout(() => {
      setPosts((prev) => [...prev, ...initialPosts]);
    }, 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadMore();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Header />
      <div className="p-6 bg-gray-50 min-h-screen flex flex-col md:flex-row gap-6">
        {["post", "blog", "event"].map((type, index) => (
          <div key={index} className="w-full md:w-1/3 space-y-6">
            <h2
              className={`text-2xl font-bold ${
                type === "post"
                  ? "text-gray-700"
                  : type === "blog"
                  ? "text-blue-600"
                  : "text-green-600"
              }`}
            >
              {type === "post"
                ? "Social Posts"
                : type === "blog"
                ? "Latest Blogs"
                : "Upcoming Events"}
            </h2>
            {posts
              .filter((p) => p.type === type)
              .map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="p-4 rounded-lg shadow-lg border bg-white">
                    <div className="flex items-center gap-4">
                      <Avatar src={post.avatar} alt={post.user} />
                      <div>
                        <p className="font-semibold text-gray-900">
                          {post.user}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {post.timestamp}
                        </p>
                      </div>
                    </div>
                    <CardContent>
                      <p className="text-gray-700">{post.content}</p>
                      {post.image && (
                        <CardMedia
                          component="img"
                          image={post.image}
                          className="rounded-lg mt-4"
                        />
                      )}
                      <div className="flex justify-between mt-4">
                        {type === "post" && (
                          <>
                            <IconButton>
                              <Favorite />
                            </IconButton>
                            <IconButton>
                              <Repeat />
                            </IconButton>
                            <IconButton>
                              <ChatBubbleOutline />
                            </IconButton>
                            <IconButton>
                              <Share />
                            </IconButton>
                          </>
                        )}
                        {type === "blog" && (
                          <Button
                            variant="contained"
                            color="primary"
                            className="mt-4"
                          >
                            Read More
                          </Button>
                        )}
                        {type === "event" && (
                          <Button
                            variant="contained"
                            color="success"
                            className="mt-4"
                          >
                            Join Event
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  <Divider className="my-4" />
                </motion.div>
              ))}
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default BlogAndEventsPage;
