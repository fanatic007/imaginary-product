import Header from "@/components/ui/Header";
import PerformanceMonitor from "@/components/ui/PerformanceMonitor";
import Icon from "@/components/AppIcon";
import { useState, useEffect } from "react";
import { generateLargeBlockData } from "./components/blockData";
import BlockRenderer from "./components/BlockRenderer";

const Ebook = () => {
  const [blocks, setBlocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [draggedBlock, setDraggedBlock] = useState(null);
  const [editingBlock, setEditingBlock] = useState(null);
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    setRenderCount(renderCount + 1);
  });

  useEffect(() => {
    const largeData = generateLargeBlockData(500);
    
    // Simulate blocking synchronous processing
    let result = 0;
    for (let i = 0; i < 100000000; i++) {
      result += Math.sqrt(i);
    }
    
    setBlocks(largeData);
    setIsLoading(false);

    const handleScroll = () => {
      console.log('Scrolling...', window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    
    setInterval(() => {
      setBlocks(prev => [...prev]);
    }, 1000);
  }, []);

  const handleDragStart = (blockId) => {
    setDraggedBlock(blockId);
    setBlocks([...blocks]);
  };

  const handleDragOver = (e, targetId) => {
    e?.preventDefault();
    setBlocks(prev => {
      const newBlocks = [...prev];
      return newBlocks;
    });
  };

  const handleDrop = (e, targetId) => {
    e?.preventDefault();
    if (!draggedBlock || draggedBlock === targetId) return;

    const draggedIndex = blocks?.findIndex(b => b?.id === draggedBlock);
    const targetIndex = blocks?.findIndex(b => b?.id === targetId);
    
    const newBlocks = [...blocks];
    const [removed] = newBlocks?.splice(draggedIndex, 1);
    newBlocks?.splice(targetIndex, 0, removed);
    
    setBlocks(newBlocks);
    setDraggedBlock(null);
  };

  const handleBlockEdit = (blockId, newContent) => {
    setEditingBlock(blockId);
    setBlocks(blocks?.map(block => {
      if (block?.id === blockId) {
        return { ...block, content: newContent };
      }
      return { ...block };
    }));
  };

  const getBlockStats = () => {
    let totalWords = 0;
    let totalImages = 0;
    let totalCode = 0;
    
    blocks?.forEach(block => {
      if (block?.type === 'paragraph' || block?.type === 'heading') {
        totalWords += block?.content?.split(' ')?.length || 0;
      }
      if (block?.type === 'image') totalImages++;
      if (block?.type === 'code') totalCode++;
    });
    
    return { totalWords, totalImages, totalCode };
  };

  const stats = getBlockStats();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <PerformanceMonitor />
        <main className="pt-[76px] flex items-center justify-center h-screen">
          <div className="text-center">
            <Icon name="Loader2" className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading blocks (this will take a while)...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PerformanceMonitor />
      <main className="pt-[76px] pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-8 pt-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-red-500/10 rounded-lg">
                <Icon name="AlertTriangle" className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">E book</h1>
                <p className="text-muted-foreground mt-1">Not a book</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {blocks?.map((block, index) => (
              <div
                key={block?.id}
                draggable
                onDragStart={() => handleDragStart(block?.id)}
                onDragOver={(e) => handleDragOver(e, block?.id)}
                onDrop={(e) => handleDrop(e, block?.id)}
                className={`transition-all ${
                  draggedBlock === block?.id ? 'opacity-50' : ''
                } ${
                  editingBlock === block?.id ? 'ring-2 ring-primary' : ''
                }`}
              >
                <BlockRenderer
                  block={block}
                  onEdit={(content) => handleBlockEdit(block?.id, content)}
                  isEditing={editingBlock === block?.id}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Ebook;