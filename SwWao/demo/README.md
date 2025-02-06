# Demo project for a Node app that uses Express and TypeScript

This is project is created for lection 01 Node

To recreate this project flollow this guide:

## How to set up a new Node + Express project that uses TypeScript

1. Crate a folder with the project name

   `mkdir express-demo`

2. Create a package.json file

   `npm init`

3. Install Typescript locally

   `npm i -D typescript`

4. Add types for Node

   `npm i -D @types/node`

5. Install base config for node 22

   `npm i –D @tsconfig/node22`

6. Add a new file in the root of the project named tsconfig.json

   And with this content:

   ```javascript
   {
     "extends": "@tsconfig/node22/tsconfig.json",
     "compilerOptions": {
       "preserveConstEnums": true,
       "outDir": "dist",
       "module": "NodeNext",
       "moduleResolution": "NodeNext",
       "sourceMap": true
     },
     "include": [
       "src/**/*"
     ],
     "exclude": [
       "**/*.test.ts"
     ]
   }
   ```

7. Install tsx to run ts files in Node using a runner

   `npm i -D tsx`

8. Install ESlint

   `npm i -D eslint typescript-eslint @eslint/js`

9. Add a new file in the root of the project named eslint.config.mjs

   And with this content:

   ```javascript
   import eslint from '@eslint/js';
   import tseslint from 'typescript-eslint';
   import globals from 'globals';
   
   export default tseslint.config(
     eslint.configs.recommended,
     tseslint.configs.recommended,
     {
       languageOptions: {
         globals: {
           ...globals.node,
           ...globals.jest
         }
       }
     }
   );
   ```

10. Add Express

    `npm i express@^5`

11. Add types for Express

    `npm i -D @types/express`

12. Install Vitest (you might use Nodes internal test runner instead)

    `npm i -D vitest`

13. Create your projects folder structure:

    Create 3 folders in the root of the project:
      - `src` for source files
      - `dist` for output from TypeScript (distribution)
      - `test` for test files

    Create sub folders in the src folder suitable for your project. This might be:
      - routes
      - models
      - services
      - dataAccess

14. Create the main file for your server in the src folder with the name `server.ts`.  
    You can give it any name you like, but then you must change the scripts to match your name for the main file.

15. Start by entering the “Hello World” for express in the main file:

    ```javascript
    import express from 'express';
    const app = express()
    const port = 3000

    app.get('/', (req, res) => {
      res.send('Hello World!')
    })
 
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
    ```

16. Update the scripts in package.json

    ```javascript
    "scripts": {
      "build": "npx tsc",
      "start": "node dist/server.js",
      "dev": "npx tsx watch src/server.ts",
      "lint": "eslint . --fix",
      "test": "vitest",
      "test:ui": "vitest --ui"
    },
    ```

17. Init git repository

    `git init`

18. Download a .gitignore file suitable for a node project:
    Open the page <https://github.com/github/gitignore/blob/main/Node.gitignore>
    And then download the raw file, and place the file in the root of the project with the name .gitignore

19. Add files to repo

    `git add .`

    `git commit -m "Initial commit"`

20. You are now ready to test if everything is setup correctly:

    Enter `npm run build`

    Enter `npm start`

    Open a browser tab and navigate to localhost:3000 (should show Hello World)

    Close the server with `ctrl-c` in the terminal

    Start developing with `npm run dev`

    Refresh you browser to verify that your server is also working in dev mode

21. Add middleware for reading json data in the body of a POST or PUT request

    ```javascript
    app.use(express.json())
    ```

22. Optionally add:

    - Cors (to enable access from other origins)
    - Dotenvx (to read environtment variables from .env files)
    - Morgan (middleware that logs requests)
    - Etc.

23. You are ready to roll
