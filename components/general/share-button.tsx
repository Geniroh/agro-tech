"use client";
import { Copy, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { toast, Toaster } from "sonner";

interface ShareButtonProps {
  type?: "external" | "internal";
  link: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  type = "internal",
  link,
}) => {
  let url: string;
  if (type === "internal") {
    url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/${link}`;
  } else {
    url = link;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(
      () => {
        toast.success("Copied to clipboard");
      },
      (err) => {
        toast.error("Failed to copy");
      }
    );
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <button className="flex items-center text-xs">
            <span className="p-2 rounded-full hover:bg-[#f2f2f2] flex justify-center items-center">
              <Share size={13} />
            </span>
            <span>Share</span>
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to view this.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input id="link" defaultValue={url} readOnly />
            </div>
            <Button
              type="submit"
              size="sm"
              className="px-3 transition-all duration-1000"
              onClick={handleCopy}
            >
              <span className="sr-only">Copy</span>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
