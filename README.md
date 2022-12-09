# 👀 Summary

Snitch World is a re-imagining of a previous project version with some new features and features.  In this version, we really wanted to highlight some of Mux’s capabilities pulled together in a practical example.  Snitch is intednded to create an experience that was interactive with elements that demonstrated moments where commerce and **Viewer** interactions could take place.

Snitch has 2 _main_ pages:

- Studio - Used by the **Content Creator** persona to go live from the browser
- Watch - Used by the **Viewer** persona to view a live stream

The **legacy** Snitch World is still accessible at [https://snitch.world/](https://snitch.world/).  If you want to use it, you’ll need to start a livestream using a broadcasting app (like OBS).

This project is intended to be deployed on Vercel and as such has a couple of considerations that need to be noted.  Primarily around environment keys and how they are managed.

## ✨Features

- Mux Studio Embed: Used on the Studio page and that allows the **Content Creator** to go live from the browser.
- Livestream Low Latency: The livestream that Studio Embed uses is configured by Snitch to use the low latency feature.
- Mux Player: Used on the Watch page.  Contains custom media elements for reactions, reaction presentation and call to action.  This is only rendered for the **Viewer** via the watch page.
- Reactions: Allows **Viewers** to react to the live stream as it is occurring in order to let other **Viewers** and **Content Creator** know their sentiments of the live stream.
- Call to Actions: The **Content Creator** has the ability to publish a Call to Action to **Viewers** with a link that displays over the player during a live stream.
- Engagement Stat Counts: Displayed on the Studio page so that the **Content Creator** can see it.
- PubNub Integration: Uses PubNub's event message bus for publishing and subscribing messages between Watch page, Watch page and Snitch backend middleware.

## 🎁 Installation

Installing this project involves setting up a `.env` file that is **committed w

Obtain Mux details

- `MUX_ACCESS_TOKEN_ID`
- `MUX_SECRET_KEY_ENCRYPTED`, which is encrypted using the steps defined in the **Secrets** section of this README
- `MUX_WEBHOOK_SIGNING_SECRET_ENCRYPTED`, which is encrypted using the steps defined in the **Secrets** section of this README
- `NEXT_PUBLIC_MUX_ENV_KEY`
- `MUX_VIDEO_SIGNING_KEY`
- `MUX_VIDEO_SIGNING_PRIVATE_KEY_ENCRYPTED`, which is encrypted using the steps defined in the **Secrets** section of this README
- `MUX_DATA_SIGNING_KEY`
- `MUX_DATA_SIGNING_PRIVATE_KEY_ENCRYPTED`, which is encrypted using the steps defined in the **Secrets** section of this README

Obtain PubNub details

- `NEXT_PUBLIC_PUBNUB_PUBLISH_KEY` and `NEXT_PUBLIC_PUBNUB_SUBSCRIBER_KEY`
- `PUBNUB_SECRET_KEY_ENCRYPTED`, which is encrypted using the steps defined in the **Secrets** section of this README

Obtain Okta details

- `OKTA_CLIENT_ID`, `OKTA_ISSUER` which are acquired from within Okta when setting up a new App
- Also acquired when creating an app is the `OKTA_CLIENT_SECRET_ENCRYPTED`, which is encrypted using the steps defined in the **Secrets** section of this README
- `NEXTAUTH_SECRET` is acquired by generating a random string which is used to hash tokens.  Follow the instructions defined on [NextAuth.js's documentation](https://next-auth.js.org/configuration/options#secret) for generating a value.

# 🔑 Secrets

Environment variables that are suffixed with `_ENCRYPTED` are encrypted using a common Key and IV.  You can use an online tool to encrypt the values for these environment variables (in the `.env.production` file) using these common keys.

To encrypt values use any utility that is capable of AES encryption and that allows you to set details defined on [Vercel](https://vercel.com/support/articles/how-do-i-workaround-vercel-s-4-kb-environment-variables-limit#step-2:-create-the-encrypted-content).

# Setting up Vercel

You will need to set the common Key and IV from the "Secrets" section as individual Environment Variables: `SERVICE_ENCRYPTION_KEY` and `SERVICE_ENCRYPTION_IV`, respectfully.
