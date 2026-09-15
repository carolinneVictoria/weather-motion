import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import NextDays from ".";


describe("NextDays", () => {
    it("Deve renderizar o componente de Próximos Dias", () => {
        const days = [
            {
                date: "16/09",
                condition_slug: "cloudy_day",
                description: "Parcialmente nublado",
                max: 25,
                min: 15,
            },
        ];
        render(<NextDays days={days} />);
        expect(screen.getByText("Próximos dias")).toBeInTheDocument();
    })
})