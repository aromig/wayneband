import api from "./wp-api";

export default {
  async bgImages() {
    const bgCategory = await api.getCategory("background-rotation");
    const bgCategoryId = bgCategory.id;
    const media = (await api.getMediaByCategories([bgCategoryId], 50)).data;

    return media.map((media) => media.sizes.full.source_url);
  },

  bgVideos: [
    "/media/WayneBand_com-VideoBackground.mp4"
  ],

  formatDate(post_date, type = "long") {
    let options = {};
    if (type == "long") {
      options = {
        month: "long",
        day: "numeric",
        year: "numeric",
      };
    } else if (type == "daylong") {
      options = {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      };
    } else if (type == "short") {
      options = {
        month: "2-digit",
        day: "2-digit",
        year: "2-digit",
      };
    } else if (type == "shortest") {
      options = {
        month: "2-digit",
        day: "2-digit",
      };
    }
    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(post_date)
    );
  },
};
