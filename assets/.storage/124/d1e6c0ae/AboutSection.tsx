import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ParallaxSection } from "../ui/ParallaxBackground";
import { 
  StorytellingBackground,
  FloatingElement
} from "../ui/StorytellingBackground";

// Use EnhancedAboutSection from Index.tsx
import EnhancedAboutSection from "./EnhancedAboutSection";

export default function AboutSection() {
  // We're using the enhanced version instead
  return <EnhancedAboutSection />;
}