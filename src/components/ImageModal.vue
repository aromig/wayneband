<template>
  <div>
    <transition name="modal-fade">
      <div
        v-if="showModal"
        class="fixed inset-0 z-50 flex items-center justify-center -m-4 overflow-x-hidden overflow-y-auto outline-none focus:outline-none modal-backdrop"
        v-on:click="toggleModal()"
      >
        <div
          :class="
            orientation + 'mb-6 relative w-auto mx-auto md:max-w-5xl max-h-full'
          "
        >
          <!--content-->
          <div
            class="relative z-50 flex flex-col w-full bg-white border-0 shadow-lg outline-none focus:outline-none"
          >
            <!--header-->
            <div class="flex items-start justify-between p-4">
              <button
                class="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
                v-on:click="toggleModal()"
              >
                <span
                  class="flex items-center block w-6 h-6 text-3xl text-black bg-transparent outline-none opacity-5 focus:outline-none"
                >
                  <svg
                    class="w-6 h-6 text-black fill-current hover:text-red-700"
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
            <div class="relative flex-auto p-3">
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
