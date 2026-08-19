import { useState } from "react";
import type { SubmitEvent } from "react";
import { deleteMenuItem, updateMenuItem } from "../api";

interface MenuItemProps {
  id: number;
  name: string;
  price: number;
  description: string;
  isLoggedIn: boolean;
  onDeleted: () => void | Promise<void>;
}

const MenuItem = ({
  id,
  name,
  price,
  description,
  isLoggedIn,
  onDeleted,
}: MenuItemProps) => {
  const [menuItem, setMenuItem] = useState({
    name,
    price,
    description,
  });

  const [editedName, setEditedName] = useState(name);
  const [editedPrice, setEditedPrice] = useState(price.toString());
  const [editedDescription, setEditedDescription] = useState(description);

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleEdit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSaving(true);
    setError("");

    const updatedItem = {
      name: editedName.trim(),
      price: Number(editedPrice),
      description: editedDescription.trim(),
    };

    if (!updatedItem.name) {
      setError("Name is required");
      setIsSaving(false);
      return;
    }

    if (Number.isNaN(updatedItem.price) || updatedItem.price < 0) {
      setError("Please enter a valid price");
      setIsSaving(false);
      return;
    }

    if (!updatedItem.description) {
      setError("Description is required");
      setIsSaving(false);
      return;
    }

    try {
      const savedItem = await updateMenuItem(id, updatedItem);
      setMenuItem({
        name: savedItem.name,
        price: savedItem.price,
        description: savedItem.description,
      });
      setEditedName(savedItem.name);
      setEditedPrice(savedItem.price.toString());
      setEditedDescription(savedItem.description);

      setIsEditing(false);
    } catch (error) {
      setError("Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  const cancelEdit = () => {
    setEditedName(menuItem.name);
    setEditedPrice(menuItem.price.toString());
    setEditedDescription(menuItem.description);
    setError("");
    setIsEditing(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setError("");
    try {
      await deleteMenuItem(id);
      await onDeleted();
    } catch (error) {
      setError("Failed to delete item");
      setIsDeleting(false);
    }
  };

  return (
    <div className="w-full max-w-96 text-wrap rounded-lg border border-gray-300 bg-white p-4 shadow-sm">
      {isEditing ? (
        <form onSubmit={handleEdit} className="flex flex-col gap-3">
          <input
            type="text"
            value={editedName}
            onChange={(event) => setEditedName(event.target.value)}
            aria-label="Item name"
            required
            className="rounded border border-gray-300 px-3 py-2"
          />

          <input
            type="number"
            value={editedPrice}
            onChange={(event) => setEditedPrice(event.target.value)}
            aria-label="Price"
            min="0"
            step="0.01"
            required
            className="rounded border border-gray-300 px-3 py-2"
          />

          <textarea
            value={editedDescription}
            onChange={(event) => setEditedDescription(event.target.value)}
            aria-label="Description"
            required
            className="rounded border border-gray-300 px-3 py-2"
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isSaving}
              className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save"}
            </button>

            <button
              type="button"
              onClick={cancelEdit}
              disabled={isSaving}
              className="rounded bg-gray-500 px-4 py-2 text-white disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{menuItem.name}</h3>

            <span className="font-medium text-gray-600">
              ${menuItem.price.toFixed(2)}
            </span>
          </div>

          <p className="mt-2 text-left text-gray-600">{menuItem.description}</p>

          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

          {isLoggedIn && (
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setError("");
                  setIsEditing(true);
                }}
                disabled={isDeleting}
                className="ml-auto rounded-lg bg-[var(--theme-primary)] px-4 py-2 font-medium text-[var(--theme-primary-foreground)] transition hover:bg-[var(--theme-primary-hover)] focus:ring-2"
              >
                Change
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="rounded bg-red-500 px-4 py-2 text-white disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MenuItem;
