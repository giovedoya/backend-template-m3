function showUploadWidget() {
  cloudinary.openUploadWidget(
    {
      cloudName: "ddwbhu9l2",
      uploadPreset: "q8tnv9sn",
      sources: ["local", "url"],
      googleApiKey: "<image_search_google_api_key>",
      showAdvancedOptions: true,
      cropping: false,
      multiple: true,
      defaultSource: "local",
      styles: {
        palette: {
          window: "#FFFFFF",
          sourceBg: "#f4f4f5",
          windowBorder: "#90a0b3",
          tabIcon: "#000000",
          inactiveTabIcon: "#555a5f",
          menuIcons: "#555a5f",
          link: "#111827",
          action: "#339933",
          inProgress: "#0433ff",
          complete: "#339933",
          error: "#cc0000",
          textDark: "#000000",
          textLight: "#fcfffd",
        },
        fonts: { default: null, "sans-serif": { url: null, active: true } },
      },
    },
    (err, info) => {
      if (!err) {
        console.log("Upload Widget event - ", info);
      }
    }
  );
}
