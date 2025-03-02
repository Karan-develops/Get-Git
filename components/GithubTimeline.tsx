"use client";

import { motion } from "framer-motion";
import { Radio } from "lucide-react";

interface TimelineEvent {
  date: string;
  event: string;
}

interface GitHubTimelineProps {
  events: TimelineEvent[];
}

export function GitHubTimeline({ events }: GitHubTimelineProps) {
  return (
    <div className="relative">
      {events.map((event, index) => (
        <motion.div
          key={index}
          className="mb-8 flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center">
            <Radio className="w-6 h-6 text-white" />
          </div>
          <div className="ml-4 flex-grow">
            <time className="mb-1 text-sm font-normal leading-none text-muted-foreground">
              {event.date}
            </time>
            <h3 className="text-lg font-semibold text-foreground">
              {event.event}
            </h3>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
