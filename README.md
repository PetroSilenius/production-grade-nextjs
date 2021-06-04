
# Production-Grade Next.js course

My repo for the course Production-Grade Next.js by Scott Moss in Frontend Masters.
The course can be found [here](https://frontendmasters.com/courses/production-next/) and the content is briefly described below

>Take Next.js to the next level through building a production-ready, full-stack React app. You’ll add authentication to your app, add the ability to generate hundreds of pages performantly, preview your content, query a database, and use a CMS with Next.js. Then deploy your app to production using the Vercel platform. No matter if you're making a blog, marketing page, or a full-stack app, Next.js has the tools for you!

[Curriculum](https://production-grade-nextjs.vercel.app)

### Final product
The final product called "Known" is a notion / wiki app rip off and it has logged in app view as well as an open blog site and landing page.

The app is available on https://production-grade-nextjs-petrosilenius.vercel.app/

### Built With

* [Next.js](https://nextjs.org/)
* [Vercel](https://vercel.com/)
* [MongoDB](https://www.mongodb.com/)
* [Evergreen](https://evergreen.segment.com/)

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
1. npm
  ```sh
  npm install npm@latest -g
  npm install yarn
  ```
2. Create a new MongoDB Atlas cluster
- Create new user with a password for database access
- Allow network access from `0.0.0.0/0`
- Connect your database to the application by copying the connection code to `.env.local` and replace `password` with your user's password

3. Create a new Github OAuth app by navigating to [https://github.com/settings/developers](https://github.com/settings/developers)
- Set the homepage URL to the anything like `https://www.google.com`
- Set the callback URL to `http://localhost:1234`
- Copy the Client ID and Client Secret to `.env.local`

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/PetroSilenius/production-grade-nextjs.git
   ```
2. Install NPM packages
   ```sh
   yarn
   ```

## Usage

Start up the local dev env
   ```sh
   yarn dev
   ```

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



## Contact

Petro Silenius - [@PetroSilenius](https://github.com/PetroSilenius) - petro.silenius@gmail.com


## Acknowledgements

* [Scott Moss](https://frontendmasters.com/teachers/scott-moss/)
