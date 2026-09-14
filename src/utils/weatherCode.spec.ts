import { describe, expect, it } from "vitest";
import { mapWeatherCode } from "./weatherCode";

describe("mapWeatherCode", () => {
    it("retorna o tema de céu limpo durante o dia", () => {
        const result = mapWeatherCode(0, true);
        expect(result).toEqual({
            conditionSlug: "clear_day",
            description: "Céu limpo",
            theme: "clear-day",
        });
    })

    it("retorna o tema de céu limpo durante a noite", () => {
        const result = mapWeatherCode(0, false);
        expect(result).toEqual({
            conditionSlug: "clear_night",
            description: "Céu limpo",
            theme: "clear-night",
        });
    })

    it("retorna o tema de céu nublado durante o dia", () => {
        const result = mapWeatherCode(1, true);
        expect(result).toEqual({
            conditionSlug: "cloudly_day",
            description: "Parcialmente nublado",
            theme: "cloudy-day",
        });
    })

    it("retorna o tema de céu nublado durante a noite", () => {
        const result = mapWeatherCode(1, false);
        expect(result).toEqual({
            conditionSlug: "cloudly_night",
            description: "Parcialmente nublado",
            theme: "cloudy-night",
        });
    })
});