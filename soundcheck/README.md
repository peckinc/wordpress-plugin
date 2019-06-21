# Soundcheck WordPress Plugin

## Workflow

You will need the docker containers running for development. These are defined in the parent directory.

```sh
docker-compose up -d
cd soundcheck
npm start
```

Then open http://localhost:8000. Any changes you make to the code get automatically detected and recompiled.

###  `npm start`
- Use to compile and run the block in development mode.
- Watches for any changes and reports back any errors in your code.

###  `npm run build`
- Use to build production code for your block inside `dist` folder.

### Credits

This plugin was bootstrapped with [Create Guten Block](https://github.com/ahmadawais/create-guten-block). It has been ejected.