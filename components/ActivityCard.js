import { useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import Link from "next/link";
import styled from "styled-components";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ActivityCard({
  id,
  title,
  imageSource,
  categories,
  onActivityUpdated,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const [formTitle, setFormTitle] = useState(title);
  const [formCategories, setFormCategories] = useState(
    categories.map((c) => c._id)
  );

  const [error, setError] = useState("");

  const { data: allCategories } = useSWR("/api/categories", fetcher);

  async function handleSave(e) {
    e.preventDefault();
    setError("");

    const trimmedTitle = formTitle.trim();

    if (!trimmedTitle) {
      setError("Title is required");
      return;
    }

    if (!formCategories || formCategories.length === 0) {
      setError("Please select at least one category");
      return;
    }

    const response = await fetch(`/api/activities/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: trimmedTitle,
        categories: formCategories,
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
    setFormCategories(categories.map((c) => c._id));
    setError("");
  }

  return (
    <Card>
      <Title>{title}</Title>
      <Link href={`/activities/${id}`}>
        <StyledImage src={imageSource} alt={title} width={1200} height={900} />
      </Link>

      <CategoryList>
      {categories.map((category) => (
        
        <CategoryTag key={category._id}>{category.name}</CategoryTag>
        
      ))}
      </CategoryList>

      {!isEditing && (
        <ButtonRow>
        <EditButton type="button" onClick={() => setIsEditing(true)}>
          Edit
        </EditButton>
        </ButtonRow>
      )}

      {isEditing && (
        <EditSection>
          <h3>Edit Activity</h3>

          {error && <p>{error}</p>}

          <form onSubmit={handleSave}>
            <label>
              Title
              <input
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
              />
            </label>

            <label>
              Categories
              <CheckboxWrapper>
                {allCategories?.map((cat) => (
                  <label
                    key={cat._id}
                    style={{ display: "block", cursor: "pointer" }}
                  >
                    <input
                      type="checkbox"
                      name="categories"
                      value={cat._id}
                      checked={formCategories.includes(cat._id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormCategories([...formCategories, cat._id]);
                        } else {
                          setFormCategories(
                            formCategories.filter((id) => id !== cat._id)
                          );
                        }
                      }}
                    />
                    {cat.name}
                  </label>
                ))}
              </CheckboxWrapper>
            </label>
          <ButtonRow>
            <SaveButton type="submit">Save</SaveButton>
            <CancelButton type="button" onClick={handleCancel}>
              Cancel
            </CancelButton>
            </ButtonRow>
          </form>
        </EditSection>
      )}
    </Card>
  );
}

const StyledImage = styled(Image)`
  width: 100% !important;
  height: auto !important;
  object-fit: cover;
  border-radius: 8px;
  max-width: 500px;
`;

const Card = styled.div`
  background: #ffffff;
  padding: 1.8rem;
  border-radius: 16px;
  margin-bottom: 2rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  border-top: 8px solid #7abfbf;
  max-width: 600px;
  margin: 0 auto 2rem;
`;

const Title = styled.h2`
  color: #1e1226;
  text-align: center;
  font-size: 1.6rem;
  margin-bottom: 1rem;
`;

const CategoryList = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin: 1rem 0 1.5rem;
`;

const CategoryTag = styled.span`
  background: #d8f2e6;
  color: #44a66e;
  padding: 0.4rem 0.7rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  border: 1px solid #7abfbf;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-top: 1.5rem;
`;

const EditButton = styled.button`
  background: #7abfbf;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;

  &:hover {
    background: #5fa9a9;
  }
`;

const SaveButton = styled.button`
  background: #44a66e;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;

  &:hover {
    background: #368757;
  }
`;

const CancelButton = styled.button`
  background: #bf9f63;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;

  &:hover {
    background: #a8854f;
  }
`;

const ErrorMsg = styled.p`
  color: red;
  font-weight: bold;
`;

const EditSection = styled.div`
  margin-top: 1rem;

  h3 {
    color: #1e1226;
    margin-bottom: 0.5rem;
  }
`;

const Input = styled.input`
  display: block;
  width: 100%;
  margin-top: 0.4rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #7abfbf;
`;

const CheckboxWrapper = styled.div`
  background: #d8f2e6;
  padding: 0.8rem;
  border-radius: 12px;
  margin: 0.5rem 0 1rem;
  border: 1px solid #7abfbf;
`;
