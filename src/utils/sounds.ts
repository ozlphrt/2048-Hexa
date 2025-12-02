class SoundManager {
  private mergeSound: HTMLAudioElement | null = null
  private slideSound: HTMLAudioElement | null = null
  private enabled: boolean = true

  constructor() {
    // Load sound preference from localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('hex2048-sound-enabled')
      this.enabled = stored !== null ? stored === 'true' : true
    }

    // Initialize merge sound (lock sound for merging)
    // Public folder files: in dev at /, in prod at /2048-Hexa/
    // Use base path for production (works in dev too with proper base config)
    this.mergeSound = new Audio('/2048-Hexa/mixkit-quick-lock-sound-2854.wav')
    this.mergeSound.volume = 0.3 // Keep it subtle
    this.mergeSound.preload = 'auto'
  }

  isEnabled(): boolean {
    return this.enabled
  }

  toggle(): boolean {
    this.enabled = !this.enabled
    if (typeof window !== 'undefined') {
      localStorage.setItem('hex2048-sound-enabled', this.enabled.toString())
    }
    return this.enabled
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled
    if (typeof window !== 'undefined') {
      localStorage.setItem('hex2048-sound-enabled', this.enabled.toString())
    }
  }

  playMerge() {
    if (!this.enabled || !this.mergeSound) return
    
    this.mergeSound.currentTime = 0
    this.mergeSound.play().catch(err => {
      // Ignore autoplay errors - user interaction required
      console.debug('Sound play prevented:', err)
    })
  }

  playSlide() {
    if (!this.enabled || !this.slideSound) return
    
    // Placeholder for future slide sound
    this.slideSound.currentTime = 0
    this.slideSound.play().catch(err => {
      console.debug('Sound play prevented:', err)
    })
  }
}

export const soundManager = new SoundManager()

