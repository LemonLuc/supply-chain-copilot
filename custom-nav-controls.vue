<script setup lang="ts">
import { computed, ref } from 'vue'
import { currentMic } from '@slidev/client/state/index.ts'

const formats = [
  { value: 'video/webm;codecs=h264', label: 'MP4' },
  { value: 'video/webm', label: 'WebM' },
]

const availableFormats = computed(() => {
  if (typeof MediaRecorder === 'undefined' || typeof MediaRecorder.isTypeSupported !== 'function')
    return []
  return formats.filter(format => MediaRecorder.isTypeSupported(format.value))
})

function initialFormat() {
  if (typeof window === 'undefined')
    return 'video/webm'

  const stored = window.localStorage.getItem('slidev-record-mimetype')
  if (stored && availableFormats.value.some(format => format.value === stored))
    return stored

  return availableFormats.value[0]?.value || 'video/webm'
}

const selectedFormat = ref(initialFormat())
const displayAudioEnabled = ref(false)
const micEnabled = computed({
  get: () => currentMic.value !== 'none',
  set: enabled => currentMic.value = enabled ? 'default' : 'none',
})

function updateDisplayAudio() {
  window.localStorage.setItem('slidev-record-display-audio', displayAudioEnabled.value ? 'true' : 'false')
}

function updateFormat() {
  const key = 'slidev-record-mimetype'
  const oldValue = window.localStorage.getItem(key)
  window.localStorage.setItem(key, selectedFormat.value)
  window.dispatchEvent(new StorageEvent('storage', {
    key,
    oldValue,
    newValue: selectedFormat.value,
    storageArea: window.localStorage,
  }))
}

if (typeof window !== 'undefined') {
  if (currentMic.value === 'none')
    currentMic.value = 'default'
  displayAudioEnabled.value = window.localStorage.getItem('slidev-record-display-audio') === 'true'
  updateDisplayAudio()
  updateFormat()
}
</script>

<template>
  <button
    type="button"
    :aria-pressed="micEnabled"
    :title="micEnabled ? 'Microphone is on for recording' : 'Microphone is muted for recording'"
    class="recording-mic-toggle"
    @click="micEnabled = !micEnabled"
  >
    {{ micEnabled ? 'Mic on' : 'Mic off' }}
  </button>
  <button
    type="button"
    :aria-pressed="displayAudioEnabled"
    :title="displayAudioEnabled ? 'Shared tab or window audio is included' : 'Only microphone audio is recorded'"
    class="recording-audio-toggle"
    @click="displayAudioEnabled = !displayAudioEnabled; updateDisplayAudio()"
  >
    {{ displayAudioEnabled ? 'Tab audio on' : 'Mic only' }}
  </button>
  <select
    v-if="availableFormats.length > 1"
    v-model="selectedFormat"
    aria-label="Recording format"
    title="Recording format"
    class="recording-format-select"
    @change="updateFormat"
  >
    <option v-for="format in availableFormats" :key="format.value" :value="format.value">
      {{ format.label }}
    </option>
  </select>
</template>

<style scoped>
.recording-format-select,
.recording-mic-toggle,
.recording-audio-toggle {
  background: transparent;
  border: 1px solid currentColor;
  border-radius: 4px;
  color: currentColor;
  font-size: 11px;
  height: 24px;
  line-height: 1;
  margin: auto 2px;
  padding: 0 4px;
}

.recording-mic-toggle[aria-pressed='false'],
.recording-audio-toggle[aria-pressed='false'] {
  opacity: 0.58;
}
</style>
