const Recorder = require('rtsp-video-recorder');
const fs = require('fs');
const RecorderEvents = Recorder.RecorderEvents
const main = () => {
  const recorder = new Recorder.Recorder('rtsp://FZCR8elr:LOSEvOzJos3P7yJU@192.168.0.15:554/live/ch0', './media', {
    title: 'Test Camera',
    segmentTime: 600*2,
    filePattern: '%Y年%m月%d日%H時%M分%S秒',
    dirSizeThreshold: "200M"
  }).on(RecorderEvents.STARTED, (ev) => {
    console.log("STARTED", ev)
  })
    .on(RecorderEvents.STOPPED, (...ev) => {
      console.log("STOPPED", ev)

      if (ev[1] === "space_full") {
        //don dep o cung
        const files = fs.readdirSync("./media")
          .sort((x, y) => ((new Date(x)).getTime() - (new Date(y)).getTime()));

        try {
          fs.rmSync("./media/" + files[0], { recursive: true, force: true });
          fs.rmSync("./media/" + files[1], { recursive: true, force: true });
        } catch (error) {
          console.log(error)
        }

        console.log(files);
        main();
      };
    })
    .on(RecorderEvents.FILE_CREATED, (ev) => {
      console.log("FILE_CREATED", ev)
    })
    .on(RecorderEvents.SPACE_FULL, (ev) => {
      console.log("SPACE_FULL", ev)
    });
  recorder.start();
}

main();
