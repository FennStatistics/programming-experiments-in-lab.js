const htmlForm = new lab.html.Form({
  content: 'Hello' +
    `
  please write at least 5 letters:
  <form>
  <input type="text"  name="var_form" minlength="5">
  <button type="submit">Save</button>
  </form>
  `,
  messageHandlers: {
    commit: function anonymous() {
      if (typeof jatos.jQuery === "function") {
        // If JATOS is available, send data there
        var resultJson = study.options.datastore.exportJson();
        if (typeof jatos.jQuery === "function") {
          console.log("my result data sent to JATOS first time: ", resultJson);
          jatos.submitResultData(resultJson)
          .then(() => console.log('success'))
          .catch(() => console.log('error'));
        }
      }
    }
  },
})

const htmlScreen = new lab.html.Screen({
  content: `
  Bye bye!
  `,
  timeout: 5000,
  messageHandlers: {
    epilogue: function anonymous() {
      var resultJson = study.options.datastore.exportJson();
      if (typeof jatos.jQuery === "function") {
        console.log("my result data sent to JATOS second time: ", resultJson);
        jatos.submitResultData(resultJson, jatos.startNextComponent);
        // or redirect
      }
    }
  },
})

// Define the sequence of components that define the study
const study = new lab.flow.Sequence({
  metadata: {
    title: "onScratch",
    description: "blabla",
    repository: "",
    contributors: "blub"
  },
  plugins: [
    new lab.plugins.Metadata(),
    //new lab.plugins.Debug(), // comment out finally
    //new lab.plugins.Download()
  ],
  content: [
    htmlForm,
    htmlScreen
  ],
})



// Start the study (uncomment to run)
if (typeof jatos.jQuery === "function") {
  jatos.onLoad(() => study.run());
} else {
  study.run();
}