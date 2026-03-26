import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MyChannelPage } from "./pages/MyChannelPage";
import { FeedPage } from "./pages/FeedPage";
import { VideoPlayerPage } from "./pages/PlayerPage";
import { AuthPage } from "./pages/AuthPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />

        <Route path="/me" element={<MyChannelPage />} />

        <Route path="/feed" element={<FeedPage />} />
        <Route path="/feed/:videoId" element={<VideoPlayerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
