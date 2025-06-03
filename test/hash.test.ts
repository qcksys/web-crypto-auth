import { describe, expect, it } from "bun:test";
import { hash } from "../src";

describe("hash", () => {
    it("should be defined", () => {
        expect(hash).toBeDefined();
    });

    it("should return a string", async () => {
        const result = await hash("password");
        expect(typeof result).toBe("string");
    });

    it("should return a string containing a salt and hash separated by colon", async () => {
        const result = await hash("password");
        expect(result.includes(":")).toBe(true);
        const [salt, hashValue] = result.split(":");
        expect(salt).toBeDefined();
        expect(hashValue).toBeDefined();
    });

    it("should generate different hashes for the same password", async () => {
        const hash1 = await hash("same-password");
        const hash2 = await hash("same-password");
        expect(hash1).not.toBe(hash2);
    });

    it("should work with empty string", async () => {
        const result = await hash("");
        expect(typeof result).toBe("string");
        expect(result.includes(":")).toBe(true);
    });

    it("should work with special characters", async () => {
        const result = await hash("!@#$%^&*()_+<>?");
        expect(typeof result).toBe("string");
        expect(result.includes(":")).toBe(true);
    });
});
