"use client";

import { addProject, uploadImage } from "@/utils/serverActions.ut";
import React, { useState } from "react";
import Header from "./ui/Header";
import { ProjectCategories } from "@/constants/defaultState";

const AddProjectPageComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    heroImage: null,
    overview: "",
    challenge: "",
    photos: [],
    details: [],
    url: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      if (name === "heroImage") {
        setFormData((prev: any) => ({ ...prev, heroImage: files[0] }));
      } else if (name === "photos") {
        setFormData((prev: any) => ({ ...prev, photos: Array.from(files) }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const heroImageUrl = formData.heroImage
        ? await uploadImage(formData.heroImage)
        : null;
      const photoUrls = await Promise.all(formData.photos.map(uploadImage));

      const response = await addProject({
        ...formData,
        heroImage: heroImageUrl,
        photos: photoUrls,
      });

      if (response) {
        alert("Project added successfully!");
        setFormData({
          name: "",
          heroImage: null,
          overview: "",
          challenge: "",
          photos: [],
          details: [],
          url: "",
          category: "",
        });
        window.location.href = "/project";
      } else {
        alert("Failed to add project.");
      }
    } catch (error) {
      console.error("Error adding project:", error);
      alert("An error occurred while adding the project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col p-10 gap-8 w-full min-h-screen">
      <Header text="Add Project" />
      <form
        className="flex flex-col gap-6 w-full p-6 justify-center"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-3">
          <label className="font-medium text-xl" htmlFor="name">
            Name:
          </label>
          <input
            className="border border-light-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-secondary-100/80"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="font-medium text-xl" htmlFor="heroImage">
            Hero Image:
          </label>
          <input
            className="border border-light-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-secondary-100/80"
            type="file"
            id="heroImage"
            name="heroImage"
            onChange={handleFileChange}
            accept="image/*"
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="font-medium text-xl" htmlFor="overview">
            Overview:
          </label>
          <textarea
            className="border border-light-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-secondary-100/80"
            id="overview"
            name="overview"
            value={formData.overview}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="font-medium text-xl" htmlFor="challenge">
            Challenge:
          </label>
          <textarea
            className="border border-light-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-secondary-100/80"
            id="challenge"
            name="challenge"
            value={formData.challenge}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="font-medium text-xl" htmlFor="photos">
            Photos:
          </label>
          <input
            className="border border-light-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-secondary-100/80"
            type="file"
            id="photos"
            name="photos"
            multiple
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="font-medium text-xl">Project Details:</label>
          {formData.details.map((detail, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                className="flex-1 border border-light-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-secondary-100/80"
                type="text"
                value={detail}
                onChange={(e) => {
                  const updatedDetails: any = [...formData.details];
                  updatedDetails[index] = e.target.value;
                  setFormData((prev: any) => ({
                    ...prev,
                    details: updatedDetails,
                  }));
                }}
              />
              <button
                type="button"
                onClick={() => {
                  const updatedDetails = formData.details.filter(
                    (_, i) => i !== index
                  );
                  setFormData((prev: any) => ({
                    ...prev,
                    details: updatedDetails,
                  }));
                }}
                className="text-light-300 border-light-300 border rounded-full h-8 w-8 justify-center items-center flex hover:cursor-pointer hover:border-secondary-200 hover:text-secondary-200 transition-all duration-200"
              >
                -
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setFormData((prev: any) => ({
                ...prev,
                details: [...prev.details, ""],
              }))
            }
            className="mt-2 px-4 py-1 bg-secondary-200 text-white rounded hover:bg-secondary-200/80 transition-all w-fit hover:cursor-pointer"
          >
            + Add Detail
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <label className="font-medium text-xl" htmlFor="url">
            URL:
          </label>
          <input
            className="border border-light-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-secondary-100/80"
            type="url"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="font-medium text-xl" htmlFor="category">
            Category:
          </label>
          <select
            className="border border-light-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-secondary-100/80 flex hover:cursor-pointer"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="" disabled className="bg-brand-300">
              Select a category
            </option>
            {ProjectCategories.map((category) => (
              <option
                key={category.label}
                value={category.value}
                className="hover:cursor-pointer bg-brand-300 hover:bg-secondary-100/80"
              >
                {category.label}
              </option>
            ))}
          </select>
        </div>
        <button
          disabled={loading}
          className="bg-secondary-100 py-2 px-4 rounded-md hover:bg-secondary-100/80 flex justify-center hover:cursor-pointer"
          type="submit"
        >
          {loading ? (
            <span className="loader"></span> // Add your loader styling here
          ) : (
            "Add Project"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProjectPageComponent;
