<template>
  <section class="VideoBackground">
    <video
      class="opacity-0 video-background"
      autoplay
      loop
      preload="auto"
      playsinline
      :muted="muted"
      ref="video"
      :src="source"
      :type="mediaType"
    ></video>

    <div class="VideoBackground__content">
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    sources: {
      type: Array,
      required: true
    },
    img: {
      type: String
    },
    muted: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      videoRatio: null,
      sourceId: {
        type: Number,
        default: 0
      },
      mediaType: {
        type: String
      },
      startTime: {
        type: Number
      },
      endTime: {
        type: Number
      },
      currentTime: {
        type: Number
      }
    };
  },
  computed: {
    source() {
      return this.sources[this.sourceId];
    }
  },
  methods: {
    resize() {
      this.setContainerHeight();

      if (this.videoCanPlay()) {
        this.setVideoSize();
      }
    },

    videoCanPlay() {
      return !!this.$refs.video.canPlayType;
    },

    setImageUrl() {
      if (this.img) {
        this.$el.style.backgroundImage = `url(${this.img})`;
      }
    },

    setContainerHeight() {
      this.$el.style.height = `${window.innerHeight}px`;
    },

    setVideoSize() {
      var width,
        height,
        containerRatio = this.$el.offsetWidth / this.$el.offsetHeight;

      if (containerRatio > this.videoRatio) {
        width = this.$el.offsetWidth;
      } else {
        height = this.$el.offsetHeight;
      }

      this.$refs.video.style.width = width ? `${width}px` : "auto";
      this.$refs.video.style.height = height ? `${height}px` : "auto";
    },

    getMediaType(src) {
      let extension = src.split(".").pop();
      extension = extension.split("#")[0];
      return "video/" + extension;
    },

    setupVideo(video) {
      this.mediaType = this.getMediaType(this.source);

      if (this.videoCanPlay()) {
        video.oncanplay = () => {
          if (!video) return;

          this.videoRatio = video.videoWidth / video.videoHeight;
          this.setVideoSize();
          setTimeout(() => {
            video.classList.remove("opacity-0");
          }, 1500);
        };
      }

      if (this.source.split("#t=") !== undefined) {
        this.startTime = this.source
          .split("#t=")
          .pop()
          .split(",")[0];
        this.endTime = this.source
          .split("#t=")
          .pop()
          .split(",")[1];
      } else {
        this.startTime = 0;
        this.endTime = video.duration;
      }

      video.addEventListener("timeupdate", () => {
        this.currentTime = video.currentTime;
        if (this.endTime === undefined) this.endTime = video.duration;
        if (this.currentTime >= this.endTime) {
          this.nextVideo();
        }
      });
    },

    nextVideo() {
      this.$refs.video.classList.toggle("transitionVideo");
      this.sourceId =
        this.sourceId === this.sources.length - 1 ? 0 : this.sourceId + 1;
      this.setupVideo(this.$refs.video);
    }
  },

  mounted() {
    this.setImageUrl();
    this.setContainerHeight();
    this.sourceId = 0;

    this.setupVideo(this.$refs.video);

    window.addEventListener("resize", this.resize);
  },
  activated() {
    if (this.$refs.video.paused) this.$refs.video.play();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
  }
};
</script>

<style>
.VideoBackground {
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.VideoBackground video {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: opacity 1s;
}

.VideoBackground__content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
