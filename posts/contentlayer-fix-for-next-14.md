---
title: Contentlayer error while installing on Next.js 14+
created: 2024-10-15
author: Anoop Kini
---

If you are facing issues with [Contentlayer](https://contentlayer.dev) after upgrading to [Next.js](https://next.js.org) 14+ or unable to install Contentlayer on Next.js 14+ then this post lays out a simple update in the `package.json` file to help you move forward.

Thanks to [Tomas Laurinavicius](https://tomaslau.com/blog/upgrade-nextjs-contentlayer-fix) for the original post. 

The error is because Contentlayer has inbuilt dependency on the Next.js version. 

We can fix the dependency error by providing the `overrides` value right after `devDependencies` in the package.json file at the root of your project.

``` json
...
    "overrides": {
        "next-contentlayer": {
            "next": "$next"
        }
    }
...
```

The overall package.json file looks like follows. 

``` json
// /package.json
...
        "unique-names-generator": "^4.7.1"
    },
    "devDependencies": {
        "@tailwindcss/typography": "^0.5.15",
        "@types/node": "22.7.5",
        "@types/react": "18.3.11",
        "autoprefixer": "^10.4.18",
        "daisyui": "^4.12.8",
        "eslint": "8.57.1",
        "eslint-config-next": "14.2.15",
        "postcss": "^8.4.36",
        "tailwindcss": "^3.4.1"
    },
    "overrides": {
        "next-contentlayer": {
            "next": "$next"
        }
    }
}
```

Now you can continue with your upgrade / install as per the docs.

Hope this helps. Continue hacking! 