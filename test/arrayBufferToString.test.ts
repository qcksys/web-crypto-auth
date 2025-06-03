import { describe, expect, it } from "bun:test";
import { arrayBufferToString } from "../src";

describe("arrayBufferToString", () => {
  it("should be defined", () => {
    expect(arrayBufferToString).toBeDefined();
  });

  it("should convert ArrayBuffer to string", async () => {
    const buffer = new Uint8Array([1, 15, 16, 255]).buffer;
    const result = await arrayBufferToString(buffer);
    expect(result).toBe("010f10ff");
  });

  it("should handle empty ArrayBuffer", async () => {
    const buffer = new Uint8Array([]).buffer;
    const result = await arrayBufferToString(buffer);
    expect(result).toBe("");
  });

  it("should pad single-digit hex values with leading zero", async () => {
    const buffer = new Uint8Array([0, 1, 10, 15]).buffer;
    const result = await arrayBufferToString(buffer);
    expect(result).toBe("00010a0f");
  });
});
