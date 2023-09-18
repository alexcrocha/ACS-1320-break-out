# ACS 1320 Break Out

## Run Locally

### Clone the project

```bash
  git clone https://github.com/alexcrocha/ACS-1320-break-out
```

### Go to the project directory

```bash
  cd ACS-1320-break-out
```

### Install dependencies

```bash
  npm install
```

### Start the game

MacOS/Linux

```bash
  npm run start
```

Windows

```bash
  npm run start-win
```

### Run with Docker

```bash
  docker build -t break-out .
```

```bash
  docker run -p 8080:8080 break-out
```

You can then open your browser and navigate to [http://localhost:8080](http://localhost:8080) to play the game.
