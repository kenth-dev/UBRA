"use client"

import { useState, useRef } from "react"
import { Play, Pause, Compass, Volume2, VolumeX, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const tourStops = [
  {
    id: 1,
    name: "Entrance Hall",
    description: "Begin your journey through Filipino heritage",
    image: "/images/museum/grand-museum-entrance-hall-with-filipino-cultural-.jpg",
    video: "https://videos.pexels.com/video-files/3015510/3015510-uhd_2560_1440_24fps.mp4",
    hasVideo: true,
    duration: "3:45",
  },
  {
    id: 2,
    name: "Weaving Gallery",
    description: "Explore centuries of textile traditions from Cordillera to Mindanao",
    image: "/images/museum/traditional-filipino-abaca-weaving-loom-artisan-ha.jpg",
    video: "https://videos.pexels.com/video-files/3252128/3252128-uhd_2560_1440_25fps.mp4",
    hasVideo: true,
    duration: "5:20",
  },
  {
    id: 3,
    name: "Pottery Collection",
    description: "Ancient Manunggul jars to contemporary ceramic masterpieces",
    image: "/images/museum/museum-exhibition-of-traditional-filipino-pottery-.jpg",
    video: "https://videos.pexels.com/video-files/3044435/3044435-uhd_2560_1440_24fps.mp4",
    hasVideo: true,
    duration: "4:15",
  },
  {
    id: 4,
    name: "Woodcarving Workshop",
    description: "Watch master carvers create Ifugao bulul and intricate santos",
    image: "/images/museum/filipino-artisan-woodcarving-workshop-traditional-.jpg",
    video: "https://videos.pexels.com/video-files/5710619/5710619-uhd_2560_1440_25fps.mp4",
    hasVideo: true,
    duration: "6:30",
  },
]

const galleryImages = [
  {
    id: 1,
    src: "/images/museum/close-up-intricate-filipino-tinalak-weaving-patter.jpg",
    alt: "T'nalak Dream Cloth Detail",
    caption: "T'boli Dream Weaving",
  },
  {
    id: 2,
    src: "/images/museum/hands-of-elderly-filipino-woman-weaving-traditiona.jpg",
    alt: "Artisan hands weaving basket",
    caption: "Master Basket Weaver",
  },
  {
    id: 3,
    src: "/images/museum/kulintang-brass-gong-set-mindanao-traditional-musi.jpg",
    alt: "Kulintang instruments",
    caption: "Mindanao Musical Heritage",
  },
  {
    id: 4,
    src: "/images/museum/carved-wooden-santos-religious-figure-filipino-col.jpg",
    alt: "Carved Santos figure",
    caption: "Colonial Era Santos",
  },
  {
    id: 5,
    src: "/images/museum/colorful-filipino-banig-woven-mat-traditional-patt.jpg",
    alt: "Banig woven mat",
    caption: "Samar Banig Weaving",
  },
  {
    id: 6,
    src: "/images/museum/traditional-filipino-bolo-knife-with-ornate-handle.jpg",
    alt: "Traditional bolo knife",
    caption: "Panday Metalwork",
  },
]

export function VirtualTour() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [currentStop, setCurrentStop] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
        setShowVideo(true)
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleStopChange = (index: number) => {
    setCurrentStop(index)
    setIsPlaying(false)
    setShowVideo(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  const handlePrevStop = () => {
    const newIndex = currentStop === 0 ? tourStops.length - 1 : currentStop - 1
    handleStopChange(newIndex)
  }

  const handleNextStop = () => {
    const newIndex = currentStop === tourStops.length - 1 ? 0 : currentStop + 1
    handleStopChange(newIndex)
  }

  return (
    <section id="tour" className="py-12 sm:py-16 md:py-20 lg:py-24 gradient-museum-dark text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <p className="text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] text-primary mb-2 sm:mb-3 md:mb-4">Immersive Experience</p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-3 sm:mb-4">Virtual Museum Tour</h2>
          <p className="text-xs sm:text-sm md:text-base text-secondary-foreground/80 max-w-2xl mx-auto px-4">
            Take a guided tour through our digital galleries. Experience the crafts up close with narration by cultural
            experts.
          </p>
        </div>

        {/* Main Tour Preview with Video */}
        <div className="relative mb-6 sm:mb-8 md:mb-12">
          <div className="aspect-video rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl relative">
            {/* Background Image */}
            <img
              src={tourStops[currentStop].image || "/placeholder.svg"}
              alt={tourStops[currentStop].name}
              className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-500 ${showVideo ? "opacity-0" : "opacity-100"}`}
            />

            {/* Video Element */}
            {tourStops[currentStop].hasVideo && (
              <video
                ref={videoRef}
                src={tourStops[currentStop].video}
                className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-500 ${showVideo ? "opacity-100" : "opacity-0"}`}
                muted={isMuted}
                loop
                playsInline
                onEnded={() => setIsPlaying(false)}
              />
            )}

            {/* Play overlay */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-secondary/40 z-10">
                <button
                  onClick={handlePlayPause}
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-background rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform group"
                >
                  <Play className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-secondary ml-1 group-hover:text-primary transition-colors" />
                </button>
                <div className="absolute bottom-20 sm:bottom-24 md:bottom-32 left-1/2 -translate-x-1/2 text-center px-4">
                  <p className="text-secondary-foreground/90 text-sm sm:text-base md:text-lg font-medium">Watch the Tour Video</p>
                  <p className="text-secondary-foreground/60 text-xs sm:text-sm">Duration: {tourStops[currentStop].duration}</p>
                </div>
              </div>
            )}

            {/* Navigation Arrows */}
            <button
              onClick={handlePrevStop}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-background/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background/40 transition-colors"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-secondary-foreground" />
            </button>
            <button
              onClick={handleNextStop}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-background/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background/40 transition-colors"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-secondary-foreground" />
            </button>

            {/* Tour controls */}
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 bg-gradient-to-t from-secondary/90 to-transparent z-10">
              <div className="flex items-center justify-between gap-2 sm:gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-base sm:text-lg md:text-xl lg:text-2xl text-secondary-foreground truncate">{tourStops[currentStop].name}</h3>
                  <p className="text-xs sm:text-sm text-secondary-foreground/70 truncate">{tourStops[currentStop].description}</p>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-shrink-0">
                  {isPlaying && (
                    <button
                      onClick={handlePlayPause}
                      className="p-2 sm:p-2.5 md:p-3 bg-background/20 rounded-full hover:bg-background/30 transition-colors"
                    >
                      <Pause className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-secondary-foreground" />
                    </button>
                  )}
                  <button
                    onClick={handleMuteToggle}
                    className="p-2 sm:p-2.5 md:p-3 bg-background/20 rounded-full hover:bg-background/30 transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-secondary-foreground" />
                    ) : (
                      <Volume2 className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-secondary-foreground" />
                    )}
                  </button>
                  <button className="p-2 sm:p-2.5 md:p-3 bg-background/20 rounded-full hover:bg-background/30 transition-colors hidden sm:flex">
                    <Compass className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-secondary-foreground" />
                  </button>
                  <button className="p-2 sm:p-2.5 md:p-3 bg-background/20 rounded-full hover:bg-background/30 transition-colors hidden sm:flex">
                    <Maximize2 className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-secondary-foreground" />
                  </button>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-2 sm:mt-3 md:mt-4 flex gap-1 sm:gap-1.5 md:gap-2">
                {tourStops.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleStopChange(index)}
                    className="flex-1 h-1 sm:h-1.5 rounded-full overflow-hidden bg-secondary-foreground/30"
                  >
                    <div
                      className={`h-full bg-primary transition-all duration-300 ${
                        index <= currentStop ? "w-full" : "w-0"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tour Stops with Real Images */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-12 md:mb-16">
          {tourStops.map((stop, index) => (
            <button
              key={stop.id}
              onClick={() => handleStopChange(index)}
              className={`relative rounded-lg sm:rounded-xl overflow-hidden transition-all group ${
                index === currentStop ? "ring-1 sm:ring-2 ring-primary scale-[1.02]" : "opacity-70 hover:opacity-100"
              }`}
            >
              <div className="aspect-video">
                <img
                  src={stop.image || "/placeholder.svg"}
                  alt={stop.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent flex flex-col justify-end p-2 sm:p-3">
                <span className="text-xs sm:text-sm font-medium text-secondary-foreground line-clamp-1">{stop.name}</span>
                <span className="text-xs text-secondary-foreground/60">{stop.duration}</span>
              </div>
              <div className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-background rounded-full flex items-center justify-center text-xs font-medium text-secondary">
                {index + 1}
              </div>
              {stop.hasVideo && (
                <div className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-primary/90 rounded text-xs text-primary-foreground font-medium">
                  Video
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Gallery Preview Section */}
        <div className="mb-6 sm:mb-8 md:mb-12">
          <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-center mb-4 sm:mb-6 md:mb-8">Gallery Highlights</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
            {galleryImages.map((image) => (
              <div key={image.id} className="group relative rounded-md sm:rounded-lg overflow-hidden cursor-pointer">
                <div className="aspect-square">
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 sm:p-3">
                  <span className="text-xs text-secondary-foreground font-medium line-clamp-2">{image.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm sm:text-base">
            Start Full Tour Experience
          </Button>
          <p className="text-xs sm:text-sm text-secondary-foreground/60 mt-2 sm:mt-3">
            Full tour includes 12 galleries with expert narration
          </p>
        </div>
      </div>
    </section>
  )
}
