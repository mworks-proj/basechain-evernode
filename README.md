# Basechain Evernode Commerce Kit

Welcome to the Basechain Evernode Commerce Kit deployment guide! This document will walk you through deploying your very own onchain store using OnchainKit atop the Xahau Evernode SDK, showcasing the power of decentralized app deployment. Any chain, any language — deployed seamlessly on Xahau/Evernode.

## **Table of Contents**

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Repository Setup](#repository-setup)
4. [Environment Variables](#environment-variables)
5. [Enabling Checkout](#enabling-checkout)
6. [Docker Deployment](#docker-deployment)
7. [Docker Secrets Setup](#docker-secrets-setup)
8. [Evernode Deployment](#evernode-deployment)
9. [Testing and Verification](#testing-and-verification)
10. [Security Best Practices](#security-best-practices)
11. [Support and Contributions](#support-and-contributions)
12. [License](#license)

---

## **Overview**

This repository is designed for developers to deploy a fully customizable store on an Evernode instance using Docker. You can fork this repo, customize your store, and deploy it seamlessly.

---

## **Prerequisites**

Ensure you have the following tools installed locally:

- [Docker](https://docs.docker.com/get-docker/)
- [Node.js](https://nodejs.org/) (v20.x recommended)
- [pnpm](https://pnpm.io/) (Package manager)
- GitHub account for repository management

Additionally, you need the following API keys and accounts:

- [Coinbase Commerce API Key](https://beta.commerce.coinbase.com/) (For payment processing)
- [Coinbase Developer Platform OnchainKit API Key](https://portal.cdp.coinbase.com/products/onchainkit)

---

## **Repository Setup**

1. Clone this repository:

   ```bash
   git clone https://github.com/mworks-proj/basechain-evernode
   cd basechain-evernode
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Build the project:

   ```bash
   pnpm run build
   ```

---

## **Environment Variables**

You need to set up the following environment variables in a `.env` file or through Docker secrets:

```env
NEXT_PUBLIC_COINBASE_COMMERCE_API_KEY=YOUR_COINBASE_API_KEY
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=YOUR_GOOGLE_ANALYTICS_ID
NEXT_PUBLIC_ONCHAINKIT_API_KEY=YOUR_ONCHAINKIT_API_KEY
NEXT_PUBLIC_ENVIRONMENT=https://YOUR_CUSTOM_STORE_URL
```

Create this file in the project root or set these as Docker secrets if deploying securely.

---

## **Enabling Checkout**

By default, the checkout functionality is disabled to prevent transactions in non-production environments. To enable the checkout flow for local development:

1. Uncomment the relevant code in the `OnchainStoreCart.tsx` component.
2. Remove the `OnchainStoreModal` component and logic as well as the `MockCheckoutButton`. These are for demo purposes only.
3. Replace the placeholder `products` in the `OnchainStoreProvider` with your own product items.

Refer to the [Checkout Documentation](https://onchainkit.xyz/checkout/checkout) for more details.

---

## **Docker Deployment**

1. Build the Docker image:

   ```bash
   docker build -t your-dockerhub-username/basechain-evernode-commerce-kit:latest .
   ```

2. Push the image to Docker Hub:

   ```bash
   docker push your-dockerhub-username/basechain-evernode-commerce-kit:latest
   ```

3. Run the container locally for testing:

   ```bash
   docker run -d \
     --name basechain-evernode-commerce-kit \
     -e NEXT_PUBLIC_COINBASE_COMMERCE_API_KEY=YOUR_COINBASE_API_KEY \
     -e NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=YOUR_GOOGLE_ANALYTICS_ID \
     -e NEXT_PUBLIC_ONCHAINKIT_API_KEY=YOUR_ONCHAINKIT_API_KEY \
     -e NEXT_PUBLIC_ENVIRONMENT=https://YOUR_CUSTOM_STORE_URL \
     -p 3000:3000 \
     your-dockerhub-username/basechain-evernode-commerce-kit:latest
   ```

---

## **Docker Secrets Setup**

1. Initialize Docker Swarm if not already done:

   ```bash
   docker swarm init
   ```

2. Create Docker secrets for environment variables:

   ```bash
   echo "YOUR_COINBASE_API_KEY" | docker secret create coinbase_api_key -
   echo "YOUR_GOOGLE_ANALYTICS_ID" | docker secret create google_analytics_id -
   echo "YOUR_ONCHAINKIT_API_KEY" | docker secret create onchainkit_api_key -
   echo "https://YOUR_CUSTOM_STORE_URL" | docker secret create environment_url -
   ```

3. Deploy the Docker service with secrets:

   ```bash
   docker service create \
     --name basechain-evernode-commerce-kit \
     --secret source=coinbase_api_key,target=coinbase_api_key \
     --secret source=google_analytics_id,target=google_analytics_id \
     --secret source=onchainkit_api_key,target=onchainkit_api_key \
     --secret source=environment_url,target=environment_url \
     -p 3000:3000 \
     your-dockerhub-username/basechain-evernode-commerce-kit:latest
   ```

---

## **Evernode Deployment**

1. **Submit Docker Image to Evernode Host:**

   - Open an Evernode web interface from the list of live test hosts:
     - [https://evernode1.zerp.network/](https://evernode1.zerp.network/) (x4)
     - [https://takeme1.runonevernode.cloud/](https://takeme1.runonevernode.cloud/) (x2)
     - [https://x1.buildonevernode.cloud/](https://x1.buildonevernode.cloud/) (x28)
     - [https://snitznode1.snitzcreek.my/](https://snitznode1.snitzcreek.my/) (x8)

     **Note:** These hosts are for testing purposes only and are subject to updates.

   - Select an empty `Instance` section.

   - Add the Docker Hub image URL in the following format:
     ```
     your-dockerhub-username/basechain-evernode-commerce-kit:latest
     ```

   - Enter any required moments for testing deployment.

2. **Monitor Deployment:**

   - Allow time for the Evernode host to update and deploy your Docker image.
   - Monitor the deployment logs for progress.

---

## **Testing and Verification**

1. Visit the store at the specified Evernode domain.
2. Verify that the pages load correctly.
3. Ensure API connections work by simulating transactions.
4. Check logs using:
   ```bash
   docker service logs basechain-evernode-commerce-kit
   ```

---

## **Security Best Practices**

- **Use Docker Secrets:** Protect sensitive environment variables by setting them as Docker secrets.
- **Avoid Hardcoding Keys:** Ensure API keys are managed securely using environment variables or secrets.
- **Restrict Access:** Limit access to deployment environments and ensure role-based permissions.

---

## **Support and Contributions**

We welcome contributions! Feel free to submit issues, pull requests, or suggestions.

---

## **License**

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

