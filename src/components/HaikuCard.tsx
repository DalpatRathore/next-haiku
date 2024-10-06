"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { EditIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { deleteHaiku } from "@/actions/haikus/deleteHaiku";
import toast from "react-hot-toast";
import { CldImage } from "next-cloudinary";
import SpinnerSvg from "./SpinnerSvg";

// Type for Haiku (Replace ObjectId with string for client-side compatibility)
export type Haiku = {
  _id: string; // Use string instead of ObjectId
  line1: string;
  line2: string;
  line3: string;
  photoId?: string;
  createdAt: Date;
  updatedAt: Date;
};

type HaikuCardProps = {
  haikus: Haiku[]; // Change to Haiku[] for an array of haikus
};

const HaikuCard = ({ haikus }: HaikuCardProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  const [haikuList, setHaikuList] = useState<Haiku[]>(haikus);

  const handleDelete = async (haikuId: string) => {
    const haikuToDelete = haikuList.find(haiku => haiku._id === haikuId); // Find the haiku to delete

    if (!haikuToDelete) return; // If haiku doesn't exist, do nothing

    // Optimistically update the UI
    setHaikuList(prev => prev.filter(haiku => haiku._id !== haikuId));

    try {
      const success = await deleteHaiku(haikuId); // Call the API to delete the haiku
      if (success) {
        toast.success("Haiku deleted successfully!");
      } else {
        // Revert optimistic update
        setHaikuList(prev => [...prev, haikuToDelete]); // Add back the full haiku object
        toast.error("Failed to delete haiku.");
      }
    } catch (error) {
      console.error("Failed to delete haiku:", error);
      setHaikuList(prev => [...prev, haikuToDelete]); // Add back the full haiku object
      toast.error("Failed to delete haiku.");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-7xl mx-auto px-5 w-full">
      {haikuList.map((haiku, index) => (
        <Card
          key={haiku._id}
          card={haiku}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default HaikuCard;

const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
    onDelete,
  }: {
    card: Haiku;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
    onDelete: (haikuId: string) => void;
  }) => {
    return (
      <div
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        className={cn(
          "relative bg-gray-100 dark:bg-neutral-900 overflow-hidden transition-all duration-300 max-w-2xl mx-auto ease-out rounded-md",
          hovered !== null && hovered !== index && "blur-sm scale-[0.98]",
          "w-full h-auto aspect-[4/3] md:aspect-[4/3] lg:aspect-[4/3]" // Keep the aspect ratio
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-black/50 py-4 px-4 transition-opacity duration-300 flex flex-col items-start justify-center gap-5",
            hovered === index ? "opacity-100" : "opacity-80"
          )}
        >
          <CldImage
            className="absolute inset-0 z-10"
            fillBackground
            overlays={[
              {
                position: {
                  x: 50,
                  y: 450,
                  angle: -12,
                  gravity: "north_west",
                },
                text: {
                  color: "black",
                  fontFamily: "Source sans Pro",
                  fontSize: 72,
                  fontWeight: "bold",
                  text: `${card.line1}%0A${card.line2}%0a${card.line3}`,
                },
              },
              {
                position: {
                  x: 50,
                  y: 450,
                  angle: -12,
                  gravity: "north_west",
                },
                text: {
                  color: "white",
                  fontFamily: "Source sans Pro",
                  fontSize: 72,
                  fontWeight: "bold",
                  text: `${card.line1}%0A${card.line2}%0a${card.line3}`,
                },
              },
            ]}
            crop={{
              type: "pad",
              source: true,
            }}
            width="1000"
            height="750"
            src={card.photoId ? card.photoId : "fallback"}
            sizes="100vw"
            alt="haiku"
          />

          <div className="flex items-center justify-center w-full">
            <SpinnerSvg></SpinnerSvg>
          </div>
          <div className="flex items-center justify-end gap-2 z-50 absolute bottom-5 right-5">
            <Button asChild size={"icon"} variant={"default"}>
              <Link href={`/edit-haiku/${card._id}`}>
                <EditIcon className="w-4 h-4"></EditIcon>
              </Link>
            </Button>
            <Button
              size={"icon"}
              variant={"destructive"}
              onClick={() => onDelete(card._id)}
            >
              <Trash2Icon className="w-4 h-4"></Trash2Icon>
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

Card.displayName = "Card";
