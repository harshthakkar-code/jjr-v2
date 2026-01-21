import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Search, X, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { searchContent, SearchableItem } from "@/data/searchableContent";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchableItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    if (!isOpen) {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim()) {
      const searchResults = searchContent(query);
      setResults(searchResults.slice(0, 6)); // Limit to 6 results in modal
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?s=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  const handleResultClick = (href: string) => {
    navigate(href);
    onClose();
  };

  const handleViewAllResults = () => {
    if (query.trim()) {
      navigate(`/search?s=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-[60]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl mx-auto px-4 z-[60]"
          >
            <div className="bg-white rounded-2xl shadow-elevated overflow-hidden">
              {/* Search Input */}
              <form onSubmit={handleSubmit} className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for anything..."
                  className="w-full h-16 pl-14 pr-14 text-lg border-0 border-b border-border rounded-none focus-visible:ring-0"
                  aria-label="Search"
                />
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute right-5 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-secondary transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </form>

              {/* Results */}
              {query.trim() && (
                <div className="max-h-96 overflow-y-auto">
                  {results.length > 0 ? (
                    <div className="p-2">
                      {results.map((result) => (
                        <button
                          key={result.id}
                          onClick={() => handleResultClick(result.href)}
                          className="w-full flex items-start gap-4 p-4 rounded-xl hover:bg-secondary/50 transition-colors text-left"
                        >
                          {result.image ? (
                            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                              <img
                                src={result.image}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Search className="w-5 h-5 text-primary" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-medium text-primary">
                                {result.category}
                              </span>
                            </div>
                            <h4 className="font-medium text-foreground truncate">
                              {result.title}
                            </h4>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {result.description}
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                        </button>
                      ))}
                      
                      {/* View All Results */}
                      <button
                        onClick={handleViewAllResults}
                        className="w-full flex items-center justify-center gap-2 p-4 text-primary font-medium hover:bg-primary/5 rounded-xl transition-colors mt-2"
                      >
                        View all results for "{query}"
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-muted-foreground">
                        No results found for "{query}"
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Keyboard hint */}
              {!query.trim() && (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  <span className="px-2 py-1 bg-secondary rounded text-xs font-medium mr-1">
                    ESC
                  </span>
                  to close
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
