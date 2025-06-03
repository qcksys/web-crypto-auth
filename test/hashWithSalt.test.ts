import { describe, expect, it } from "bun:test";
import { hashWithSalt, arrayBufferToString } from "../src";

describe("hashWithSalt", () => {
  it("should be defined", () => {
    expect(hashWithSalt).toBeDefined();
  });

  it("should return an ArrayBuffer", async () => {
    const result = await hashWithSalt("password", "salt");
    expect(result).toBeInstanceOf(ArrayBuffer);
  });

  it("should produce consistent results for the same input", async () => {
    const hash1 = await hashWithSalt("password", "consistent-salt");
    const hash2 = await hashWithSalt("password", "consistent-salt");
    
    const str1 = await arrayBufferToString(hash1);
    const str2 = await arrayBufferToString(hash2);
    
    expect(str1).toBe(str2);
  });

  it("should produce different hashes for different passwords", async () => {
    const salt = "same-salt";
    const hash1 = await hashWithSalt("password1", salt);
    const hash2 = await hashWithSalt("password2", salt);
    
    const str1 = await arrayBufferToString(hash1);
    const str2 = await arrayBufferToString(hash2);
    
    expect(str1).not.toBe(str2);
  });

  it("should produce different hashes for different salts", async () => {
    const password = "same-password";
    const hash1 = await hashWithSalt(password, "salt1");
    const hash2 = await hashWithSalt(password, "salt2");
    
    const str1 = await arrayBufferToString(hash1);
    const str2 = await arrayBufferToString(hash2);
    
    expect(str1).not.toBe(str2);
  });
});
