import React, { useEffect, useState } from "react";
import GridLayout, { WidthProvider } from "react-grid-layout";
import type { Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(GridLayout);

const MultiURLTab: React.FC = () => {
  const [urls, setUrls] = useState<string[]>([]);
  const [layout, setLayout] = useState<Layout[]>([]);
  const [fullscreenUrl, setFullscreenUrl] = useState<string | null>(null);

  // Load URLs + Layout from localStorage
  useEffect(() => {
    const storedURLs = JSON.parse(localStorage.getItem("urls") || "[]");
    const storedLayout = JSON.parse(localStorage.getItem("layout") || "[]");

    if (storedURLs.length > 0) setUrls(storedURLs);

    if (storedLayout.length > 0) {
      setLayout(storedLayout);
    } else {
      // Default layout in 2-column pattern
      const defaultLayout = storedURLs.map((url: string, index: number) => ({
        i: url.toString(),
        x: (index % 2) * 2,
        y: Math.floor(index / 2),
        w: 2,
        h: 2,
      }));
      setLayout(defaultLayout);
    }
  }, []);

  // Save layout when changed
  const handleLayoutChange = (newLayout: Layout[]) => {
    setLayout(newLayout);
    localStorage.setItem("layout", JSON.stringify(newLayout));
  };

  // Add a new block
  const handleAdd = () => {
    const newUrl = prompt("Enter a new URL:");
    if (!newUrl) return;

    const newUrls = [...urls, newUrl];
    const index = newUrls.length - 1;

    const newLayoutItem: Layout = {
      i: newUrl,
      x: (index % 2) * 2,
      y: Math.floor(index / 2),
      w: 2,
      h: 2,
    };

    const newLayout = [...layout, newLayoutItem].sort(
      (a, b) => a.y - b.y || a.x - b.x
    );

    setUrls(newUrls);
    setLayout(newLayout);

    localStorage.setItem("urls", JSON.stringify(newUrls));
    localStorage.setItem("layout", JSON.stringify(newLayout));
  };

  // Remove a block
  const handleRemove = (url: string) => {
    const newUrls = urls.filter((u) => u !== url);
    const newLayout = layout.filter((item) => item.i !== url);

    setUrls(newUrls);
    setLayout(newLayout);

    localStorage.setItem("urls", JSON.stringify(newUrls));
    localStorage.setItem("layout", JSON.stringify(newLayout));
  };

  return (
    <div className="p-2 w-full">
      <div className="text-red-500 mb-2">
        If You are not able to access any added url, please contact to
        janardanpandey0510@gmail.com
      </div>

      {/* Add Button (top-right corner) */}
      <div className="flex justify-end mb-2">
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-3 py-1 rounded shadow hover:bg-blue-600"
        >
          ➕ Add URL
        </button>
      </div>

      <ResponsiveGridLayout
        className="layout"
        layout={layout}
        cols={4}
        rowHeight={250}
        onLayoutChange={handleLayoutChange}
        draggableHandle=".drag-handle"
        isBounded={false}
        autoSize={true}
        compactType={"vertical"} // keep gaps, no auto compact >> "horizontal", "vertical", null
      >
        {urls.map((url, index) => (
          <div
            key={url}
            className="bg-white shadow-md rounded-lg overflow-hidden relative"
          >
            <div className="flex items-center justify-between bg-gray-200 px-2 py-1 text-xs gap-2">
              <div className="drag-handle cursor-move flex-1">URL: {url}</div>

              {/* Open in fullscreen */}
              <button
                onClick={() => setFullscreenUrl(url)}
                className="text-blue-500 font-bold hover:text-blue-700"
                title="Open fullscreen"
              >
                🔳
              </button>

              {/* Open in new tab */}
              <button
                onClick={() => window.open(url, "_blank")}
                className="text-green-500 font-bold hover:text-green-700"
                title="Open in new tab"
              >
                ↗️
              </button>

              {/* Remove */}
              <button
                onClick={() => handleRemove(url)}
                className="text-red-500 font-bold hover:text-red-700"
                title="Remove"
              >
                ✕
              </button>
            </div>
            <iframe
              src={url}
              title={`URL Tab ${index + 1}`}
              className="w-full h-full border-0"
            />
          </div>
        ))}
      </ResponsiveGridLayout>

      {/* Fullscreen Modal */}
      {fullscreenUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] h-[90%] rounded-lg shadow-lg relative flex flex-col">
            <div className="flex justify-between items-center bg-gray-800 text-white px-3 py-2">
              <span>{fullscreenUrl}</span>
              <button
                onClick={() => setFullscreenUrl(null)}
                className="text-red-400 hover:text-red-600 font-bold"
              >
                ✕
              </button>
            </div>
            <iframe
              src={fullscreenUrl}
              title="Fullscreen View"
              className="flex-1 border-0"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiURLTab;
