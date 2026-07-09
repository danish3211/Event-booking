import { useEffect, useRef, useState } from 'react'
import { Plus, Camera, Upload, X, ChevronLeft, ChevronRight, CircleUserRound } from 'lucide-react'

interface StoryItem {
  id: string
  username: string
  avatar: string
  media: string
  viewed: boolean
  isUser?: boolean
}

export function StorySection() {
  const [currentUser, setCurrentUser] = useState<{ name: string; avatar: string } | null>(null)
  
  // Pre-loaded artist stories with high-quality concert-themed images
  const [stories, setStories] = useState<StoryItem[]>([
    {
      id: '1',
      username: 'Shakira',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      media: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=1400&fit=crop',
      viewed: false
    },
    {
      id: '2',
      username: 'Calvin Harris',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      media: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=1400&fit=crop',
      viewed: false
    },
    {
      id: '3',
      username: 'Karan Aujla',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
      media: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=1400&fit=crop',
      viewed: false
    },
    {
      id: '4',
      username: 'Aditya Gadhvi',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
      media: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=1400&fit=crop',
      viewed: false
    }
  ])

  // State for active user stories (persisted in session/local storage for realistic feel)
  const [userStory, setUserStory] = useState<string | null>(null)
  const [userStoryViewed, setUserStoryViewed] = useState<boolean>(false)

  // Modal and Camera States
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [cameraError, setCameraError] = useState<string | null>(null)

  // Story Viewer States
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null) // null means viewer is closed
  const [storyProgress, setStoryProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Refs for video capture
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // Fetch logged in user info
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser))
    }
    
    // Check if user has uploaded a story in this session
    const savedStory = sessionStorage.getItem('user_story')
    if (savedStory) {
      setUserStory(savedStory)
      const savedStoryViewed = sessionStorage.getItem('user_story_viewed')
      setUserStoryViewed(savedStoryViewed === 'true')
    }
  }, [])

  // Auto-advance story timer
  useEffect(() => {
    if (activeStoryIndex === null || isPaused) return

    const interval = setInterval(() => {
      setStoryProgress((prev) => {
        if (prev >= 100) {
          // Go to next story
          handleNextStory()
          return 0
        }
        return prev + 2 // Auto advance logic: ticks every 100ms, 100ms * 50 ticks = 5 seconds
      })
    }, 100)

    return () => clearInterval(interval)
  }, [activeStoryIndex, isPaused])

  // Cleanup camera stream
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    setIsCameraActive(false)
  }

  // Camera start handler
  const startCamera = async () => {
    setCameraError(null)
    setIsCameraActive(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 640, height: 480 },
        audio: false
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err: any) {
      console.error('Error accessing camera:', err)
      setCameraError('Could not access camera. Please make sure camera permissions are granted.')
      setIsCameraActive(false)
    }
  }

  // Capture photo from video feed
  const capturePhoto = () => {
    if (videoRef.current) {
      const video = videoRef.current
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      
      const ctx = canvas.getContext('2d')
      if (ctx) {
        // Flip canvas horizontally to feel like a mirror selfie
        ctx.translate(canvas.width, 0)
        ctx.scale(-1, 1)
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        
        const dataUrl = canvas.toDataURL('image/jpeg')
        setPreviewImage(dataUrl)
        stopCamera()
      }
    }
  }

  // Handle device file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreviewImage(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Publish user story
  const publishStory = () => {
    if (previewImage) {
      setUserStory(previewImage)
      setUserStoryViewed(false)
      sessionStorage.setItem('user_story', previewImage)
      sessionStorage.setItem('user_story_viewed', 'false')
      setPreviewImage(null)
      setIsUploadModalOpen(false)
    }
  }

  // Get list of all visible stories (User story first if it exists, followed by artists)
  const getAllStoriesList = (): StoryItem[] => {
    const list: StoryItem[] = []
    if (userStory) {
      list.push({
        id: 'user',
        username: currentUser?.name || 'Your Story',
        avatar: currentUser?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=guest',
        media: userStory,
        viewed: userStoryViewed,
        isUser: true
      })
    }
    return [...list, ...stories]
  }

  const activeStories = getAllStoriesList()

  // Navigation inside story viewer
  const handlePrevStory = () => {
    if (activeStoryIndex === null) return
    setStoryProgress(0)
    if (activeStoryIndex > 0) {
      setActiveStoryIndex(activeStoryIndex - 1)
    } else {
      // Wrap or close
      setActiveStoryIndex(null)
    }
  }

  const handleNextStory = () => {
    if (activeStoryIndex === null) return
    setStoryProgress(0)
    
    // Mark current story as viewed
    const currentStory = activeStories[activeStoryIndex]
    if (currentStory.isUser) {
      setUserStoryViewed(true)
      sessionStorage.setItem('user_story_viewed', 'true')
    } else {
      setStories(prev => prev.map(s => s.id === currentStory.id ? { ...s, viewed: true } : s))
    }

    if (activeStoryIndex < activeStories.length - 1) {
      setActiveStoryIndex(activeStoryIndex + 1)
    } else {
      // End of stories
      setActiveStoryIndex(null)
    }
  }

  const handleOpenStoryViewer = (index: number) => {
    setStoryProgress(0)
    setActiveStoryIndex(index)
  }

  return (
    <div className="py-6">
      {/* Title */}
      <div className="mb-6">
        <p className="text-3xl font-bold text-white flex items-center gap-2">
          Hot Right Now 🔥
        </p>
        <p className="text-gray-400 mt-2">Grab your tickets before they sold out</p>
      </div>

      {/* Stories list container */}
      <div className="flex items-center gap-6 overflow-x-auto py-2 no-scrollbar">
        {/* User Story Card */}
        <div className="flex flex-col items-center flex-shrink-0 relative">
          <div className="relative group">
            <button
              onClick={() => {
                if (userStory) {
                  // View existing user story
                  handleOpenStoryViewer(0)
                } else {
                  // Trigger upload modal
                  setIsUploadModalOpen(true)
                }
              }}
              className={`w-20 h-20 rounded-full flex items-center justify-center p-[3px] transition-transform duration-300 group-hover:scale-105 ${
                userStory
                  ? userStoryViewed
                    ? 'border-2 border-white/20'
                    : 'bg-linear-to-tr from-primary to-vivid p-[3px]'
                  : 'border-2 border-dashed border-white/30 hover:border-white/50'
              }`}
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-secondary border-2 border-black flex items-center justify-center">
                {currentUser?.avatar ? (
                  <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                ) : (
                  <CircleUserRound className="w-10 h-10 text-white/50" />
                )}
              </div>
            </button>

            {/* Plus Button Overlay */}
            <button
              onClick={(e) => {
                e.stopPropagation() // Prevent triggering the viewer if clicked directly
                setIsUploadModalOpen(true)
              }}
              className="absolute bottom-0 right-0 bg-primary hover:bg-vivid text-white w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#141414] hover:scale-110 transition-all cursor-pointer shadow-lg"
              title="Add Story"
            >
              <Plus size={14} className="stroke-[3]" />
            </button>
          </div>
          <span className="text-sm font-medium mt-2 text-white/70">Your Story</span>
        </div>

        {/* Artist Stories */}
        {stories.map((artist, idx) => {
          // Calculate active index inside the combined list
          const combinedIndex = userStory ? idx + 1 : idx
          return (
            <div key={artist.id} className="flex flex-col items-center flex-shrink-0">
              <button
                onClick={() => handleOpenStoryViewer(combinedIndex)}
                className={`w-20 h-20 rounded-full flex items-center justify-center p-[3px] transition-transform duration-300 hover:scale-105 ${
                  artist.viewed
                    ? 'border-2 border-white/20'
                    : 'bg-linear-to-tr from-primary to-vivid'
                }`}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-secondary border-2 border-[#141414]">
                  <img src={artist.avatar} alt={artist.username} className="w-full h-full object-cover" />
                </div>
              </button>
              <span className="text-sm font-medium mt-2 text-white/70 truncate w-20 text-center">
                {artist.username}
              </span>
            </div>
          )
        })}
      </div>

      {/* ========================================================
          UPLOAD OPTIONS / CAMERA MODAL
         ======================================================== */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="bg-[#1e172a] border border-white/10 rounded-[2.5rem] p-6 max-w-md w-full relative shadow-2xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => {
                stopCamera()
                setPreviewImage(null)
                setIsUploadModalOpen(false)
              }}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all cursor-pointer"
            >
              <X size={18} />
            </button>

            {!isCameraActive && !previewImage && (
              <div className="text-center pt-4 pb-2">
                <h3 className="text-2xl font-bold text-white mb-2">Create a Story</h3>
                <p className="text-white/60 mb-8 text-sm">Share your moments or highlight events you're attending</p>

                <div className="grid grid-cols-2 gap-4">
                  {/* Upload from Device */}
                  <label className="flex flex-col items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 p-6 rounded-3xl cursor-pointer transition-all hover:scale-[1.02]">
                    <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                      <Upload size={22} />
                    </div>
                    <span className="text-sm font-semibold text-white">Upload File</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  {/* Take a Picture */}
                  <button
                    onClick={startCamera}
                    className="flex flex-col items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 p-6 rounded-3xl cursor-pointer transition-all hover:scale-[1.02]"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-vivid/20 flex items-center justify-center text-vivid">
                      <Camera size={22} />
                    </div>
                    <span className="text-sm font-semibold text-white">Use Camera</span>
                  </button>
                </div>
              </div>
            )}

            {/* Live Camera Stream */}
            {isCameraActive && (
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Camera size={20} className="text-primary animate-pulse" /> Take a Photo
                </h3>
                <div className="w-full relative rounded-2xl overflow-hidden aspect-[3/4] bg-black shadow-inner">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover scale-x-[-1]" // mirror effect
                  />
                  <div className="absolute inset-0 border border-white/10 pointer-events-none rounded-2xl" />
                </div>

                {cameraError && (
                  <p className="text-red-400 text-xs mt-3 text-center px-4">{cameraError}</p>
                )}

                <div className="flex gap-4 mt-6 w-full">
                  <button
                    onClick={() => {
                      stopCamera()
                    }}
                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-2xl text-white font-medium transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={capturePhoto}
                    className="flex-1 py-3 bg-primary hover:bg-vivid text-white font-bold rounded-2xl transition-all shadow-lg active:scale-95"
                  >
                    Capture
                  </button>
                </div>
              </div>
            )}

            {/* Image Preview & Publish */}
            {previewImage && (
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-bold text-white mb-4">Preview Story</h3>
                <div className="w-full rounded-2xl overflow-hidden aspect-[3/4] bg-black relative border border-white/10 shadow-lg">
                  <img src={previewImage} alt="Story preview" className="w-full h-full object-cover" />
                </div>
                
                <div className="flex gap-4 mt-6 w-full">
                  <button
                    onClick={() => {
                      setPreviewImage(null)
                      if (isCameraActive) {
                        startCamera()
                      }
                    }}
                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-2xl text-white font-medium transition-all"
                  >
                    Retake
                  </button>
                  <button
                    onClick={publishStory}
                    className="flex-1 py-3 bg-gradient-to-r from-primary to-vivid text-white font-bold rounded-2xl transition-all shadow-lg active:scale-95"
                  >
                    Publish
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          FULL SCREEN STORY VIEWER MODAL
         ======================================================== */}
      {activeStoryIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-lg">
          
          {/* Close button (top right of screen) */}
          <button
            onClick={() => setActiveStoryIndex(null)}
            className="absolute top-6 right-6 z-55 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            title="Close"
          >
            <X size={20} />
          </button>

          {/* Desktop Left navigation arrow */}
          {activeStoryIndex > 0 && (
            <button
              onClick={handlePrevStory}
              className="absolute left-6 z-55 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Story Card Frame (Aspect 9:16) */}
          <div 
            className="relative w-full max-w-[420px] h-[92vh] md:h-[85vh] bg-black shadow-2xl rounded-3xl overflow-hidden flex flex-col justify-between"
            onMouseDown={() => setIsPaused(true)}
            onMouseUp={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            {/* Story Image */}
            <img
              src={activeStories[activeStoryIndex].media}
              alt={`${activeStories[activeStoryIndex].username}'s story`}
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
            />

            {/* Content overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 pointer-events-none z-10" />

            {/* TOP BAR: Progress indicator and Username */}
            <div className="relative z-20 p-4 pt-5">
              {/* Progress bars segment */}
              <div className="flex gap-1.5 w-full mb-4">
                {activeStories.map((_, idx) => {
                  let progressVal = 0
                  if (idx < activeStoryIndex) progressVal = 100
                  if (idx === activeStoryIndex) progressVal = storyProgress
                  
                  return (
                    <div key={idx} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-white transition-all ease-linear duration-100" 
                        style={{ width: `${progressVal}%` }}
                      />
                    </div>
                  )
                })}
              </div>

              {/* User Avatar + Username */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden">
                  <img src={activeStories[activeStoryIndex].avatar} alt="" className="w-full h-full object-cover" />
                </div>
                <span className="font-semibold text-white tracking-wide drop-shadow-md">
                  {activeStories[activeStoryIndex].username}
                </span>
                <span className="text-white/50 text-xs drop-shadow-md">Active Now</span>
              </div>
            </div>

            {/* Tap areas for mobile navigation (hidden on desktop hover) */}
            <div className="absolute inset-0 flex z-15">
              <div 
                className="w-1/3 h-full cursor-w-resize" 
                onClick={(e) => {
                  e.stopPropagation()
                  handlePrevStory()
                }}
              />
              <div className="w-1/3 h-full" /> {/* Middle part is neutral/pause */}
              <div 
                className="w-1/3 h-full cursor-e-resize" 
                onClick={(e) => {
                  e.stopPropagation()
                  handleNextStory()
                }}
              />
            </div>

            {/* Bottom Caption bar */}
            <div className="relative z-20 p-6 text-center select-none">
              <span className="text-sm font-medium tracking-wide text-white/90 drop-shadow-md">
                {activeStories[activeStoryIndex].isUser ? "You uploaded a story" : `Watching ${activeStories[activeStoryIndex].username}'s story`}
              </span>
            </div>
          </div>

          {/* Desktop Right navigation arrow */}
          {activeStoryIndex < activeStories.length - 1 && (
            <button
              onClick={handleNextStory}
              className="absolute right-6 z-55 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
