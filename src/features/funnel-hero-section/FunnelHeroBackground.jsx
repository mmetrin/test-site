import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import heroVideo from '../../assets/funnel-journey/hero/hero-background.mp4'
import backdropVideo from '../../assets/funnel-journey/hero/hero-background-backdrop.mp4'
import heroPoster from '../../assets/funnel-journey/hero/hero-background-poster.jpg'
import staticBackground from '../../../img-bg.jpg'

const motionQuery = '(prefers-reduced-motion: reduce)'
const backdropQuery = '(min-width: 1921px) and (prefers-reduced-motion: no-preference)'
const subscribe = (query, callback) => {
  const media = window.matchMedia(query)
  media.addEventListener('change', callback)
  return () => media.removeEventListener('change', callback)
}
const subscribeMotion = (callback) => subscribe(motionQuery, callback)
const subscribeBackdrop = (callback) => subscribe(backdropQuery, callback)
const getReducedMotion = () => window.matchMedia(motionQuery).matches
const getBackdrop = () => window.matchMedia(backdropQuery).matches
const getServerMotion = () => true
const getServerBackdrop = () => false

export function FunnelHeroBackground() {
  const reducedMotion = useSyncExternalStore(subscribeMotion, getReducedMotion, getServerMotion)
  const showBackdrop = useSyncExternalStore(subscribeBackdrop, getBackdrop, getServerBackdrop)
  const mainVideoRef = useRef(null)
  const backdropVideoRef = useRef(null)
  const [isVideoActive, setIsVideoActive] = useState(false)

  useEffect(() => {
    const mainVideo = mainVideoRef.current
    const backdropVideoElement = backdropVideoRef.current

    if (!mainVideo || reducedMotion) {
      setIsVideoActive(false)
      return undefined
    }

    const showStaticFallback = () => {
      setIsVideoActive(false)
      backdropVideoElement?.pause()
    }

    const handlePlaying = () => {
      setIsVideoActive(true)
      backdropVideoElement?.play().catch(() => {})
    }

    const tryToPlay = () => {
      mainVideo.play().catch(showStaticFallback)
    }

    mainVideo.addEventListener('canplay', tryToPlay)
    mainVideo.addEventListener('playing', handlePlaying)
    mainVideo.addEventListener('pause', showStaticFallback)
    mainVideo.addEventListener('error', showStaticFallback)

    if (mainVideo.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      tryToPlay()
    }

    return () => {
      mainVideo.removeEventListener('canplay', tryToPlay)
      mainVideo.removeEventListener('playing', handlePlaying)
      mainVideo.removeEventListener('pause', showStaticFallback)
      mainVideo.removeEventListener('error', showStaticFallback)
      backdropVideoElement?.pause()
    }
  }, [reducedMotion])

  return (
    <div className={`funnel-hero__backdrop${isVideoActive ? ' funnel-hero__backdrop--video-ready' : ''}`} aria-hidden="true">
      {/* Keep the static frame visible until the main video has actually started. */}
      <img className="funnel-hero__static-background" src={staticBackground} alt="" />

      {/* 1. Ambient layer fills the space outside the main video stage. */}
      <img className="funnel-hero__ambient" src={heroPoster} alt="" />
      {showBackdrop && (
        <video
          className="funnel-hero__ambient"
          src={backdropVideo}
          poster={heroPoster}
          muted
          defaultMuted
          loop
          playsInline
          preload="metadata"
          ref={backdropVideoRef}
        />
      )}

      {/* 2. Main video layer is rotated and clipped to the centered stage. */}
      <div className="funnel-hero__video-frame">
        <div className="funnel-hero__video-align">
          <img className="funnel-hero__background-video" src={heroPoster} alt="" />
          {!reducedMotion && (
            <video
              className="funnel-hero__background-video"
              src={heroVideo}
              poster={heroPoster}
              autoPlay
              muted
              defaultMuted
              loop
              playsInline
              preload="metadata"
              ref={mainVideoRef}
            />
          )}
        </div>
      </div>

      {/* 3. Readability layer darkens the video below the content. */}
      <div className="funnel-hero__background">
        <span className="funnel-hero__left-edge-blur" />
        <span className="funnel-hero__bottom-right-blur" />
      </div>
    </div>
  )
}
