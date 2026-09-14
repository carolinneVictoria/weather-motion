import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import SearchBar from ".";

describe("SearchBar", () => {
    it("o componente deve renderizar corretamente", () => {
        render(<SearchBar onSearch={vi.fn()} />);

        expect(
            screen.getByPlaceholderText("Digite sua cidade...")
        ).toBeInTheDocument();
    });
});
