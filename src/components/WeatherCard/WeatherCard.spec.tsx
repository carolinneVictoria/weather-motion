import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import WeatherCard from ".";
import type { Weather } from "../../types/weather";

const weather: Weather = {
    date: "13 de setembro",
    city_name: "São Paulo",
    condition_slug: "rain_night",
    temp: 14,
    description: "Garoa",
    humidity: 97,
    forecast: [{ min: 14, max: 16 }],
    daily: [],
    theme: "rain-night",
};

describe("WeatherCard", () => {
    it("o componente deve renderizar corretamente", () => {
        render(<WeatherCard weather={weather} />);
        expect(screen.getByText("São Paulo")).toBeInTheDocument();
    });
});