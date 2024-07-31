import { create } from 'zustand'

interface AudioState {
  isPlaying: boolean
  setPlaying: (playing: boolean) => void
}

const useAudioStore = create<AudioState>((set) => ({
  isPlaying: false,
  setPlaying: (playing: boolean) => set({ isPlaying: playing }),
}))

export default useAudioStore
