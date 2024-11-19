"use client";

import { ImageUploader } from "@/components/image-uploader";
import { ModeToggle } from "@/components/mode-toggle";
import { ScanText } from "lucide-react";
import { cn } from "@/lib/utils";
import { RainbowButton } from "@/components/ui/rainbow-button";
import SparklesText from "@/components/ui/sparkles-text";
import Image from "next/image";
import AvatarImg from "../public/avatar.jpg";
import Link from "next/link";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";

export default function Home() {
  return (
    <>
      <nav className="border-b">
        <div className="container flex h-16 items-center px-4">
          <div className="flex items-center space-x-2">
            <ScanText className="h-6 w-6" />
            <span className="text-lg font-bold">OCR Text Extractor</span>
          </div>

          <div className="flex-1 flex justify-center ">
            <Link
              href="https://linktr.ee/Ahsan_Khalid"
              target="_blank"
              rel="noopener noreferrer"
            >
              <RainbowButton className="flex justify-around h-[2.2rem] dark:bg-slate-800">
                <Image
                  className="h-auto rounded-full"
                  src={AvatarImg}
                  alt="Profile image"
                  width={28}
                  height={28}
                  aria-hidden="true"
                />
                <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
                <span
                  className={cn(
                    `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
                  )}
                >
                  @Ahsan_Khalid
                </span>
              </RainbowButton>
            </Link>
          </div>
          <div className="ml-auto">
            <ModeToggle />
          </div>
        </div>
      </nav>

      <HeroHighlight>
        <div className="container px-4 py-8">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
              <SparklesText
                className="text-4xl"
                text="Extract Text from Images"
              />
              <motion.p
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: [20, -5, 0],
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.4, 0.0, 0.2, 1],
                }}
                className="mt-4 text-muted-foreground"
              >
                Upload an image and we&apos;ll extract the text for you. You can
                then convert it to 
                <br/>
                <Highlight className="text-black dark:text-white">
                speech, download as PDF, or export to Google Docs
                </Highlight>
                .
              </motion.p>
            </div>

            <ImageUploader />
          </div>
        </div>
      </HeroHighlight>
    </>
  );
}
