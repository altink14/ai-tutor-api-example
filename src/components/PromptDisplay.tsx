// src/components/StoryDisplay.tsx
"use client";
import { marked } from "marked";
import { useState, useEffect } from "react";

interface StoryDisplayProps {
  result: {
    result?: string;
    success?: boolean;
  };
}

export default function StoryDisplay({ result }: StoryDisplayProps) {
  const [formattedResult, setFormattedResult] = useState("");

  useEffect(() => {
    if (result && result.result) {
      const parser = new marked.Parser();
      const lexer = new marked.Lexer();

      try {
        const tokens = lexer.lex(result.result);
        const htmlContent = parser.parse(tokens);
        setFormattedResult(htmlContent);
      } catch (error) {
        console.error("Error parsing markdown:", error);
        setFormattedResult("Error formatting the story.");
      }
    }
  }, [result]);

  // Function to copy the original markdown text to the clipboard.
  const handleCopy = () => {
    if (result?.result) {
      navigator.clipboard
        .writeText(result.result)
        .then(() => {
          // Provide feedback to the user that the text has been copied.
          alert("Story copied to clipboard!");
        })
        .catch((error) => {
          console.error("Failed to copy text:", error);
        });
    }
  };

  return (
    <div className="glass-morphism p-8 rounded-xl shadow-xl backdrop-blur-lg bg-white/30">
      <button
        onClick={handleCopy}
        className="mb-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Copy Prompt
      </button>
      <div
        className="story-content prose prose-lg max-w-none"
        style={{ color: "#4B5563", lineHeight: "1.8" }}
        dangerouslySetInnerHTML={{ __html: formattedResult }}
      />
    </div>
  );
}