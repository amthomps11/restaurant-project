import { useState } from "react";
import type { SubmitEvent } from "react";
import { createMenuItem } from "../api";

interface CreateMenuItemProps {
  onCreated: () => void | Promise<void>;
}

const CreateMenuItem = ({ onCreated }: CreateMenuItemProps) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    setError("");

    const newMenuItem = {
      name: name.trim(),
      price: Number(price),
      description: description.trim(),
    };

    if (!newMenuItem.name) {
      setError("Name is required");
      setIsSubmitting(false);
      return;
    }

    if (Number.isNaN(newMenuItem.price) || newMenuItem.price < 0) {
      setError("Please enter a valid price");
      setIsSubmitting(false);
      return;
    }

    if (!newMenuItem.description) {
      setError("Description is required");
      setIsSubmitting(false);
      return;
    }

    try {
      await createMenuItem(newMenuItem);
      setName("");
      setPrice("");
      setDescription("");
      await onCreated();
    } catch (error) {
      setError("Failed to create menu item");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-96 flex-col gap-3 rounded-lg border border-gray-300 p-4 shadow-sm"
    >
      <h2 className="text-lg font-semibold">Create menu item</h2>

      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Item name"
        required
        className="rounded border border-gray-300 px-3 py-2"
      />

      <input
        type="number"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
        placeholder="Price"
        min="0"
        step="0.01"
        required
        className="rounded border border-gray-300 px-3 py-2"
      />

      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Description"
        required
        className="rounded border border-gray-300 px-3 py-2"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
      >
        {isSubmitting ? "Creating..." : "Create item"}
      </button>
    </form>
  );
};

export default CreateMenuItem;
