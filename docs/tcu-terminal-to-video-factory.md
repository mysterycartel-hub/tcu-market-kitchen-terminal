# TCU Terminal to Video Factory

## Overview
This document describes the architectural path for connecting the TCU Market Marina terminal experience to a Remotion video factory. The goal is to translate terminal practice interactions into a structured lesson video flow, while maintaining the no-broker, practice-only stance.

## 6-Step Integration Flow

1. Capture terminal session state
- Collect the current TCU session fields: chart selection, uploaded chart image, practice chart scenario, execution plan, mistake log, coaching notes, and current character crew guidance.
- Keep the payload strictly educational and scenario-based.

2. Normalize the lesson data
- Map terminal inputs into a lesson object with clearly labeled sections: `context`, `setup`, `action`, `reflection`, `score`, and `coachNotes`.
- Include static chart metadata such as symbol label, timeline, support/resistance zones, and practice target bands.

3. Build the Remotion storyboard payload
- Create named scenes for the video factory: `Intro`, `Market Kitchen Setup`, `Execution Recipe`, `Practice Review`, `Coach Commentary`, and `Reflection Summary`.
- Assign each scene a short narrative, display cards, and visual assets.
- Use the practice chart mock as a visual anchor instead of live market data.

4. Trigger the Remotion render flow
- Send the structured lesson payload to a Remotion factory endpoint or serverless renderer.
- Ensure the endpoint returns a render job ID, status, and preview URL.
- Keep this integration separate from the main UI so the terminal remains lightweight.

5. Render and assemble assets
- Remotion uses the payload to compose animated slides, voiceover text, and chart overlays.
- Render final assets as MP4 or WebM for review and sharing.
- Include on-screen labels such as `Practice Session`, `Kitchen Plan`, `Coach Notes`, and `Review Highlights`.

6. Return results to the TCU UI
- Provide the user with a preview link and export controls.
- Update the terminal workflow to show render status, lesson completion state, and downloadable asset links.

## Future Button Outcomes

- `Practice Lesson`
  - Generates a short practice review video for the current session.
  - Focuses on the scenario, what was planned, what was observed, and coach guidance.
  - Produces a shareable training clip rather than live trading content.

- `Save Plan`
  - Persists the current execution plan and lesson details.
  - Marks the session as ready for later video generation or lesson replay.
  - Can optionally queue the plan for the next Remotion render pass.

- `Launch Studio`
  - Opens the video factory configuration panel.
  - Allows the user to choose style, duration, coach voice, and lesson pacing.
  - Prepares the current terminal state for Remotion storyboard rendering.

- `Export Review`
  - Starts the export flow for the rendered lesson asset.
  - Returns a download link or shareable preview page.
  - Includes a short summary report of the practice session and coach commentary.

## Notes
- The current implementation remains UI-only. No Remotion render engine is built yet.
- Future integration should preserve the premium TCU practice-first tone and keep video outputs strictly educational.
