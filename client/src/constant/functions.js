export const handleError = (error) => {
  if (error.message === "canceled") {
    return;
  }
  if (isAxiosError(error)) {
    if (error?.response?.status === 401) {
      localStorage.removeItem("auth");
      Swal.fire({
        showConfirmButton: false,
        allowOutsideClick: false,
        html: `
        <div class="w-full flex flex-col  px-1 pt-12 pb-8">
          <h5>Welcome Back</h5>
          <p class="mt-3">Your Session is Expired please Login Again.</p>
          <a href="/login" class="w-full btn btn-primary mt-6">Login</a>
          <a href="/signup" class="w-full btn btn-primary mt-4">Sign Up</a>
        </div>`,
      });
    } else if (error?.response?.status === 402) {
      SweetAlert.fire(AlertOptions.error(error.response.data.message));
    } else if (error.message) {
      SweetAlert.fire(AlertOptions.error(error.message));
      return;
    }
  } else {
    SweetAlert.fire(AlertOptions.error(error.message));
  }
};
