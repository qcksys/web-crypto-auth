import { describe, expect, it } from "bun:test";

describe("should", () => {
  it("number", () => {
    expect(1).toBe(1);
  });

  it("string", () => {
    expect("two").toBe("two");
  });
});
