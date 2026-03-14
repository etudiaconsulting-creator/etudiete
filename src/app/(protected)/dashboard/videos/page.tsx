"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { YouTubeEmbed } from "@/components/ui/youtube-embed";
import { Paywall } from "@/components/paywall";
import { useAuth } from "@/components/layout/auth-provider";
import { createClient } from "@/lib/supabase/client";
import { Video, Module } from "@/types/database";
import { Play, X, ExternalLink, Search } from "lucide-react";
import Link from "next/link";

const categories = [
  { value: "", label: "Tous" },
  { value: "cours", label: "Cours" },
  { value: "methode", label: "Méthode" },
  { value: "annale", label: "Annales corrigées" },
  { value: "conseil", label: "Conseils" },
  { value: "temoignage", label: "Témoignages" },
];

const categoryLabels: Record<string, string> = {
  cours: "Cours",
  methode: "Méthode",
  annale: "Annale",
  conseil: "Conseil",
  temoignage: "Témoignage",
};

const categoryColors: Record<string, string> = {
  cours: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  methode: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  annale: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  conseil: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  temoignage: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
};

const moduleTabs = [
  { value: "", label: "Toutes" },
  { value: "E1", label: "E1" },
  { value: "E2", label: "E2" },
  { value: "E3", label: "E3" },
  { value: "E4", label: "E4" },
  { value: "E5", label: "E5" },
  { value: "general", label: "Général" },
];

export default function VideosPage() {
  const { profile } = useAuth();
  const supabase = createClient();

  const [videos, setVideos] = useState<Video[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const isFreeUser = profile?.subscription_status === "free";
  const isAdmin = profile?.role === "admin";

  useEffect(() => {
    async function fetchData() {
      try {
        const [videosRes, modulesRes] = await Promise.all([
          supabase.from("videos").select("*").order("order_index"),
          supabase.from("modules").select("*").order("order_index"),
        ]);

        if (videosRes.data) setVideos(videosRes.data as Video[]);
        if (modulesRes.data) setModules(modulesRes.data as Module[]);
      } catch (err) {
        console.error("Error fetching videos:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const getModuleCode = useCallback(
    (moduleId: string | null) => {
      if (!moduleId) return null;
      const mod = modules.find((m) => m.id === moduleId);
      return mod ? mod.code : null;
    },
    [modules]
  );

  const filteredVideos = videos.filter((video) => {
    // Module filter
    if (selectedModule === "general") {
      if (video.module_id !== null) return false;
    } else if (selectedModule) {
      const code = getModuleCode(video.module_id);
      if (code !== selectedModule) return false;
    }

    // Category filter
    if (selectedCategory && video.category !== selectedCategory) return false;

    // Search filter
    if (search && !video.title.toLowerCase().includes(search.toLowerCase())) return false;

    return true;
  });

  const isVideoLocked = (video: Video) => {
    return isFreeUser && !video.is_free && !isAdmin;
  };

  const handleCloseModal = useCallback(() => {
    setSelectedVideo(null);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseModal();
    };
    if (selectedVideo) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [selectedVideo, handleCloseModal]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-gray-400">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-medium text-gray-900 dark:text-white">
        Vidéos
      </h1>

      {/* Module tabs */}
      <div className="flex flex-wrap gap-2">
        {moduleTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setSelectedModule(tab.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedModule === tab.value
                ? "bg-emerald-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Category badges */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              selectedCategory === cat.value
                ? "bg-emerald-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher une vidéo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-10 pl-10 pr-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-colors"
        />
      </div>

      {/* Videos grid or empty state */}
      {filteredVideos.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-16 text-center">
          <Play className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
          {videos.length === 0 ? (
            <>
              <p className="text-gray-600 dark:text-gray-400 mb-2 text-lg font-medium">
                Les vidéos arrivent bientôt !
              </p>
              <p className="text-gray-500 dark:text-gray-500 mb-6 text-sm">
                En attendant, retrouve toutes nos vidéos sur YouTube.
              </p>
              <a
                href="https://www.youtube.com/@etudiet"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="inline-flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Voir la chaîne YouTube
                </Button>
              </a>
            </>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              Aucune vidéo ne correspond aux filtres sélectionnés.
            </p>
          )}
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVideos.map((video) => {
            const moduleCode = getModuleCode(video.module_id);
            return (
              <button
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className="text-left group"
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow p-0">
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-gray-100 dark:bg-gray-800">
                    <img
                      src={`https://img.youtube.com/vi/${video.youtube_video_id}/mqdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Play overlay */}
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                        <Play className="w-7 h-7 text-gray-900 ml-1" />
                      </div>
                    </div>
                    {/* Module badge */}
                    {moduleCode && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-xs font-medium bg-emerald-600 text-white">
                        {moduleCode}
                      </span>
                    )}
                    {/* Category badge */}
                    <span
                      className={`absolute top-2 right-2 px-2 py-0.5 rounded-md text-xs font-medium ${
                        categoryColors[video.category] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {categoryLabels[video.category] || video.category}
                    </span>
                    {/* Lock overlay for premium */}
                    {isVideoLocked(video) && (
                      <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Info */}
                  <div className="p-3">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                      {video.title}
                    </h3>
                    {video.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                        {video.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      {video.is_free && (
                        <Badge variant="emerald">Gratuit</Badge>
                      )}
                    </div>
                  </div>
                </Card>
              </button>
            );
          })}
        </div>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={handleCloseModal}
          />
          <div className="relative bg-white dark:bg-[#1a1c24] rounded-xl border border-gray-200 dark:border-gray-700 max-w-3xl w-full mx-auto shadow-xl max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 z-10 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 space-y-4">
              {/* Video or Paywall */}
              {isVideoLocked(selectedVideo) ? (
                <Paywall message="Cette vidéo fait partie du programme complet. Abonne-toi pour y accéder." />
              ) : (
                <YouTubeEmbed
                  videoId={selectedVideo.youtube_video_id}
                  title={selectedVideo.title}
                />
              )}

              {/* Title */}
              <h2 className="text-xl font-medium text-gray-900 dark:text-white">
                {selectedVideo.title}
              </h2>

              {/* Description */}
              {selectedVideo.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line">
                  {selectedVideo.description}
                </p>
              )}

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                {(() => {
                  const code = getModuleCode(selectedVideo.module_id);
                  if (code) {
                    return (
                      <Link href={`/dashboard/modules/${code}`}>
                        <Badge variant="emerald" className="cursor-pointer hover:opacity-80">
                          {code} — {modules.find((m) => m.id === selectedVideo.module_id)?.title}
                        </Badge>
                      </Link>
                    );
                  }
                  return null;
                })()}
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    categoryColors[selectedVideo.category] || "bg-gray-100 text-gray-700"
                  }`}
                >
                  {categoryLabels[selectedVideo.category] || selectedVideo.category}
                </span>
                {selectedVideo.is_free && (
                  <Badge variant="emerald">Gratuit</Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
