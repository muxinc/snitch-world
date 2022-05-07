





# Secrets
Environment variables that are suffixed with `_ENCRYPTED` are encrypted using a common Key and IV.  You can use an online tool to encrypt the values for these environment variables (in the `.env.production` file) using these common keys.

To encrypt values use any utility that is capable of AES encryption and that allows you to set details defined on [Vercel](https://vercel.com/support/articles/how-do-i-workaround-vercel-s-4-kb-environment-variables-limit#step-2:-create-the-encrypted-content).

# Setting up Vercel

In order to allow Vercel to pull the private package for Mux Studio, create an Environment Variable `NPM_RC` with the following value (replacing `<NPM_TOKEN>` with an actual npm token)—

```
//registry.npmjs.org/:_authToken=<NPM_TOKEN>
```

Additionally, you will need to set the common Key and IV from the "Secrets" section as individual Environment Variables: `SERVICE_ENCRYPTION_KEY` and `SERVICE_ENCRYPTION_IV`, respectfully.
