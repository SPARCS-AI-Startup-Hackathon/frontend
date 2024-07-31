import { create } from 'zustand'

/* audio */
interface AudioState {
  isPlaying: boolean
  setPlaying: (playing: boolean) => void
}

export const useAudioStore = create<AudioState>((set) => ({
  isPlaying: false,
  setPlaying: (playing: boolean) => set({ isPlaying: playing }),
}))

/* message */
interface MessageState {
  message: string
  allMessagesReceived: boolean
  setMessage: (update: string | ((prev: string) => string)) => void
  setAllMessagesReceived: (received: boolean) => void
}

export const useMessageStore = create<MessageState>((set) => ({
  message: '',
  allMessagesReceived: false,
  setMessage: (update) =>
    set((state) => ({
      message: typeof update === 'string' ? update : update(state.message),
    })),
  setAllMessagesReceived: (received) => set({ allMessagesReceived: received }),
}))

interface ConnectionState {
  connectionCount: number
  incrementConnectionCount: () => void
}

export const useConnectionStore = create<ConnectionState>((set) => ({
  connectionCount: 0,
  incrementConnectionCount: () => set((state) => ({ connectionCount: state.connectionCount + 1 })),
}))
