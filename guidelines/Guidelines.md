
# Strict Code Rules (USER DEFINED)

## 1. Separation of Concerns (CRITICAL)
- **DO NOT MERGE** functionality into a single giant file.
- **Split features** into separate files (e.g., separate hooks for Timer, Order, Payment).
- **Shared Code**: Only share code (utils/components) if it is **robust and error-free**.
- **Isolation**: If sharing code causes potential type errors or complexity ("dễ phát sinh lỗi"), prefer **separating/duplicating** logic over forced sharing.
- **Safety First**: It is better to have two independent working files than one shared file that breaks both features.

## 2. Zero Errors Policy
- No red errors (Errors).
- No yellow warnings (Warnings).
- Project must be clean before moving to the next task.

## 3. Strict Theme Usage
- **NEVER** hard-code colors (e.g., `#00F0FF`).
- **ALWAYS** use `theme.config.ts` variables (e.g., `THEME_COLORS.primary`).
- This ensures the "One-Click Theme Change" feature works correctly.

## 4. Master Component Architecture
- Use `TableCard` as the single source of truth for all 12 tables.
- Do not duplicate table components; logic must be handled within the master component or its hooks.

## 5. No Dead Code
- Delete unused files immediately to keep the project lightweight.
