"use client";

import React, { useEffect, useState } from "react";

export default function AsyncDataPanel() {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=51.5074&longitude=-0.1278&current_weather=true"
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function refresh() {
    setRefreshing(true);
    setError(null);
    try {
      const res = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=51.5074&longitude=-0.1278&current_weather=true"
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setRefreshing(false);
    }
  }

  return (
    <section className="weather-panel" aria-live="polite">
      <h2>Current Weather — London</h2>

      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
        <button
          onClick={refresh}
          disabled={refreshing}
          aria-busy={refreshing}
          aria-label={refreshing ? "Refreshing data" : "Refresh data"}
        >
          {refreshing ? "Refreshing…" : "Refresh"}
        </button>
        <span style={{ color: "var(--muted)", fontSize: "0.95rem" }}>
          {loading ? "Loading…" : refreshing ? "Refreshing…" : error ? "Error" : "Loaded"}
        </span>
      </div>

      {loading && (
        <div className="skeleton" aria-hidden>
          <div className="skeleton-line long" />
          <div className="skeleton-line medium" />
          <div className="skeleton-line short" />
        </div>
      )}

      {error && !loading && (
        <div role="alert" className="error-message">
          Something went wrong: {error}
          <div style={{ marginTop: 8 }}>
            <button onClick={refresh} disabled={refreshing} aria-busy={refreshing}>
              Try again
            </button>
          </div>
        </div>
      )}

      {data && !loading && !error && (
        <pre>{JSON.stringify(data.current_weather ?? data, null, 2)}</pre>
      )}
    </section>
  );
}
