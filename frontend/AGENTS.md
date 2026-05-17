<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Frontend Agent Instructions: English Partner

You are tasked with building the frontend for the application. This app allows users to interact by chatting with various NPCs (currently themed around Jujutsu Kaisen characters).

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Library:** React 19
- **Styling:** Tailwind CSS 4
- **State Management:** React Server Components + Client-side state (Hooks)
- **API Communication:** `fetch` (standard Browser API)

## Backend API Context

The backend is running (typically on `http://localhost:3000`) and provides the following endpoints:

- `GET /conversations/:userId`: List all conversations for a specific user.
- `POST /conversations/:userId`: Create a new conversation (title defaults to "New Conversation").
- `GET /conversations/:conversationId/messages`: Fetch message history for a conversation.
- `POST /conversations/:conversationId/messages`: Send a message and get an AI response. Payload: `{ content: string }`.

## Core Features to Implement

### 1. User Identification

- For now, implement a simple "Login" screen that asks for a User ID or name.
- You can use a hardcoded UUID for testing or implement a simple mock if needed, but the backend expects a valid UUID for `:userId`.

### 2. Dashboard / Sidebar

- A list of the user's past conversations.
- A "New Chat" button that triggers `POST /conversations/:userId`.
- Active conversation highlighting.

### 3. Chat Interface

- A main area showing the conversation history (`GET /conversations/:conversationId/messages`).
- Distinguish between `USER` and `MODEL` (AI) messages.
- A message input field with a send button.
- Handle loading states while waiting for the AI response.
- Auto-scroll to the bottom when new messages arrive.

### 4. Design & Aesthetics

- **Theme:** Modern, clean, and interactive.
- **Character Focus:** Since the characters are from Jujutsu Kaisen, consider subtle thematic elements (e.g., color schemes for Satoru Gojo vs. Sukuna).
- **Interactivity:** Use smooth transitions, hover effects, and loading skeletons to make the app feel "alive."

## Implementation Roadmap

1. **Setup API Client:** Create a utility to interact with the backend endpoints.
2. **Layout:** Build a responsive layout with a sidebar for conversations and a main content area.
3. **Conversation List:** Fetch and display the list of conversations.
4. **Chat Logic:** Implement the message sending/receiving flow, ensuring UI updates immediately on user input.
5. **NPC Integration:** (Future) The backend currently defaults to Gojo. Prepare the UI to eventually support NPC selection when creating a conversation.

## Constraints

- Follow standard Next.js 16 App Router patterns.
- Ensure type safety using the existing TypeScript configuration.
- Prioritize visual polish and user experience.
