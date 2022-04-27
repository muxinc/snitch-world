





# Secrets
Environment variables that are suffixed with `_ENCRYPTED` are encrypted using a common Key and IV.  You can use an online tool to encrypt the values for these environment variables (in the `.env.production` file) using these common keys

# Setting up Vercel

In order to allow Vercel to pull the private package for Mux Studio, create an Environment Variable `NPM_RC` with the following value (replacing `<NPM_TOKEN>` with an actual npm token)—

```
//registry.npmjs.org/:_authToken=<NPM_TOKEN>
```

Additionally, you will need to set the common Key and IV from the "Secrets" section as individual Environment Variables: `SERVICE_ENCRYPTION_KEY` and `SERVICE_ENCRYPTION_IV`, respectfully.
