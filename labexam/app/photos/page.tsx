"use client";

import axios from "axios";
import { useEffect, useState } from "react";

type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export default function AllPhotos() {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    async function getPhotos() {
      const response = await axios.get<Photo[]>(
        "https://jsonplaceholder.typicode.com/photos?_limit=24",
      );
      setPhotos(response.data);
    }

    getPhotos();
  }, []);

  return (
    <main className="mx-auto p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold">All photos</h1>
        <p className="text-zinc-500">Collection</p>
      </header>

      <div className="flex flex-wrap gap-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="w-72 overflow-hidden rounded-lg border border-zinc-200"
          >
            <img
              src={photo.url}
              alt={photo.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <p className="text-sm text-zinc-500">Album {photo.albumId}</p>
              <h2 className="font-medium">{photo.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
