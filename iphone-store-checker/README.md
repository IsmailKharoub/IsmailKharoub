# iPhone pickup availability

Check whether a specific iPhone is available for pickup at Apple Stores in the United States.

Pick a model, finish, and storage, then search by ZIP code or by city and state (`Los Angeles, CA`). You can also compare every finish at the storage you chose. Results come from Apple’s public store-pickup service and are cached for two minutes.

## Run

```bash
cd iphone-store-checker
npm start
```

Open http://localhost:8787. Set `PORT` to use a different port. Node 20 or newer is required; there are no dependencies to install.

```bash
npm test
```

The current lineup is iPhone Duo, iPhone 18 Pro and Pro Max, iPhone Air, iPhone 17, iPhone 17e, and iPhone 16. Prices shown are Apple’s unlocked prices.
