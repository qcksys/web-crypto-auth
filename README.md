# @qcksys/web-crypto-auth

A lightweight library for secure password hashing and verification using the Web Crypto API. Compatible with
environments that support Web Crypto, including browsers and Cloudflare Workers.

## Installation

```bash
npm install @qcksys/web-crypto-auth
```

## Usage

This library provides a simple API for hashing passwords and verifying them later. It uses PBKDF2 with SHA-256 and
100,000 iterations for secure password storage.

### Hashing a password

```typescript
import { hash } from '@qcksys/web-crypto-auth';

// Inside an async function
const hashedPassword = await hash('user_password');
// Returns a string in format 'salt:hash'
// Store this value in your database
```

### Verifying a password

```typescript
import { verify } from '@qcksys/web-crypto-auth';

// Inside an async function
const isValid = await verify({
    hash: 'stored_hash_from_database', // The hash string previously generated
    password: 'user_attempted_password' // The password to verify
});

// isValid is a boolean - true if password matches, false otherwise
if (isValid) {
    // Password is correct
} else {
    // Password is incorrect
}
```

## Cloudflare Workers Compatibility

This library is fully compatible with Cloudflare Workers, as it uses the standard Web Crypto API that's available in the
Workers runtime. No additional configuration is needed to use it in your Workers projects.

## Security Notes

- Uses PBKDF2 with SHA-256 and 100,000 iterations
- Automatically generates a cryptographically secure random salt for each hash
- Follows modern password hashing best practices
