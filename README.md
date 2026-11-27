# Expo Snack version

This folder contains a **single-file** version of CodeQuest for [Expo Snack](https://snack.expo.dev/).

## How to use

1. Open https://snack.expo.dev and log in.
2. Create a new Snack and select **SDK 58**.
3. Replace the contents of `App.js` with `snack/App.js` from this folder.
4. Replace `package.json` with `snack/package.json` from this folder.
5. Click **Save**, then use **Run on device** (Expo Go QR) or the **Web** preview.
6. Share the saved Snack URL with your members.

Demo login: `demo@codequest.app` / `demo1234`

## Keeping it in sync

`App.js` here is generated from the main project. After changing the app source, run this from the project root to regenerate it:

```bash
node snack/make-snack.js
```
