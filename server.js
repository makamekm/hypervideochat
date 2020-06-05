const WebTorrent = require("webtorrent-hybrid");
const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");
const md5 = require("md5");
const createTorrent = require("create-torrent");

const limitTorrents = 5;
const port = 1111;
const torrentMap = {};

const client = new WebTorrent();

client.on("error", (err) => {
  console.error(`fatalError ${err.message || err}`);
  process.exit(1);
});

const createHotPromise = () => {
  let resolve;
  const promise = new Promise((r) => {
    resolve = r;
  });
  promise.resolve = resolve;
  return promise;
};

const deleteFolderRecursive = (p) => {
  if (fs.existsSync(p)) {
    fs.readdirSync(p).forEach((file) => {
      const curPath = path.resolve(p, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(p);
  }
};

const registerTorrent = async (fileName) => {
  const filePath = path.resolve("./resources/" + fileName);
  const fileMetaPath = path.resolve("./resources/" + fileName + ".meta");

  // const torrentFile = await new Promise((r) =>
  //   createTorrent(
  //     path.resolve(filePath, torrentMap[fileName].fileMeta.name),
  //     {
  //       // name: fileName,
  //       // urlList: [url],
  //     },
  //     (err, torrent) => {
  //       r(torrent);
  //     }
  //   )
  // );

  client.seed(filePath, (torrent) => {
    if (!torrentMap[fileName]) {
      torrent.destroy();
      return;
    }

    torrent.on("warning", (err) => {
      console.warn(err);
    });

    torrent.on("error", (err) => {
      console.error(err);
    });

    torrent.on("done", () => {
      // torrentMap[fileName].fileMeta.done = torrent.done;
      // fs.writeFileSync(
      //   fileMetaPath,
      //   JSON.stringify(torrentMap[fileName].fileMeta)
      // );
    });

    console.log("client.seed done", {
      magnetURI: torrent.magnetURI,
      ready: torrent.ready,
      paused: torrent.paused,
      done: torrent.done,
      infoHash: torrent.infoHash,
    });

    torrentMap[fileName].torrent = torrent;
    torrentMap[fileName].fileMeta.magnetURI = torrent.magnetURI;
    torrentMap[fileName].fileMeta.done = true;
    fs.writeFileSync(
      fileMetaPath,
      JSON.stringify(torrentMap[fileName].fileMeta)
    );
    torrentMap[fileName].promise.resolve();
  });
};

const destroyTorrent = (fileName) => {
  torrentMap[fileName].torrent.destroy();
  cleanTorrentDisk();
  delete torrentMap[fileName];
};

const findOldTorrent = () => {
  let oldTorrentHash;
  for (const hash in torrentMap) {
    if (
      !oldTorrentHash ||
      torrentMap[hash].timestamp < torrentMap[oldTorrentHash].timestamp
    ) {
      oldTorrentHash = hash;
    }
  }
  return oldTorrentHash;
};

const removeOldTorrent = () => {
  if (Object.keys(torrentMap).length >= limitTorrents) {
    const oldTorrentHash = findOldTorrent();
    if (oldTorrentHash) {
      destroyTorrent(oldTorrentHash);
    }
  }
};

// const addTorrent = async (fileName) => {
//   if (!torrentMap[fileName]) {
//     const filePath = path.resolve("./resources/" + fileName);
//     const fileMetaPath = path.resolve("./resources/" + fileName + ".meta");

//     const fileMeta = {
//       timestamp: +new Date(),
//       fileName: fileName,
//     };

//     removeOldTorrent();

//     torrentMap[fileName] = {
//       fileMeta,
//       promise: createHotPromise(),
//     };

//     fs.mkdirSync(path.resolve(filePath));

//     client.add(filePath, (torrent) => {
//       if (!torrentMap[fileName]) {
//         torrent.destroy();
//         return;
//       }

//       torrent.on("warning", (err) => {
//         console.warn(err);
//       });

//       torrent.on("error", (err) => {
//         console.error(err);
//       });

//       torrent.on("done", () => {
//         fileMeta.done = torrent.done;
//         fs.writeFileSync(fileMetaPath, JSON.stringify(fileMeta));
//       });

//       torrent.files.forEach((file) => {
//         const source = file.createReadStream();
//         const destination = fs.createWriteStream(
//           path.resolve(filePath, file.name)
//         );
//         source.pipe(destination);
//       });

//       console.log("client.seed done", {
//         magnetURI: torrent.magnetURI,
//         ready: torrent.ready,
//         paused: torrent.paused,
//         done: torrent.done,
//         infoHash: torrent.infoHash,
//       });

//       torrentMap[fileName].torrent = torrent;
//       torrentMap[fileName].fileMeta.magnetURI = torrent.magnetURI;
//       torrentMap[fileName].fileMeta.done = torrent.done;
//       fs.writeFileSync(fileMetaPath, JSON.stringify(fileMeta));
//       torrentMap[fileName].promise.resolve();
//     });
//   }
//   return torrentMap[fileName];
// };

const addTorrent = async (url) => {
  const fileName = md5(url);
  if (!torrentMap[fileName]) {
    const filePath = path.resolve("./resources/" + fileName);
    const fileMetaPath = path.resolve("./resources/" + fileName + ".meta");

    const fileMeta = {
      timestamp: +new Date(),
      fileName: fileName,
    };

    removeOldTorrent();

    torrentMap[fileName] = {
      fileMeta,
      promise: createHotPromise(),
    };

    !fs.existsSync(filePath) && fs.mkdirSync(filePath);

    const file = fs.createWriteStream(
      path.resolve(filePath, url.substring(url.lastIndexOf("/") + 1))
    );

    await new Promise((r) =>
      http.get(url, (response) => {
        response.pipe(file);
        response.once("close", r);
      })
    );

    // const torrentFile = await new Promise((r) =>
    //   createTorrent(
    //     path.resolve(filePath, url.substring(url.lastIndexOf("/") + 1)),
    //     {
    //       // name: fileName,
    //       // urlList: [url],
    //     },
    //     (err, torrent) => {
    //       r(torrent);
    //     }
    //   )
    // );

    client.seed(filePath, (torrent) => {
      if (!torrentMap[fileName]) {
        torrent.destroy();
        return;
      }

      torrent.on("warning", (err) => {
        console.warn(err);
      });

      torrent.on("error", (err) => {
        console.error(err);
      });

      torrent.on("done", () => {
        // fileMeta.done = torrent.done;
        // fs.writeFileSync(fileMetaPath, JSON.stringify(fileMeta));
      });

      console.log("client.seed done", {
        magnetURI: torrent.magnetURI,
        ready: torrent.ready,
        paused: torrent.paused,
        done: torrent.done,
        infoHash: torrent.infoHash,
      });

      torrentMap[fileName].torrent = torrent;
      torrentMap[fileName].fileMeta.magnetURI = torrent.magnetURI;
      torrentMap[fileName].fileMeta.done = true;
      torrentMap[fileName].fileMeta.name = url.substring(
        url.lastIndexOf("/") + 1
      );
      fs.writeFileSync(fileMetaPath, JSON.stringify(fileMeta));
      torrentMap[fileName].promise.resolve();
    });
  }
  return torrentMap[fileName];
};

const cleanTorrentDisk = (fileName) => {
  deleteFolderRecursive(path.resolve("./resources/", fileName));
  fs.unlinkSync(path.resolve("./resources/", fileName + ".meta"));
};

const restoreTorrentMap = () => {
  const files = fs.readdirSync(path.resolve("./resources/"));
  files.forEach((file) => {
    if (file.endsWith(".meta")) {
      const fileName = file.replace(/\.meta$/i, "");
      const fileMeta = JSON.parse(
        fs.readFileSync(path.resolve("./resources/", file))
      );
      if (fileMeta.done) {
        torrentMap[fileName] = {
          fileMeta,
          promise: createHotPromise(),
        };
        registerTorrent(fileName);
      } else {
        cleanTorrentDisk(fileName);
      }
    }
  });
};

const runHttpServer = () => {
  http
    .createServer(async (request, response) => {
      const pathname = url.parse(request.url).pathname;

      if (pathname.startsWith("/register/")) {
        response.writeHead(200, {
          "Content-Type": "text/json",
          "Access-Control-Allow-Origin": "*",
          "X-Powered-By": "nodejs",
        });
        const url = pathname.replace(/^\/register\//i, "");
        const torrent = await addTorrent(url);
        await torrent.promise;
        response.write(torrent.fileMeta.magnetURI);
        // response.write(
        //   JSON.stringify({
        //     result: torrent.fileMeta.magnetURI,
        //     pathname: url,
        //   })
        // );
      } else if (pathname.startsWith("/torrent/")) {
        response.writeHead(200, {
          "Content-Type": "text/html",
          "Access-Control-Allow-Origin": "*",
          "X-Powered-By": "nodejs",
        });
        const url = pathname.replace(/^\/torrent\//i, "");
        // const fileName = url.substring(url.lastIndexOf("/") + 1);
        await new Promise((r) =>
          createTorrent(
            path.resolve(
              "./resources/aa56e5c251440025119ecc4f793cfb6a/BigBuckBunny.mp4"
            ),
            {
              // name: fileName,
              urlList: [url],
            },
            (err, torrent) => {
              response.write(torrent.toString("hex"));
              // response.write(torrent);
              r(torrent);
            }
          )
        );
      } else {
        response.writeHead(200, {
          "Content-Type": "text/json",
          "Access-Control-Allow-Origin": "*",
          "X-Powered-By": "nodejs",
        });
        response.write(
          JSON.stringify({
            result: "test",
            pathname: pathname,
          })
        );
      }
      response.end();
    })
    .listen(port, "0.0.0.0");
};

const run = async () => {
  restoreTorrentMap();
  runHttpServer();
};

run();
