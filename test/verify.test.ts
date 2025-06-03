import { describe, expect, it } from "bun:test";
import { hash, verify } from "../src";

describe("verify", () => {
    it("should be defined", () => {
        expect(verify).toBeDefined();
    });

    it("should return true for valid password", async () => {
        const password = "correct-password";
        const hashedPassword = await hash(password);
        const result = await verify({
            hash: hashedPassword,
            password: password
        });
        expect(result).toBe(true);
    });

    it("should return false for invalid password", async () => {
        const hashedPassword = await hash("correct-password");
        const result = await verify({
            hash: hashedPassword,
            password: "wrong-password"
        });
        expect(result).toBe(false);
    });

    it("should throw an error for invalid hash format", async () => {
        expect(async () => {
            await verify({
                hash: "invalid-format",
                password: "some-password"
            });
        }).toThrow("Invalid hash format");
    });
});
