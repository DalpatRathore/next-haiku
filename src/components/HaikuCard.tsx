"use client";
import Image from "next/image";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { EditIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { deleteHaiku } from "@/actions/haikus/deleteHaiku";
import toast from "react-hot-toast";

// Type for Haiku (Replace ObjectId with string for client-side compatibility)
export type Haiku = {
  _id: string; // Use string instead of ObjectId
  line1: string;
  line2: string;
  line3: string;
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-8 max-w-7xl mx-auto px-8 w-full">
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
          "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-80 sm:h-96 w-full max-w-xl mx-auto transition-all duration-300 ease-out",
          hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
        )}
      >
        <Image
          src="/aspect-ratio.png"
          alt=""
          fill
          className="object-cover absolute inset-0"
        />
        <div
          className={cn(
            "absolute inset-0 bg-black/50 py-8 px-4 transition-opacity duration-300 flex flex-col items-start justify-center gap-10",
            hovered === index ? "opacity-100" : "opacity-80"
          )}
        >
          <div className="text-lg md:text-xl lg:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200 -rotate-12 flex-1 flex flex-col items-start justify-center">
            <p className="font-bold text-xl md:text-2xl">{card.line1}</p>
            <p className="font-bold text-xl md:text-2xl">{card.line2}</p>
            <p className="font-bold text-xl md:text-2xl">{card.line3}</p>
          </div>
          <div className=""></div>
          <div className="w-full flex items-center justify-end gap-2">
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
