"use client";

import { Moon, Sun } from "lucide-react";
import { useCallback, useSyncExternalStore } from "react";

const THEME_KEY = "mq-theme";

const listeners = new Set();

const getMode = () =>
  typeof window === "undefined"
    ? "system"
    : localStorage.getItem(THEME_KEY) || "system";

const resolveDark = () => {
  const mode = getMode();
  if (mode === "dark") return true;
  if (mode === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const applyToDom = (isDark) => {
  const root = document.documentElement;
  root.classList.toggle("dark", isDark);
  root.setAttribute("data-theme", isDark ? "dark" : "light");
};

const emit = () => listeners.forEach((listener) => listener());

const subscribe = (onStoreChange) => {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const handleChange = () => {
    applyToDom(resolveDark());
    emit();
  };
  media.addEventListener("change", handleChange);
  listeners.add(onStoreChange);
  return () => {
    media.removeEventListener("change", handleChange);
    listeners.delete(onStoreChange);
  };
};

const getSnapshot = () => resolveDark();
const getServerSnapshot = () => false;

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const handleToggle = useCallback(() => {
    const next = resolveDark() ? "light" : "dark";
    localStorage.setItem(THEME_KEY, next);
    applyToDom(next === "dark");
    emit();
  }, []);

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={dark}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container text-on-surface-variant transition-colors hover:bg-surface-container-high"
    >
      {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}

export default ThemeToggle;
