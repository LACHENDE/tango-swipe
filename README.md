# Tango Swipe

Japanese learning games. Static HTML, CSS and JavaScript; no build step.

## Games

- [Flashcards](index.html): the existing study app.
- [Game lab](lab.html): choose an experiment.
- [Tetsu’s Snack Run](snack.html): two-player co-op with English / Chinese menus, hiragana memory puzzles, optional speech, teammate hints, a shared snack score and a joint shortcut vote.
- [Kana Duel](duel.html): two players read the same hiragana aloud; first to five points wins. Includes a clearly labelled Tetsu practice bot.
- [Co-op raid](tango-raid.html): vocabulary answers attack a shared boss.
- Listen & Dodge, Word Runner and Speak to Cast are available from the game lab.

## Run locally

Serve this folder with any static web server, for example:

```sh
python -m http.server 8000
```

Open http://localhost:8000/lab.html. For phones, use an HTTPS deployment. Keep the asset folders alongside the HTML files.

## Kana Duel

Create a room, send its six-character code to a friend, and both tap Ready. Each player needs their own device and a browser with Japanese speech recognition. Mic access starts only after Ready and stops after the word. Short hiragana words are displayed; expected kanji returned by speech recognition are accepted internally.

Results within 0.3 seconds tie. Browser recognition delays affect speed, so this is a friendly prototype, not a pronunciation assessment or ranked competition. A host coordinates the countdown and score over the existing public EMQX MQTT service. Rooms and client-reported timings are not authenticated or cheat-resistant. Speech processing may use the browser provider's service; the game does not send microphone recordings or transcripts to the opponent. Internet access is required for online rooms and may be required for recognition.

## Validation

### Tetsu’s Snack Run

Both players complete different hiragana words to build each of eight bridges. Read the prompt, then reconstruct it with the kana tiles or use the optional microphone. Shared hearts and scores reward cooperation; a completed player can send a hint. After four bridges both vote for a safe path (14-second rounds) or a shortcut (10 seconds, double rewards). Disagreement selects the safe path. A clearly labelled practice partner is available without a room connection.

International and China connection routes use separate public EMQX endpoints. The first character of the room code selects the route for both players, including manually entered codes. Connection loss or a hidden page pauses active play; both players confirm resuming. The speech service may be unavailable on some devices or networks, so kana input remains usable without microphone permission. Actual reachability from your friend's network in mainland China still needs a real-device check.

Verified responsive layouts at 320×568 and 390×844, a full eight-bridge run with two independent English/Chinese browsers over the real room connection, shared scores, hints, reactions, wrong-answer retry, route votes, victory, replay, pause and leaving. Browser speech callbacks were simulated for microphone lifecycle tests; real audio recognition was not recorded in testing.

### Kana Duel

Checked phone layouts, correct/wrong readings, opt-in microphone handling, room capacity, synchronized words, ties, consistent scoring, cancellations, first-to-five completion, rematches and stale callback rejection. Two isolated browser players were tested over the real room connection with simulated speech callbacks. Actual microphone timing still needs a two-phone test.
