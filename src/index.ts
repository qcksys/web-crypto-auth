export const hash = async (password: string): Promise<string> => {
  const salt = await generateRandomSalt(32);

  const hashArrayBuffer = await hashWithSalt(password, salt);

  const hashString = await arrayBufferToString(hashArrayBuffer);

  return `${salt}:${hashString}`;
};

export const verify = async (data: {
  hash: string;
  password: string;
}): Promise<boolean> => {
  const [storedSalt, storedHash] = data.hash.split(":");

  if (!storedSalt || !storedHash) {
    throw new Error("Invalid hash format");
  }

  const passwordHash = await arrayBufferToString(
    await hashWithSalt(data.password, storedSalt),
  );

  return passwordHash === storedHash;
};

export const hashWithSalt = async (
  password: string,
  salt: string,
): Promise<ArrayBuffer> => {
  const iterations = 100000;
  const hash = "SHA-256";
  const length = 64;

  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"],
  );

  return await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: encoder.encode(salt),
      iterations: iterations,
      hash: hash,
    },
    keyMaterial,
    length * 8,
  );
};

export const generateRandomSalt = async (length: number) => {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    "",
  );
};

export const arrayBufferToString = async (array: ArrayBuffer) => {
  return Array.from(new Uint8Array(array), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
};
