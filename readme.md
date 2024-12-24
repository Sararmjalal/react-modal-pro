# React-Modal-Pro

**React-Modal-Pro** is a versatile and lightweight library for managing modals in React applications. It offers seamless support for dialogs, sidebars, and sheets, giving you full control over their behavior and appearance. With native-like navigation integration, modals can close when navigating back in history, without actually reverting to the previous page—providing a smooth, app-like user experience.

---

# Table of Contents

- [Key Features](#key-features)
- [Installation](#installation)
- [Example: Building Modals with React-Modal-Pro](#example-building-modals-with-react-modal-pro)
- [Styling & Customization](#styling--customization)
- [Props Reference](#props-reference)
- [Demo](#demo)

---

## Key Features
- Effortlessly manage multiple modals.
- Native-like modal behavior with history-based closing.
- Swipe-to-open and swipe-to-close functionality for sidebars and sheets.
- Simple yet powerful API for fine-tuned control.

With **React-Modal-Pro**, creating professional, responsive, and intuitive modals has never been easier.

---

## Installation

To install `React-Modal-Pro`, you can use **npm** or **yarn**:

```bash
# Using npm
$ npm install --save react-modal-pro

# Using yarn
$ yarn add react-modal-pro
```

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

## Styling & Customization

This library offers extensive styling options through CSS variables, allowing you to customize the appearance of modals and sheets easily. Below is a list of the root styles provided, along with their default values and descriptions:

```css
:root {
  --react-modal-pro-sheet-radius: 12px; /* Corner radius for modal sheets */
  --react-modal-pro-sheet-padding: 24px; /* Inner padding for modal sheets */
  --react-modal-pro-sheet-background: #ffffff; /* Background color of the modal sheets */
  --react-modal-pro-backdrop-background: #0000004a; /* Background color of the modal backdrop */
  --react-modal-pro-dialog-sheet-z-index: 1200; /* Z-index for dialog modal sheets */
  --react-modal-pro-dialog-backdrop-z-index: 1199; /* Z-index for dialog modal backdrops */
  --react-modal-pro-sidebar-sheet-z-index: 1000; /* Z-index for sidebar modal sheets */
  --react-modal-pro-sidebar-backdrop-z-index: 999; /* Z-index for sidebar modal backdrops */
  --react-modal-pro-pro-sheet-sheet-z-index: 1100; /* Z-index for pro-sheet modal sheets */
  --react-modal-pro-pro-sheet-backdrop-z-index: 1099; /* Z-index for pro-sheet modal backdrops */
}
```

You can override these variables in your global CSS to match your project's design requirements. For example:

```css
:root {
  --react-modal-pro-sheet-radius: 16px;
  --react-modal-pro-backdrop-background: rgba(0, 0, 0, 0.7);
}
```

These changes will seamlessly update the modal appearance across your application.

### Additional Customization Options

The library also provides several className-based options for styling:

#### Default Class Names for All Modals

You can specify default class names for all modals by using the `defaultSheetClassName` and `defaultBackdropClassName` props when setting up the `ProModalProvider`. These class names will be applied to all modals within the provider's scope.

Example:

```jsx
<ProModalProvider
  defaultSheetClassName="modal-sheet-root"
  defaultBackdropClassName="modal-backdrop-root">
  {children}
</ProModalProvider>
```

#### Per-Modal Class Names

If you want to apply specific class names to individual modals, you can use the `sheetClassName` and `backdropClassName` props directly on the modal components (`Dialog`, `ProSheet`, `Sidebar`).

Example with `Dialog` (works seamlessly for `ProSheet` and `Sidebar`):

```jsx
<Dialog
  modalKey="dialog"
  sheetClassName="dialog-sheet"
  backdropClassName="dialog-backdrop"
  TriggerElement={<button>open dialog</button>}>
  Hey, This is dialog content!
</Dialog>
```

#### Static Class Name for Trigger Element

The library applies a static class name, `modal_pro_trigger_element`, to the `TriggerElement` of all modals. This ensures consistent styling across all trigger elements.

Example:

```css
.modal_pro_trigger_element {
  cursor: pointer;
  color: #007bff;
}
```

By combining these options, you can achieve a highly customizable and consistent design for your modal components.

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
| `swipeThreshold`     | `number`       | `100` | No           | Threshold for swipe gestures.                   |

#### ProSheet
| **Prop**             | **Type**       | **Default** | **Required** | **Description**                                |
|-----------------------|----------------|-------------|--------------|------------------------------------------------|
| `direction`          | `bottom` `top` | -           | **Yes**      | Direction the sheet opens (`bottom` or `top`). |
| `swipeToOpen`        | `boolean`      | `false`     | No           | Enables swipe-to-open functionality.            |
| `swipeToClose`       | `boolean`      | `false`     | No           | Enables swipe-to-close functionality.           |
| `swipeThreshold`     | `number`       | `100` | No           | Threshold for swipe gestures.                   |

---

## Demo
Try the live demo on Codesandbox:  
[https://codesandbox.io/p/devbox/pedantic-lumiere-njcdm6](https://codesandbox.io/p/devbox/pedantic-lumiere-njcdm6)
