export const AlertOptions = {
  text: "",
  title: "",
  icon: "success",
  timer: 5000,
  timerProgressBar: true,
  backdrop: true,
  confirmButtonColor: "#1E3769",
  success: function (message) {
    this.title = "Success!";
    this.icon = "success";
    this.text = message;
    return this;
  },
  error: function (message) {
    this.title = "Error!";
    this.icon = "error";
    this.text = message;
    return this;
  },
  warn: function (message) {
    this.title = "Warning!";
    this.icon = "warning";
    this.text = message;
    return this;
  },
};
