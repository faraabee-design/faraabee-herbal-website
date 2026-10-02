# Security Specification: FARABI Herbal Wellness Firestore Rules

## 1. Data Invariants
1. **Public Catalog Access**: Anyone (unauthenticated public visitors) may READ active products, active categories, and active promotions.
2. **Administrative Control**: Only verified administrators (`isAdmin()` or bootstrapped admin `faraabee@gmail.com`) can CREATE, UPDATE, or DELETE products, categories, promotions, and view customer orders.
3. **Customer Orders**: Anyone (including guest customers during checkout) can CREATE an order if the payload adheres strictly to the Order schema. Once created, orders are immutable to public users and can only be read/managed by administrators.
4. **Admin Protection**: Admin role documents in `/admins/{adminUid}` can only be read/written by verified administrators to prevent self-elevation of privileges.
5. **Payload Boundaries**: All string and array fields are strictly bounded by `.size() <= MAX` to prevent denial-of-wallet resource exhaustion.

## 2. The "Dirty Dozen" Payloads (Must Return PERMISSION_DENIED)
1. **Unauthenticated Product Creation**: An unauthenticated user attempts to write a new product to `/products/malicious`.
2. **Unauthenticated Price Tampering**: An unauthenticated user attempts to update `price` on `/products/farabi-herbal-oil` from 1500 to 1.
3. **Non-Admin Category Deletion**: A standard authenticated user attempts to delete `/categories/herbal-oils`.
4. **Self-Assigned Admin Elevation**: A normal authenticated user attempts to write their own UID into `/admins/{uid}` with role `'admin'`.
5. **Ghost Field Injection (Shadow Update)**: An attacker attempts to write an unauthorized hidden field `isSuperUser: true` into a product document.
6. **ID Poisoning Attack**: An attacker attempts to create a product with a 2KB junk character document ID.
7. **Unauthenticated Order Listing**: An attacker attempts to list or query all customer orders from `/orders`.
8. **Customer Order Tampering**: An unauthenticated user attempts to modify or delete an existing customer order.
9. **Order Status Manipulation by Guest**: A guest customer attempts to update an order status from `'pending'` to `'delivered'`.
10. **Huge Payload Bomb**: An attacker attempts to inject a 500KB text string into the `shortDescription` field.
11. **Negative Price Exploit**: An attacker attempts to set a negative `price: -500` or invalid type on a product.
12. **Promotion Hijacking**: An unauthenticated user attempts to create a promotion pointing to a non-existent product or set arbitrary discount prices.
