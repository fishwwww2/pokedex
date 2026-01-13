import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.scss";

// pages
const Main = lazy(() => import("./pages/Main"));
const Detail = lazy(() => import("./pages/Detail"));
const Search = lazy(() => import("./pages/Search"));
const Favorites = lazy(() => import("./pages/Favorites"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<p className="text-center mt-20">로딩 중...</p>}>
        <main>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/search" element={<Search />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
