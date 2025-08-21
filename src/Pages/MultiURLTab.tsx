import React, { useEffect, useState } from "react";
import GridLayout, { Layout, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(GridLayout);

const MultiURLTab: React.FC = () => {
  const [urls, setUrls] = useState<string[]>([]);
  const [layout, setLayout] = useState<Layout[]>([]);

  // Load URLs + Layout from localStorage
  useEffect(() => {
    const storedURLs = JSON.parse(localStorage.getItem("urls") || "[]");
    const storedLayout = JSON.parse(localStorage.getItem("layout") || "[]");

    if (storedURLs.length > 0) setUrls(storedURLs);

    if (storedLayout.length > 0) {
      setLayout(storedLayout);
    } else {
      // Default layout (2 columns per row)
      const defaultLayout = storedURLs.map((url: string, i: number) => ({
        i: url.toString(),
        x: i % 2,
        y: Math.floor(i / 2),
        w: 1,
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
    const newLayout = [
      ...layout,
      {
        i: newUrl,
        x: (newUrls.length - 1) % 2,
        y: Math.floor((newUrls.length - 1) / 2),
        w: 1,
        h: 2,
      },
    ];

    setUrls(newUrls);
    setLayout(newLayout);

    localStorage.setItem("urls", JSON.stringify(newUrls));
    localStorage.setItem("layout", JSON.stringify(newLayout));
  };

    // Remove a block
  const handleRemove = (index: number) => {
    const newUrls = urls.filter((_, i) => i !== index);
    const newLayout = layout.filter((item) => item.i !== index.toString());

    // Re-index layout after removal
    const reIndexedLayout = newUrls.map((url, i) => ({
      i: url,
      x: i % 2,
      y: Math.floor(i / 2),
      w: 1,
      h: 2,
    }));

    setUrls(newUrls);
    setLayout(reIndexedLayout);

    localStorage.setItem("urls", JSON.stringify(newUrls));
    localStorage.setItem("layout", JSON.stringify(reIndexedLayout));
  };
  return (
    <div className="p-2 w-full">
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
        cols={2}              // 2 columns
        rowHeight={250}       // row height
        onLayoutChange={handleLayoutChange}
        draggableHandle=".drag-handle"
        isBounded={false}      // prevent dragging outside
        autoSize={true}       // auto adjust height
      >
        {urls.map((url, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden relative"
          >
            <div className="flex items-center justify-between bg-gray-200 px-2  py-1 text-xs">
              <div className="drag-handle cursor-move w-full">URL: {url}</div>
              <button
                onClick={() => handleRemove(index)}
                className="text-red-500 font-bold hover:text-red-700"
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
    </div>
  );
};

export default MultiURLTab;
