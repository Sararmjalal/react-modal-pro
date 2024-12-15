# React-Modal-Pro

**React-Modal-Pro** is a versatile and lightweight library for managing modals in React applications. It offers seamless support for dialogs, sidebars, and sheets, giving you full control over their behavior and appearance. With native-like navigation integration, modals can close when navigating back in history, without actually reverting to the previous page—providing a smooth, app-like user experience.

## Installation

To install `React-Modal-Pro`, you can use **npm** or **yarn**:

```bash
# Using npm
$ npm install --save react-modal-pro

# Using yarn
$ yarn add react-modal-pro
```

## Key Features:
- Effortlessly manage multiple modals.
- Native-like modal behavior with history-based closing.
- Swipe-to-open and swipe-to-close functionality for sidebars and sheets.
- Simple yet powerful API for fine-tuned control.

With **React-Modal-Pro**, creating professional, responsive, and intuitive modals has never been easier.

---

## Example: Building Modals with React-Modal-Pro

Below is a simple example demonstrating how to use **React-Modal-Pro** to create a bottom sheet, a sidebar, and a center dialog, each controlled by unique keys and customizable props.

### Highlights:
1. **Unique Modal Keys**:  
   Each modal uses a unique `modalKey` to ensure smooth and independent functionality, even when managing multiple modals simultaneously.

2. **Global Modal Control**:  
   Using the `useModalController` hook, you can programmatically control any modal, allowing you to close (or open) it from anywhere in your app.

3. **Customizable Props**:  
   Tailor your modals with a variety of props for direction, triggers, gestures, and more. (Details on all available props are explained later!)

### Code Example:

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ProModalProvider, ProSheet, Sidebar, useModalController, Dialog } from 'react-modal-pro';

function App() {
  return (
    <div>
      <BottomSheet />
      <SidebarLeft />
      <CenterDialog />
    </div>
  );
}

function BottomSheet() {
  return (
    <ProSheet
      modalKey="bottom-sheet"
      direction="bottom"
      TriggerElement={<button>open bottom sheet</button>}
    >
      <BottomSheetContent />
    </ProSheet>
  );
}

function BottomSheetContent() {
  const { handleCloseModal } = useModalController("bottom-sheet");
  return (
    <button onClick={handleCloseModal}>
      click to close bottom sheet with me!
    </button>
  );
}

function SidebarLeft() {
  return (
    <Sidebar
      modalKey="sidebar-left"
      direction="left"
      TriggerElement={<button>open sidebar left</button>}
    >
      Hey, This is sidebar-left content!
    </Sidebar>
  );
}

function CenterDialog() {
  return (
    <Dialog
      modalKey="dialog"
      TriggerElement={<button>open dialog</button>}
    >
      Hey, This is dialog content!
    </Dialog>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProModalProvider>
      <App />
    </ProModalProvider>
  </React.StrictMode>
);
```
### Key Takeaways
- **Unique Keys**: Assign a unique `modalKey` (e.g., `'bottom-sheet'`, `'sidebar-left'`) for independent modal control.
- **Dynamic Control**: Use the `useModalController` hook to dynamically manage modals, such as closing a modal from within its content using `handleCloseModal`.
- **Customizable Props**: Configure modals with props for directions, gestures, animations, and more.

---

## Props Reference

### ProModalProvider Props

| **Prop**                 | **Type**       | **Default** | **Description**                                                                 |
|--------------------------|----------------|-------------|---------------------------------------------------------------------------------|
| `defaultCanDismiss`      | `boolean`      | `true`      | Allows modals to be dismissed by clicking the backdrop or swiping.             |
| `defaultOpenDuration`    | `number`       | `400`       | Duration (in ms) for opening animations.                                       |
| `defaultCloseDuration`   | `number`       | `300`       | Duration (in ms) for closing animations.                                       |
| `defaultSheetClassName`  | `string`       | `""`        | Default class name for the modal sheet.                                        |
| `defaultBackdropClassName` | `string`     | `""`        | Default class name for the modal backdrop.                                     |

---

### Shared Modal Props (`Dialog`, `Sidebar`, `ProSheet`)

| **Prop**             | **Type**        | **Default** | **Required** | **Description**                                                                 |
|-----------------------|-----------------|-------------|--------------|---------------------------------------------------------------------------------|
| `modalKey`           | `string`        | -           | **Yes**      | Unique key for identifying the modal.                                          |
| `children`           | `ReactNode`     | -           | **Yes**      | Content displayed inside the modal.                                            |
| `TriggerElement`     | `ReactNode`     | -           | **Yes**      | Element that triggers modal opening.                                           |
| `canDismiss`         | `boolean`       | `true`      | No           | Allows dismissal by backdrop click.                                            |
| `closeCb`            | `() => void`    | `undefined` | No           | Callback executed when the modal closes.                                       |
| `closeDuration`      | `number`        | `300`       | No           | Duration (in ms) for closing animations.                                       |
| `openDuration`       | `number`        | `400`       | No           | Duration (in ms) for opening animations.                                       |
| `backdropClassName`  | `string`        | `""`        | No           | Custom class name for the backdrop.                                            |
| `sheetClassName`     | `string`        | `""`        | No           | Custom class name for the modal container.                                     |

---

### Component-Specific Props

#### Dialog
| **Prop**            | **Type**       | **Default** | **Required** | **Description** |
|----------------------|----------------|-------------|--------------|------------------|
| *(inherits shared props)* | -          | -           | -            | -                |

#### Sidebar
| **Prop**             | **Type**       | **Default** | **Required** | **Description**                                |
|-----------------------|----------------|-------------|--------------|------------------------------------------------|
| `direction`          | `left` `right` | -           | **Yes**      | Direction the sidebar opens (`left` or `right`). |
| `swipeToOpen`        | `boolean`      | `false`     | No           | Enables swipe-to-open functionality.            |
| `swipeToClose`       | `boolean`      | `false`     | No           | Enables swipe-to-close functionality.           |
| `swipeThreshold`     | `number`       | `undefined` | No           | Threshold for swipe gestures.                   |

#### ProSheet
| **Prop**             | **Type**       | **Default** | **Required** | **Description**                                |
|-----------------------|----------------|-------------|--------------|------------------------------------------------|
| `direction`          | `bottom` `top` | -           | **Yes**      | Direction the sheet opens (`bottom` or `top`). |
| `swipeToOpen`        | `boolean`      | `false`     | No           | Enables swipe-to-open functionality.            |
| `swipeToClose`       | `boolean`      | `false`     | No           | Enables swipe-to-close functionality.           |
| `swipeThreshold`     | `number`       | `undefined` | No           | Threshold for swipe gestures.                   |

---

## Demo
Try the live demo on Codesandbox:  
[https://codesandbox.io/p/live/e0a47f2c-961a-4dff-8e22-e21383b26f02](https://codesandbox.io/p/live/e0a47f2c-961a-4dff-8e22-e21383b26f02)
