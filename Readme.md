# Nobzo Feed – React Native Technical Evaluation

A production‑ready **React Native + Expo (TypeScript)** application implementing an infinite scrolling image feed using a public API. This project was built as part of the **Nobzo Ent Mobile Developer Technical Evaluation** and focuses on correctness, performance, clean architecture, and user experience.

---

## Overview

The app displays a single‑screen feed of images fetched from the [Picsum](https://picsum.photos) public API. It supports:

- Infinite scrolling (pagination)
- Pull‑to‑refresh
- Skeleton loaders for perceived performance
- Light & dark mode (system‑aware)
- Proper loading, error, and empty states
- Performance optimizations for smooth scrolling

The implementation follows **industry best practices** for React Native and is optimized for both Android and iOS.

---

## Tech Stack

- **React Native** – Core mobile framework
- **Expo** – Tooling and runtime
- **TypeScript** – Type safety and maintainability
- **pnpm** – Fast, disk‑efficient package manager

---

## API Used

**Picsum Public API**

```text
https://picsum.photos/v2/list?page=<page>&limit=<limit>
```

Each feed item uses:

- `id`
- `author`
- `download_url` (image source)

Images are resized via query params to reduce bandwidth and improve load times.

---

## Features

### 1. Infinite Scroll Feed

- Loads the first page on app start
- Fetches the next page when the user scrolls near the bottom
- Prevents duplicate or looping requests

### 2. Pull to Refresh

- Pulling down resets the feed to page 1
- Clears old data and fetches fresh results

### 3. Skeleton Loaders

- Animated skeleton cards displayed during initial loading
- Improves perceived performance and avoids blank screens

### 4. Dark Mode Support

- Automatically follows system light/dark mode
- Centralized theme configuration
- Theme‑aware colors, shadows, and skeletons

### 5. State Handling

- Initial loading state
- Loading‑more indicator
- Error state with retry action
- Empty state when no data is returned

### 6. Performance Optimizations

- `React.memo` for feed items
- Memoized callbacks with `useCallback`
- Optimized `FlatList` configuration
- Reduced image size and fade‑in rendering
- Clipped off‑screen views for memory efficiency

---

## Project Structure

```text
src/
├── api/
│   └── picsum.ts          # API fetch logic
├── components/
│   ├── FeedCard.tsx       # Memoized feed item card
│   └── FeedSkeleton.tsx   # Animated skeleton loader
├── themes/
│   ├── colors.ts          # Light & dark color palettes
│   └── useTheme.ts        # System theme hook
├── types/
│   └── feed.ts            # TypeScript interfaces
App.tsx                    # Main application entry
```

This structure keeps concerns separated and makes the codebase easy to scale and maintain.

---

## Installation & Setup

### Prerequisites

- Node.js (LTS recommended)
- pnpm
- Expo Go app (Android or iOS)

### Install dependencies

```bash
pnpm install
```

### Start the app

```bash
pnpm start
```

Then scan the QR code using **Expo Go** on your mobile device, or run on an emulator.

---

## Running on Devices

- **Android**: Scan QR code with Expo Go or use Android Emulator
- **iOS**: Scan QR code with Expo Go or use iOS Simulator (macOS)

---

## Key Implementation Notes

- **Hooks Rules**: All hooks are declared at the top level to avoid render inconsistencies
- **Shadow Handling**: Uses an outer wrapper to avoid shadow clipping on iOS
- **Images**: Reduced resolution and fade‑in for faster rendering
- **Safe Areas**: Uses `react-native-safe-area-context` (recommended by Expo)

---

## Assumptions

- Network connectivity is available
- Picsum API returns consistent data
- Pagination ends naturally when the API returns an empty array

---

## Possible Enhancements

- Image caching using `expo-image`
- Manual theme toggle with persistence
- Prefetching next page images
- Animations on list item entry

---

## Conclusion

This project demonstrates a clean, performant, and user‑friendly approach to building a modern React Native feed application. The focus was on **real‑world production quality**, maintainability, and smooth user experience rather than just meeting minimum requirements.
