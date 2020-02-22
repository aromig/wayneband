<template>
  <div>
    <transition name="modal-fade">
      <div
        v-if="showModal"
        class="overflow-x-hidden overflow-y-auto -m-4 fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex modal-backdrop"
        v-on:click="toggleModal()"
      >
        <div
          :class="
            'mb-6 relative w-auto mx-auto md:max-w-5xl max-h-full ' +
              orientation
          "
        >
          <!--content-->
          <div
            class="border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none z-50"
          >
            <!--header-->
            <div class="flex items-start justify-between p-4">
              <button
                class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                v-on:click="toggleModal()"
              >
                <span
                  class="bg-transparent text-black opacity-5 h-6 w-6 text-3xl block outline-none focus:outline-none flex items-center"
                >
                  <svg
                    class="fill-current h-6 w-6 text-black hover:text-red-700"
                    style="transform: scale(1.5)"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path
                      d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
                    />
                  </svg>
                </span>
              </button>
              <slot name="title">
                <h3 class="text-3xl font-semibold">
                  {{ title }}
                </h3>
              </slot>
            </div>
            <!--body-->
            <div class="relative p-3 flex-auto">
              <slot name="body"></slot>
            </div>
            <!--footer-->
            <div class="flex items-center justify-end p-3">
              <slot name="footer"> </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "modal",
  props: {
    showModal: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: null
    },
    orientation: {
      type: String,
      default: "landscape"
    },
    photoIndex: {
      type: Number,
      default: null
    }
  },
  data() {
    return {};
  },
  methods: {
    toggleModal: function() {
      this.$emit("close");
    }
  },
  mounted() {
    window.addEventListener("keydown", e => {
      if (e.keyCode === 37) {
        // Left Arrow
        this.$emit("previous", this.photoIndex);
      }
      if (e.keyCode === 39) {
        // Right Arrow
        this.$emit("next", this.photoIndex);
      }
      if (e.keyCode === 27) {
        // Escape Key
        this.toggleModal();
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.75);
}

.portrait {
  max-width: 28rem;
  transform: scale(0.9);
}
.landscape {
  transform: scale(0.9);
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
