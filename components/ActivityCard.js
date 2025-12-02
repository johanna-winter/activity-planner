import { useState } from "react";
import Image from "next/image";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function ActivityCard({
  id,
  title,
  imageSource,
  categories,
  onActivityUpdated,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const [formTitle, setFormTitle] = useState(title);
  const [formCategory, setFormCategory] = useState(
    categories[0]?._id || ""
  );

  const [error, setError] = useState("");

  const { data: allCategories } = useSWR("/api/categories", fetcher);

  async function handleSave(e) {
    e.preventDefault();
    setError("");

    if (!formTitle.trim()) {
      setError("Title is required");
      return;
    }

    if (!formCategory) {
      setError("Please select a category");
      return;
    }

    const response = await fetch(`/api/activities/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formTitle.trim(),
        categories: [formCategory],
      }),
    });

    if (!response.ok) {
      setError("Failed to update activity");
      return;
    }

    const updated = await response.json();
    onActivityUpdated(updated);
    setIsEditing(false);
  }

  function handleCancel() {
    setIsEditing(false);
    setFormTitle(title);
    setFormCategory(categories[0]?._id || "");
    setError("");
  }

  if (!isEditing) {
    return (
      <div>
        <p>{title}</p>
        <Image src={imageSource} alt={title} width={240} height={330} />
        {categories.map(c => (
          <p key={c._id}>{c.name}</p>
        ))}

        <button onClick={() => setIsEditing(true)}>Edit</button>
      </div>
    );
  }

  return (
    <div>
      <h3>Edit Activity</h3>

      {error && <p>{error}</p>}

      <form onSubmit={handleSave}>
        <label>
          Title
          <input
            value={formTitle}
            onChange={e => setFormTitle(e.target.value)}
          />
        </label>

        <label>
          Category
          <select
            value={formCategory}
            onChange={e => setFormCategory(e.target.value)}
          >
            <option value="">Please select a category</option>

            {allCategories?.map(cat => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Save</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}
