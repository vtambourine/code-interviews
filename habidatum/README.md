This is sample project for Habidatum

## Usage

Build the Docker image and launch the container:

```
docker build -t habidatum .
docker run --rm -t -p 3000:3000 -p 3001:3001 habidatum
```

Notice the ports forwarding, it's important!

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
