import { describe, expect, it } from "bun:test";
import { hash } from "../src";

describe("hash", () => {
  it("should be defined", () => {
    expect(hash).toBeDefined();
  });
});
