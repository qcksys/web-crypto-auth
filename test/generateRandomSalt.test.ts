import { describe, expect, it } from "bun:test";
import { generateRandomSalt } from "../src";

describe("generateRandomSalt", () => {
    it("should be defined", () => {
        expect(generateRandomSalt).toBeDefined();
    });

    it("should return a string of expected length", async () => {
        const length = 16;
        const salt = await generateRandomSalt(length);
        expect(salt.length).toBe(length * 2);
    });

    it("should generate different salts on consecutive calls", async () => {
        const salt1 = await generateRandomSalt(16);
        const salt2 = await generateRandomSalt(16);
        expect(salt1).not.toBe(salt2);
    });

    it("should generate hex-encoded string", async () => {
        const salt = await generateRandomSalt(16);
        expect(salt).toMatch(/^[0-9a-f]+$/);
    });

    it("should handle different lengths", async () => {
        const length1 = 8;
        const length2 = 32;

        const salt1 = await generateRandomSalt(length1);
        const salt2 = await generateRandomSalt(length2);
    
        expect(salt1.length).toBe(length1 * 2);
        expect(salt2.length).toBe(length2 * 2);
    });
});
