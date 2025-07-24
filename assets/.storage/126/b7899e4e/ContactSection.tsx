import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { 
  StorytellingBackground,
  FloatingElement
} from "../ui/StorytellingBackground";

// Use EnhancedContactSection from the file we created
import EnhancedContactSection from "./EnhancedContactSection";

export default function ContactSection() {
  // We're using the enhanced version instead
  return <EnhancedContactSection />;
}