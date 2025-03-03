"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Github, Code, Star, Gitlab, Laugh } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-3 rounded-full border border-border bg-background/50 backdrop-blur-sm mb-6"
      >
        <span className="flex gap-1 text-xs font-medium">
          Introducing GetGit <Gitlab className="size-4" />
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl"
      >
        A New Way to{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-600">
          Compete
        </span>{" "}
        and{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-white">
          Collaborate
        </span>{" "}
        on GitHub
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-lg md:text-xl text-gray-400 max-w-2xl mt-4"
      >
        Transform your coding experience into exciting challenges. Compare
        skills, track progress, and build your developer reputation.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-8"
      >
        <Link href={"/battle"}>
          <Button className="mt-5 h-12 text-base bg-orange/10 backdrop-blur-md text-white border border-white/20 hover:bg-orange/20 hover:cursor-pointer transition-all duration-500 hover:scale-105">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="flex flex-col md:flex-row items-center justify-center gap-8 mt-12"
      >
        <div className="p-6 md:p-8 flex flex-col items-center shadow-md">
          <div className="bg-primary/10 p-3 rounded-full mb-4 hover:scale-105">
            <Link href={"/tournament"}>
              <Code className="h-6 w-6 text-primary" />
            </Link>
          </div>
          <h3 className="text-lg font-semibold">Tournaments</h3>
          <p className="text-sm text-muted-foreground">
            Connected and analyzed
          </p>
        </div>

        <div className="p-6 md:p-8 flex flex-col items-center shadow-md">
          <div className="bg-primary/10 p-3 rounded-full mb-4 hover:scale-105">
            <Link href={"/roast"}>
              <Laugh className="h-6 w-6 text-primary" />
            </Link>
          </div>
          <h3 className="text-lg font-semibold">Roast</h3>
          <p className="text-sm text-muted-foreground">Roast GitHub Profiles</p>
        </div>

        <div className="p-6 md:p-8 flex flex-col items-center shadow-md">
          <div className="bg-primary/10 p-3 rounded-full mb-4 hover:scale-105">
            <Link href={"/insights"}>
              <Star className="h-6 w-6 text-primary" />
            </Link>
          </div>
          <h3 className="text-lg font-semibold">Developer</h3>
          <p className="text-sm text-muted-foreground">Get Profile Insights</p>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
