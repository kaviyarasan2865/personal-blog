"use client";

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import TiptapEditor with no SSR to prevent React Context errors
const TiptapEditor = dynamic(() => import('./TiptapEditor'), {
  ssr: false,
  loading: () => (
    <div className="border rounded-lg overflow-hidden min-h-[400px] bg-gray-50 animate-pulse">
      <div className="h-12 border-b border-gray-200 bg-white" />
      <div className="p-4" />
    </div>
  ),
});

interface EditorWrapperProps {
  onContentChange: (content: string) => void;
  initialContent?: string;
}

export default function EditorWrapper({ onContentChange, initialContent }: EditorWrapperProps) {
  return <TiptapEditor onContentChange={onContentChange} initialContent={initialContent} />;
}
