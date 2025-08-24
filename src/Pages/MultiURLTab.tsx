// import React, { useEffect, useState } from "react";
// import GridLayout, { WidthProvider } from "react-grid-layout";
// import type { Layout } from "react-grid-layout";
// import "react-grid-layout/css/styles.css";
// import "react-resizable/css/styles.css";

// const ResponsiveGridLayout = WidthProvider(GridLayout);

// const MultiURLTab: React.FC = () => {
//   const [urls, setUrls] = useState<string[]>([]);
//   const [layout, setLayout] = useState<Layout[]>([]);

//   // Load URLs + Layout from localStorage
//   useEffect(() => {
//     const storedURLs = JSON.parse(localStorage.getItem("urls") || "[]");
//     const storedLayout = JSON.parse(localStorage.getItem("layout") || "[]");

//     if (storedURLs.length > 0) setUrls(storedURLs);

//     if (storedLayout.length > 0) {
//       setLayout(storedLayout);
//     } else {
//       // Default layout (2 columns per row)
//       const defaultLayout = storedURLs.map((url: string, index: number) => ({
//         i: url.toString(),
//         x: index % 2,
//         y: Math.floor(index / 2),
//         w: 1,
//         h: 2,
//       }));
//       setLayout(defaultLayout);
//     }
//   }, []);

//   // Save layout when changed
//   const handleLayoutChange = (newLayout: Layout[]) => {
//     setLayout(newLayout);
//     localStorage.setItem("layout", JSON.stringify(newLayout));
//   };

//   // Add a new block
//   const handleAdd = () => {
//     const newUrl = prompt("Enter a new URL:");
//     if (!newUrl) return;

//     const newUrls = [...urls, newUrl];
//     const newLayout = [
//       ...layout,
//       {
//         i: newUrl,
//         x: (newUrls.length - 1) % 2,
//         y: Math.floor((newUrls.length - 1) / 2),
//         w: 1,
//         h: 2,
//       },
//     ];

//     setUrls(newUrls);
//     setLayout(newLayout);

//     localStorage.setItem("urls", JSON.stringify(newUrls));
//     localStorage.setItem("layout", JSON.stringify(newLayout));
//   };

//     // Remove a block
//   // const handleRemove = (url: string) => {
//   //   const newUrls = urls.filter((u, _) => u !== url);
//   //   // const newLayout = layout.filter((item) => item.i !== index.toString());

//   //   // Re-index layout after removal
//   //   const reIndexedLayout = newUrls.map((url, index) => ({
//   //     i: url,
//   //     x: index % 2,
//   //     y: Math.floor(index / 2),
//   //     w: 1,
//   //     h: 2,
//   //   }));

//   //   setUrls(newUrls);
//   //   setLayout(reIndexedLayout);

//   //   localStorage.setItem("urls", JSON.stringify(newUrls));
//   //   localStorage.setItem("layout", JSON.stringify(reIndexedLayout));
//   // };

// // Remove a block
// const handleRemove = (url: string) => {
//   const newUrls = urls.filter((u) => u !== url);
//   const newLayout = layout.filter((item) => item.i !== url);

//   setUrls(newUrls);
//   setLayout(newLayout);

//   localStorage.setItem("urls", JSON.stringify(newUrls));
//   localStorage.setItem("layout", JSON.stringify(newLayout));
// };


//   return (
//     <div className="p-2 w-full">
//       <div className="text-red-500">If You are not able to access any added url, please contact to janardanpandey0510@gmail.com</div>
//       {/* Add Button (top-right corner) */}
//       <div className="flex justify-end mb-2">
//         <button
//           onClick={handleAdd}
//           className="bg-blue-500 text-white px-3 py-1 rounded shadow hover:bg-blue-600"
//         >
//           ➕ Add URL
//         </button>
//       </div>
//       <ResponsiveGridLayout
//         className="layout"
//         layout={layout}
//         cols={2}              // 2 columns
//         rowHeight={250}       // row height
//         onLayoutChange={handleLayoutChange}
//         draggableHandle=".drag-handle"
//         isBounded={false}      // prevent dragging outside
//         autoSize={false}       // auto adjust height
//       >
//         {urls.map((url, index) => (
//           <div
//             key={index}
//             className="bg-white shadow-md rounded-lg overflow-hidden relative"
//           >
//             <div className="flex items-center justify-between bg-gray-200 px-2  py-1 text-xs">
//               <div className="drag-handle cursor-move w-full">URL: {url}</div>
//               <button
//                 onClick={() => handleRemove(url)}
//                 className="text-red-500 font-bold hover:text-red-700"
//               >
//                 ✕
//               </button>

//             </div>
//             <iframe
//               src={url}
//               title={`URL Tab ${index + 1}`}
//               className="w-full h-full border-0"
//             />
//           </div>
//         ))}
//       </ResponsiveGridLayout>
//     </div>
//   );
// };

// export default MultiURLTab;


import React, { useEffect, useState } from "react";
import GridLayout, { WidthProvider } from "react-grid-layout";
import type { Layout } from "react-grid-layout";
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
      // Default layout in 2-column pattern
      const defaultLayout = storedURLs.map((url: string, index: number) => ({
        i: url.toString(),
        x: index % 2,
        y: Math.floor(index / 2),
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

  const index = newUrls.length - 1;

  const newLayoutItem: Layout = {
    i: newUrl,
    x: (index % 2) * 2,        // left (0) first, then right (2)
    y: Math.floor(index / 2),  // new row every 2 items
    w: 2,
    h: 2,
  };

  // Add and sort layout so left (x=0) is always before right (x=2)
  const newLayout = [...layout, newLayoutItem].sort(
    (a, b) => a.y - b.y || a.x - b.x
  );

  setUrls(newUrls);
  setLayout(newLayout);

  localStorage.setItem("urls", JSON.stringify(newUrls));
  localStorage.setItem("layout", JSON.stringify(newLayout));
};

  // Remove a block (no reset)
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
      <div className="text-red-500">
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
        cols={4}              // ✅ 4-column grid
        rowHeight={250}
        onLayoutChange={handleLayoutChange}
        draggableHandle=".drag-handle"
        isBounded={false}
        autoSize={false}
        // compactType={null} 
      >
        {urls.map((url, index) => (
          <div
            key={url} // use URL as key
            className="bg-white shadow-md rounded-lg overflow-hidden relative"
          >
            <div className="flex items-center justify-between bg-gray-200 px-2 py-1 text-xs">
              <div className="drag-handle cursor-move w-full">URL: {url}</div>
              <button
                onClick={() => handleRemove(url)}
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
