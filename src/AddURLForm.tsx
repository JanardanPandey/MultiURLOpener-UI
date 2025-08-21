import { useEffect, useState } from "react";

const AddURLForm: React.FC = () => {
  const [storedURLs, setStoredURLs] = useState<string[]>([]);
  const onSubmit = (event: React.FormEvent) => {
  event.preventDefault();
  const formData = new FormData(event.target as HTMLFormElement);
  const urls = formData.get("url") as string;

  if (!urls) return;

  const newURLs = urls
    .split(",")
    .map((url) => url.trim())
    .filter((url) => url && !storedURLs.includes(url));

  if (newURLs.length > 0) {
    setStoredURLs((prev) => {
      const updated = [...prev, ...newURLs];
      localStorage.setItem("urls", JSON.stringify(updated));
      return updated;
    });
  }
};
  const validateCommonSeparatedURL = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const isValid = /^https?:\/\/[^\s]+$/.test(value);
    if (!isValid) {
      console.error("Invalid URL format");
    }
    else{
      console.log("Valid URL format");
    }
  };
  useEffect(() => {
    const storedLocalURLs = JSON.parse(localStorage.getItem("urls") || "[]");
    if (storedLocalURLs.length > 0) {
      console.log("Stored URLs:", storedLocalURLs);
      setStoredURLs([])
      storedLocalURLs.forEach((url:string) => {
        setStoredURLs((prev) => [...prev, url]);
      });
    }
  }, []);
  const removeURL = (url: string) => {
    setStoredURLs((prev) => prev.filter((item) => item !== url));
    localStorage.setItem("urls", JSON.stringify(storedURLs.filter((item) => item !== url).join(",") ));
  };
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Added URL</h1>
      <ul>
        {storedURLs.map((url, index) => (
          <div className="flex items-center justify-between" key={index}><li>{url}</li> <button className="text-red-500" onClick={() => removeURL(url)}>Remove</button></div>
        ))}
      </ul>
      <h2>Add URL</h2>
      <form onSubmit={(e) => onSubmit(e)}>
        <input type="text" name="url" onChange={validateCommonSeparatedURL} placeholder="Enter URL" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddURLForm;
