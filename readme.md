# react-modal-pro

A professional React/Next.js modal package (Dialog, Sidebar, ProSheet) that renders into a portal and preserves a native-like modal experience across client-side URL changes. 🚀

Navigation
- [Install](#install)
- [Quick start](#quick-start)
- [Example usage](#example-usage)
- [Controller (useModalController)](#controller-usemodalcontroller)
- [Provider props](#provider-props)
- [Component props](#component-props)
- [Styling — CSS variables](#styling---css-variables)
- [Native-like behavior & routing](#native-like-behavior--routing)
- [Compatibility](#compatibility)
- [Where to find the source & contribute](#where-to-find-the-source--contribute)

---

## Install

npm install react-modal-pro

Peer dependencies: react, react-dom (React 18+ recommended).

---

## Quick start

1) Wrap your app with the provider. The provider creates a portal root with id `pro-modal-root` automatically.

```tsx
import { ProModalProvider } from "react-modal-pro";

export default function App() {
  return (
    <ProModalProvider>
      <YourApp />
    </ProModalProvider>
  );
}
```

2) Add a modal component. `modalKey` is required and must be unique app‑wide.

```tsx
import { Dialog } from "react-modal-pro";

export default function ExampleDialog() {
  return (
    <Dialog
      modalKey="unique-key"                       // required — must be unique
      headless={false}                           // set to true for fully custom styled sheet
      TriggerElement={<button>Open dialog</button>} // can be null if opening programmatically
      canDismiss={true}                           // allow backdrop click / Escape to close
      openDuration={200}                          // open animation duration (ms)
      closeDuration={180}                         // close animation duration (ms)
      sheetClassName="my-dialog-sheet"            // custom class for the sheet
      backdropClassName="my-dialog-backdrop"      // custom class for the overlay
    >
      <div>Your dialog content</div>
    </Dialog>
  );
}
```

---

## Example usage

Dialog
```tsx
<Dialog
  modalKey="dialog-1"
  TriggerElement={<button>Open Dialog</button>}
  canDismiss
>
  <div>Dialog content</div>
</Dialog>
```

Sidebar
```tsx
<Sidebar
  modalKey="sidebar-1"
  direction="left"
  TriggerElement={<button>Open Sidebar</button>}
  sheetClassName="sidebar-sheet"
>
  <div>Sidebar content</div>
</Sidebar>
```

ProSheet
```tsx
<ProSheet
  modalKey="sheet-1"
  direction="bottom"
  TriggerElement={null}       // open only programmatically
  swipeToClose
>
  <div>Sheet content</div>
</ProSheet>
```

---

## Controller (useModalController)

Control modals from anywhere using their unique key. This is useful when you want to omit TriggerElement and open/close programmatically.

Signature
```ts
const { open, willBeClosed, handleOpenModal, handleCloseModal } = useModalController(key)
```

Meaning:
- open: boolean — whether the modal is currently open.
- willBeClosed: boolean — true when the modal has started its close transition (useful for UI that reacts to closing animation).
- handleOpenModal: () => void — open the modal.
- handleCloseModal: () => void — request the modal to close (runs close transition).

Example:
```tsx
import { useModalController } from "react-modal-pro";

function ControllerExample() {
  const { open, willBeClosed, handleOpenModal, handleCloseModal } =
    useModalController("unique-dialog-key");

  return (
    <>
      <button onClick={handleOpenModal}>Open</button>
      <button onClick={handleCloseModal}>Close</button>
      <div>Open? {open ? "yes" : "no"}</div>
      <div>Will be closed? {willBeClosed ? "yes" : "no"}</div>
    </>
  );
}
```

---

## Provider props

ProModalProvider accepts optional defaults to configure modal behavior across the app:

- defaultCanDismiss?: boolean  
  Default whether modals are dismissible by backdrop click or Escape. Per-modal canDismiss overrides this.

- defaultOpenDuration?: number  
  Default open animation duration (ms). Per-modal openDuration overrides this.

- defaultCloseDuration?: number  
  Default close animation duration (ms). Per-modal closeDuration overrides this.

- defaultSheetClassName?: string  
  Default CSS class applied to all sheet elements.

- defaultBackdropClassName?: string  
  Default CSS class applied to all backdrop overlays.

Example:
```tsx
<ProModalProvider defaultCanDismiss={false} defaultCloseDuration={220}>
  <App />
</ProModalProvider>
```

---

## Component props

All exported modal components accept shared control props and a few component-specific props. Remember: `modalKey` is required for every modal and must be unique across your app.

Shared control props (Dialog, Sidebar, ProSheet)

- modalKey: string (required)  
  A required, unique identifier for this modal instance. The modal controller and internal routing logic rely on it. Keep it unique across the entire app to avoid conflicts.

- TriggerElement?: ReactNode  
  Element (button/link) that the component will render and attach the open action to. You can pass null and open via useModalController instead.

- children: ReactNode  
  Modal content.

- canDismiss?: boolean  
  When true, clicking the backdrop or pressing Escape closes the modal. Defaults to the provider value if unset.

- openDuration?: number  
  Open animation duration in milliseconds.

- closeDuration?: number  
  Close animation duration in milliseconds. While closing runs, willBeClosed will be true.

- sheetClassName?: string  
  Additional CSS class(es) applied to the sheet element (panel). Use this to customize padding, background, radius, etc.

- backdropClassName?: string  
  Additional CSS class(es) applied to the backdrop overlay. Use to change overlay color, blur, pointer behavior, etc.

- swipeToOpen?: boolean  
  Enable swipe-to-open for touch devices (when applicable).

- swipeToClose?: boolean  
  Enable swipe-to-close for touch devices.

- sheetRef?: Ref<HTMLDivElement> (internal)  
  A ref to the panel DOM node; primarily for advanced use.

Component-specific props

- Dialog  
  - Behavior: centered dialog. No direction prop. Use for classic modal windows.
  - headless?: boolean  
    When true, renders only the modal's functional logic without default styles, allowing complete custom styling control.

- Sidebar  
  - direction: "left" | "right" (required for Sidebar)  
    Sidebar slides in from the left or right.

- ProSheet  
  - direction: "top" | "bottom" (required for ProSheet)  
    Sheet slides in from the top or bottom (bottom is common on mobile).

Examples of usage are in "Example usage" above.

---

## Styling — CSS variables

Change global appearance via these :root variables (defaults shown). Use these or per-modal classNames (sheetClassName / backdropClassName) for granular styling.

```css
:root {
  --react-modal-pro-sheet-radius: 12px;
  --react-modal-pro-sheet-padding: 24px;
  --react-modal-pro-sheet-background: #ffffff;
  --react-modal-pro-backdrop-background: #0000004a;
  --react-modal-pro-dialog-sheet-z-index: 1200;
  --react-modal-pro-dialog-backdrop-z-index: 1199;
  --react-modal-pro-sidebar-sheet-z-index: 1000;
  --react-modal-pro-sidebar-backdrop-z-index: 999;
  --react-modal-pro-pro-sheet-sheet-z-index: 1100;
  --react-modal-pro-pro-sheet-backdrop-z-index: 1099;
}
```

Tips:
- Use CSS variables to change global radius, padding, background, overlay color, and z-index.
- For one-off styles, add CSS classes and pass them via sheetClassName/backdropClassName.

---

## Native-like behavior & routing

- Portal root: Provider creates and uses `#pro-modal-root` so modals render outside the app layout and stack consistently.
- Router-aware transitions: modal internals listen for navigation and handle transitions so open/close state is preserved or gracefully handled during client-side URL changes, avoiding abrupt unmounts and delivering a smooth, native-like UX. ✨

---

## Compatibility

- Recommended: React 18+.  
- Recommended: Next.js 14+. ✅

---

## Where to find the source & contribute

Repo: https://github.com/Sararmjalal/react-modal-pro  
Contributions: open issues or PRs on the repository. When adding examples or tests, please ensure modalKey uniqueness and include small reproducible examples. 🙏