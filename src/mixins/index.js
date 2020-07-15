
export const mixin = {

  methods: {
    notify(title, message) {
      this.$notify({
        title: title,
        message: message,
        duration: 3000,
        position: "top-right"
      });
    }
  }
};