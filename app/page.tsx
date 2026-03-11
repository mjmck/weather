"use client";

import { useState } from "react";
import SearchBar from "./components/SearchBar";
import Image from "next/image";

export default function Home() {
  const [location, setLocation] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (input: string) => {
    setLoading(true);
    setError(null);
    setLocation(input);

    try {
      const res = await fetch(`/api/weather?q=${encodeURIComponent(input)}`);
      if (!res.ok) throw new Error("Failed to fetch weather");
      const weather = await res.json();
      setData(weather);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
      setData(null);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-900 via-slate-900 to-slate-950 text-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Weather
          </h1>
          <p className="text-sm text-slate-300">
            Search any location to see current conditions instantly.
          </p>
        </header>

        <SearchBar onSearch={handleSearch} />

        <section className="mt-6">
          {loading && (
            <div className="rounded-2xl bg-slate-900/60 border border-slate-700/60 px-5 py-4 text-sm text-slate-200 shadow-lg shadow-sky-900/30">
              Fetching the latest weather…
            </div>
          )}

          {error && (
            <div className="rounded-2xl bg-red-900/40 border border-red-500/60 px-5 py-4 text-sm text-red-100 shadow-lg shadow-red-900/30">
              {error}
            </div>
          )}

          {data && !loading && !error && (
            <div className="rounded-3xl bg-slate-900/70 border border-slate-700/70 px-6 py-5 mt-2 shadow-2xl shadow-sky-900/40 backdrop-blur">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-1">
                    Current Weather  |  {(data.location.localtime).slice(-5)}
                  </p>
                  <h2 className="text-xl font-semibold capitalize">
                    {location || data.location?.name}
                  </h2>
                  <p className="text-sm text-slate-300 mt-1 flex items-center gap-2">
                    <span className="text-3xl font-semibold">
                      {Math.round(data.current.temp_c)}°C
                    </span>
                    <span className="text-slate-300">
                      {data.current.condition.text}
                    </span>
                  </p>
                </div>

                <div className="flex flex-col items-end">
                  <img
                    src={data.current.condition.icon}
                    alt={data.current.condition.text}
                    className="w-16 h-16 drop-shadow-lg"
                  />
                  <p className="mt-2 text-xs text-slate-400">
                    Feels like {Math.round(data.current.feelslike_c)}°C
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-slate-200">
                <div className="rounded-2xl bg-slate-800/60 px-3 py-2 border border-slate-700/60">
                  <p className="text-[0.65rem] uppercase tracking-wide text-slate-400">
                    Humidity
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    {data.current.humidity}%
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-800/60 px-3 py-2 border border-slate-700/60">
                  <p className="text-[0.65rem] uppercase tracking-wide text-slate-400">
                    Wind
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    {data.current.wind_kph} kph
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-800/60 px-3 py-2 border border-slate-700/60">
                  <p className="text-[0.65rem] uppercase tracking-wide text-slate-400">
                    UV Index
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    {data.current.uv}
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}