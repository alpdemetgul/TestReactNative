export const Theme = (mode: String | null | undefined) => {
  return mode === "light"
    ? {
        dark: false,
        colors: {
          primary: "#f5a623",
          background: "#eff1f4",
          card: "#fff",
          text: "#8790a2",
          border: "rgb(199, 199, 204)",
          notification: "rgb(255, 69, 58)",
        },
      }
    : {
        dark: true,
        colors: {
          primary: "#f5a623",
          background: "#303030",
          card: "#424242",
          text: "#fff",
          border: "rgb(199, 199, 204)",
          notification: "rgb(255, 69, 58)",
        },
      };
};
