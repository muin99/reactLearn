"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export default function PhotoDetails() {
  const { id } = useParams<{ id: string }>();
  const [photo, setPhoto] = useState<Photo | null>(null);

  async function getPhoto() {
    const response = await axios.get<Photo>(
      `https://jsonplaceholder.typicode.com/photos/${id}`,
    );
    setPhoto(response.data);
  }

  getPhoto();

  if (!photo) {
    return <p className="p-8">Loading...</p>;
  }

  return (
    <main className="mx-auto p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold">Photo {photo.id}</h1>
        <p className="text-zinc-500">Album {photo.albumId}</p>
      </header>

      <article className="w-72 rounded-lg border border-zinc-200">
        <img
          src={photo.url}
          alt={photo.title}
          className="h-48 w-full object-cover"
        />
        <div className="p-4">
          <h2 className="font-medium">{photo.title}</h2>
        </div>
      </article>
    </main>
  );
}
