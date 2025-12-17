import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const STORAGE_KEY = "searchQuery";

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const savedQuery = localStorage.getItem(STORAGE_KEY);
    if (savedQuery) {
      setQuery(savedQuery);
    }
  }, []);

  const formAction = (formData: FormData) => {
    const value = String(formData.get("query") ?? "").trim();

    if (!value) {
      toast.error("Please enter your search query.");
      return;
    }

    onSubmit(value);

    setQuery("");
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    localStorage.setItem(STORAGE_KEY, value);
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <a
          className={css.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>

        <form className={css.form} action={formAction}>
          <input
            className={css.input}
            type="text"
            name="query"
            value={query}
            onChange={handleInputChange}
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={css.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
