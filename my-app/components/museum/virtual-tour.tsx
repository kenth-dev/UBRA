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
    <section id="tour" className="py-24 gradient-museum-dark text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-primary mb-4">Immersive Experience</p>
          <h2 className="font-serif text-4xl md:text-5xl font-medium mb-4">Virtual Museum Tour</h2>
          <p className="text-secondary-foreground/80 max-w-2xl mx-auto">
            Take a guided tour through our digital galleries. Experience the crafts up close with narration by cultural
            experts.
          </p>
        </div>

        {/* Main Tour Preview with Video */}
        <div className="relative mb-12">
          <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl relative">
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
                  className="w-24 h-24 bg-background rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform group"
                >
                  <Play className="h-10 w-10 text-secondary ml-1 group-hover:text-primary transition-colors" />
                </button>
                <div className="absolute bottom-32 left-1/2 -translate-x-1/2 text-center">
                  <p className="text-secondary-foreground/90 text-lg font-medium">Watch the Tour Video</p>
                  <p className="text-secondary-foreground/60 text-sm">Duration: {tourStops[currentStop].duration}</p>
                </div>
              </div>
            )}

            {/* Navigation Arrows */}
            <button
              onClick={handlePrevStop}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-background/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background/40 transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-secondary-foreground" />
            </button>
            <button
              onClick={handleNextStop}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-background/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background/40 transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-secondary-foreground" />
            </button>

            {/* Tour controls */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-secondary/90 to-transparent z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-secondary-foreground">{tourStops[currentStop].name}</h3>
                  <p className="text-secondary-foreground/70">{tourStops[currentStop].description}</p>
                </div>
                <div className="flex items-center gap-3">
                  {isPlaying && (
                    <button
                      onClick={handlePlayPause}
                      className="p-3 bg-background/20 rounded-full hover:bg-background/30 transition-colors"
                    >
                      <Pause className="h-5 w-5 text-secondary-foreground" />
                    </button>
                  )}
                  <button
                    onClick={handleMuteToggle}
                    className="p-3 bg-background/20 rounded-full hover:bg-background/30 transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="h-5 w-5 text-secondary-foreground" />
                    ) : (
                      <Volume2 className="h-5 w-5 text-secondary-foreground" />
                    )}
                  </button>
                  <button className="p-3 bg-background/20 rounded-full hover:bg-background/30 transition-colors">
                    <Compass className="h-5 w-5 text-secondary-foreground" />
                  </button>
                  <button className="p-3 bg-background/20 rounded-full hover:bg-background/30 transition-colors">
                    <Maximize2 className="h-5 w-5 text-secondary-foreground" />
                  </button>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-4 flex gap-2">
                {tourStops.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleStopChange(index)}
                    className="flex-1 h-1.5 rounded-full overflow-hidden bg-secondary-foreground/30"
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {tourStops.map((stop, index) => (
            <button
              key={stop.id}
              onClick={() => handleStopChange(index)}
              className={`relative rounded-xl overflow-hidden transition-all group ${
                index === currentStop ? "ring-2 ring-primary scale-[1.02]" : "opacity-70 hover:opacity-100"
              }`}
            >
              <div className="aspect-video">
                <img
                  src={stop.image || "/placeholder.svg"}
                  alt={stop.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent flex flex-col justify-end p-3">
                <span className="text-sm font-medium text-secondary-foreground">{stop.name}</span>
                <span className="text-xs text-secondary-foreground/60">{stop.duration}</span>
              </div>
              <div className="absolute top-2 left-2 w-6 h-6 bg-background rounded-full flex items-center justify-center text-xs font-medium text-secondary">
                {index + 1}
              </div>
              {stop.hasVideo && (
                <div className="absolute top-2 right-2 px-2 py-1 bg-primary/90 rounded text-xs text-primary-foreground font-medium">
                  Video
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Gallery Preview Section */}
        <div className="mb-12">
          <h3 className="font-serif text-2xl text-center mb-8">Gallery Highlights</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {galleryImages.map((image) => (
              <div key={image.id} className="group relative rounded-lg overflow-hidden cursor-pointer">
                <div className="aspect-square">
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <span className="text-xs text-secondary-foreground font-medium">{image.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Start Full Tour Experience
          </Button>
          <p className="text-sm text-secondary-foreground/60 mt-3">
            Full tour includes 12 galleries with expert narration
          </p>
        </div>
      </div>
    </section>
  )
}
