# edge-tts provider — free Microsoft Edge neural voices, no API key.
# Docs:    https://github.com/rany2/edge-tts
# Install: python3 -m venv ~/.venvs/edge-tts && ~/.venvs/edge-tts/bin/pip install edge-tts
#          (or `pip install edge-tts` anywhere on PATH)
# Voices:  edge-tts --list-voices
#   en-US-AndrewMultilingualNeural (male, warm, most natural — default, at -5%)
#   en-US-AndrewNeural   (male, warm conversational)
#   en-US-BrianNeural    (male, casual)
#   en-US-AvaNeural      (female, expressive)
#   en-US-EmmaNeural     (female, clear conversational)
# Rate:    PRESENTATION_TTS_RATE=+5%   (optional, e.g. -10% / +10%)

EDGE_TTS_BIN="$(command -v edge-tts || echo "$HOME/.venvs/edge-tts/bin/edge-tts")"

tts_check() {
  [[ -x "$EDGE_TTS_BIN" ]] || { echo "✗ edge-tts not found" >&2; return 1; }
}

tts_install_help() {
  cat <<'EOF' >&2
Install edge-tts (free, no API key):
  python3 -m venv ~/.venvs/edge-tts && ~/.venvs/edge-tts/bin/pip install edge-tts
List voices:
  ~/.venvs/edge-tts/bin/edge-tts --list-voices
EOF
}

tts_synthesize() {
  local text="$1" out="$2" voice="${3:-en-US-AndrewMultilingualNeural}"
  "$EDGE_TTS_BIN" --text "$text" --voice "$voice" \
    --rate="${PRESENTATION_TTS_RATE:--5%}" \
    --write-media "$out" >/dev/null 2>&1
}
