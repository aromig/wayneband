import request from "axios";
import mapsApi from "@/gmaps-api";

export default {
  baseUrl: "https://www.wayneband.com/wp-json/wp/v2",
  // acfUrl: "http://wayneband.com/wp-json/acf/v1",

  async getPage(slug) {
    let page = {};

    request.defaults.baseURL = this.baseUrl;
    await request.get(`/pages?slug=${slug}`).then((response) => {
      const results = response.data[0];

      page = {
        id: results.id,
        content: results.content.rendered,
        author: results.author,
        date: results.date,
        date_gmt: results.date_gmt,
        excerpt: results.excerpt.rendered,
        featured_media: results.featured_media,
        guid: results.guid.rendered,
        link: results.link,
        slug: results.slug,
        title: results.title.rendered,
        parent: results.parent,
      };
    });

    return page;
  },

  async getPost(slug) {
    let post = {};

    request.defaults.baseURL = this.baseUrl;
    await request.get(`/posts?slug=${slug}`).then((response) => {
      const results = response.data[0];
      const date = new Date(results.date);

      post = {
        id: results.id,
        date: results.date,
        date_gmt: results.date_gmt,
        title: results.title.rendered,
        author: results.author,
        excerpt: results.excerpt.rendered,
        content: results.content.rendered,
        featured_media: results.featured_media,
        guid: results.guid.rendered,
        link: results.link,
        slug: results.slug,
        path: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}/${
          results.slug
        }`,
      };
    });

    return post;
  },

  async getPages(parent_id = null) {
    let pageList = {};

    request.defaults.baseURL = this.baseUrl;
    await request.get(`/pages?parent=${parent_id}`).then((response) => {
      const results = response.data;
      const pages = {
        total: response.headers["x-wp-total"],
        totalPages: response.headers["x-wp-totalpages"],
        data: results.map((item) => {
          return {
            id: item.id,
            parent: item.parent,
            date: item.date,
            date_gmt: item.date_gmt,
            title: item.title.rendered,
            author: item.author,
            excerpt: item.excerpt.rendered,
            content: item.content.rendered,
            featured_media: item.featured_media,
            guid: item.guid.rendered,
            link: item.link,
            slug: item.slug,
            path: `/${item.slug}`,
          };
        }),
      };
      pageList = pages;
    });

    return pageList;
  },

  async getPosts(page = 1, perPage = 10, keywords = "") {
    let postList = {};

    request.defaults.baseURL = this.baseUrl;
    await request
      .get(`/posts?page=${page}&per_page=${perPage}&search=${keywords}`)
      .then((response) => {
        const results = response.data;
        const posts = {
          total: response.headers["x-wp-total"],
          totalPages: response.headers["x-wp-totalpages"],
          data: results.map((item) => {
            const date = new Date(item.date);
            return {
              id: item.id,
              date: item.date,
              date_gmt: item.date_gmt,
              title: item.title.rendered,
              author: item.author,
              excerpt: item.excerpt.rendered,
              content: item.content.rendered,
              featured_media: item.featured_media,
              guid: item.guid.rendered,
              link: item.link,
              slug: item.slug,
              path: `${date.getFullYear()}/${date.getMonth() +
                1}/${date.getDate()}/${item.slug}`,
            };
          }),
        };
        postList = posts;
      });

    return postList;
  },

  async getPostsByCategory(category, page = 1, perPage = 10, keywords = "") {
    let postList = {};

    request.defaults.baseURL = this.baseUrl;
    await request
      .get(
        `/posts?page=${page}&per_page=${perPage}&categories=${category}&keywords=${keywords}`
      )
      .then((response) => {
        const results = response.data;
        const posts = {
          total: response.headers["x-wp-total"],
          totalPages: response.headers["x-wp-totalpages"],
          data: results.map((item) => {
            const date = new Date(item.date);
            return {
              id: item.id,
              date: item.date,
              date_gmt: item.date_gmt,
              title: item.title.rendered,
              author: item.author,
              excerpt: item.excerpt.rendered,
              content: item.content.rendered,
              featured_media: item.featured_media,
              guid: item.guid.rendered,
              link: item.link,
              slug: item.slug,
              path: `${date.getFullYear()}/${date.getMonth() +
                1}/${date.getDate()}/${item.slug}`,
            };
          }),
        };
        postList = posts;
      });
    return postList;
  },

  async getCategory(slug) {
    let category = {};
    request.defaults.baseURL = this.baseUrl;
    await request.get(`/categories?slug=${slug}`).then((response) => {
      const results = response.data[0];
      category = {
        id: results.id,
        name: results.name,
        slug: results.slug,
      };
    });

    return category;
  },

  async getCategories() {
    let categories = [];
    request.defaults.baseURL = this.baseUrl;
    await request.get(`/categories`).then((response) => {
      const results = [...response.data];
      categories = results;
    });

    return categories;
  },

  async getMedia(id) {
    let media = {};

    request.defaults.baseURL = this.baseUrl;
    await request.get(`/media/${id}`).then((response) => {
      const results = response.data;

      media = {
        id: results.id,
        date: results.date,
        date_gmt: results.date_gmt,
        guid: results.guid.rendered,
        title: results.title.rendered,
        description: results.description.rendered,
        caption: results.caption.rendered,
        alt_text: results.alt_text,
        media_type: results.media_type,
        mime_type: results.mime_type,
        image_meta: results.media_details.image_meta,
        sizes: results.media_details.sizes,
        /* .sizes includes:
             .thumbnail/medium/medium_large/full
                .file
                .width
                .height
                .mime_type
                .source_url
          */
        source_url: results.source_url,
        related_post: results.post,
        orientation:
          results.media_details.width >= results.media_details.height
            ? "landscape"
            : "portrait",
      };
    });

    return media;
  },

  async getMediaByCategories(category_ids, limit = 10) {
    let query = "/media?";
    category_ids.forEach((id) => {
      query += `categories=${id}&`;
    });
    query += `per_page=${limit}`;

    let mediaList = [];

    request.defaults.baseURL = this.baseUrl;
    await request.get(query).then((response) => {
      const results = response.data;
      const media = results.map((item) => {
        return {
          id: item.id,
          date: item.date,
          date_gmt: item.date_gmt,
          guid: item.guid.rendered,
          title: item.title.rendered,
          description: item.description.rendered,
          caption: item.caption.rendered,
          alt_text: item.alt_text,
          media_type: item.media_type,
          mime_type: item.mime_type,
          sizes: item.media_details.sizes,
          /* .sizes includes:
           .thumbnail/medium/medium_large/full
              .file
              .width
              .height
              .mime_type
              .source_url
        */
          source_url: item.source_url,
          related_post: item.post,
          orientation:
            item.media_details.width >= item.media_details.height
              ? "landscape"
              : "portrait",
        };
      });
      mediaList = {
        total: response.headers["x-wp-total"],
        totalPages: response.headers["x-wp-totalpages"],
        data: media,
      };
    });

    return mediaList;
  },

  async getMediaByPageId(page_id, limit = 10) {
    let mediaList = [];

    request.defaults.baseURL = this.baseUrl;
    await request
      .get(`/media?parent=${page_id}&per_page=${limit}`)
      .then((response) => {
        const results = response.data;
        const media = results.map((item) => {
          return {
            id: item.id,
            date: item.date,
            date_gmt: item.date_gmt,
            guid: item.guid.rendered,
            title: item.title.rendered,
            description: item.description.rendered,
            caption: item.caption.rendered,
            alt_text: item.alt_text,
            media_type: item.media_type,
            mime_type: item.mime_type,
            sizes: item.media_details.sizes,
            /* .sizes includes:
              .thumbnail / medium / medium_large / full
              .file
              .width
              .height
              .mime_type
              .source_url
             */
            source_url: item.source_url,
            related_post: item.post,
            orientation:
              item.media_details.width >= item.media_details.height
                ? "landscape"
                : "portrait",
          };
        });
        mediaList = {
          total: response.headers["x-wp-total"],
          totalPages: response.headers["x-wp-totalpages"],
          data: media,
        };
      });

    return mediaList;
  },

  async getEnviraGalleries(page = 1, perPage = 10) {
    let galleryList = [];

    await request
      .get(
        `/envira-gallery?page=${page}&per_page=${perPage}&orderby=date_taken&order=desc`
      )
      .then((response) => {
        const results = [...response.data];
        const galleries = {
          total: response.headers["x-wp-total"],
          totalPages: response.headers["x-wp-totalpages"],
          data: results.map((item) => {
            return {
              id: item.id,
              date: item.date,
              date_gmt: item.date_gmt,
              guid: item.guid.rendered,
              slug: item.slug,
              title: item.title.rendered,
              gallery_data: item.gallery_data.gallery,
              date_taken: item.acf.date_taken,
            };
          }),
        };
        galleryList = galleries;
      });

    return galleryList;
  },

  async getEnviraGallery(slug) {
    let gallery = {};

    request.defaults.baseURL = this.baseUrl;
    await request.get(`/envira-gallery?slug=${slug}`).then((response) => {
      const results = response.data[0];
      gallery = {
        id: results.id,
        date: results.date,
        date_gmt: results.date_gmt,
        guid: results.guid.rendered,
        slug: results.slug,
        title: results.title.rendered,
        gallery_data: results.gallery_data.gallery,
      };
    });

    return gallery;
  },

  async getTagsBySlug(slug) {
    let tagList = "";

    request.defaults.baseURL = this.baseUrl;
    await request.get(`/tags?slug=${slug}`).then((response) => {
      const results = response.data;
      const tags = results.map((item) => {
        return {
          id: item.id,
          name: item.name,
          slug: item.slug,
          description: item.description,
          count: item.count,
        };
      });
      tagList = tags;
    });

    return tagList;
  },

  async getVideos(tags = [], limit = 100, order = "desc") {
    let query = `/videos?orderby=video_date&order=${order}&`;
    tags.forEach((id) => {
      query += `tags=${id}&`;
    });
    query += `per_page=${limit}`;

    let videoList = [];

    request.defaults.baseURL = this.baseUrl;
    await request.get(query).then((response) => {
      const results = response.data;
      const videos = results.map((item) => {
        return {
          id: item.id,
          date: item.date,
          date_gmt: item.date_gmt,
          guid: item.guid.rendered,
          title: item.title.rendered,
          slug: item.slug,
          featured_media: item.featured_media,
          video_url: item.acf.video_url,
          video_date: item.acf.video_date,
          width: item.acf.width,
          height: item.acf.height,
          tags: item.tags,
          featured_media_url: "",
        };
      });
      videoList = {
        total: response.headers["x-wp-total"],
        totalPages: response.headers["x-wp-totalpages"],
        data: videos,
      };
    });

    return videoList;
  },

  async getResourceLinks() {
    let query = `/resource_link?orderby=sort_order&order=asc`;

    let linkList = {};

    request.defaults.baseURL = this.baseUrl;
    await request.get(query).then((response) => {
      const results = response.data;
      const links = {
        total: response.headers["xp-wp-total"],
        totalPages: response.headers["xp-wp-totalpages"],
        data: results.map((item) => {
          return {
            id: item.id,
            title: item.title.rendered,
            hyperlink: item.acf.hyperlink,
            sort_order: item.acf.sort_order,
            faClasses: item.acf.fa_classes,
          };
        }),
      };
      linkList = links;
    });

    return linkList;
  },

  async getEvents(page = 1, perPage = 100, order = "desc") {
    let query = `/events?orderby=event_date&order=${order}`;
    query += `&page=${page}&per_page=${perPage}`;

    let eventList = {};

    request.defaults.baseURL = this.baseUrl;
    await request.get(query).then((response) => {
      const results = response.data;
      const events = {
        total: response.headers["xp-wp-total"],
        totalPages: response.headers["xp-wp-totalpages"],
        data: results.map((item) => {
          return {
            id: item.id,
            date: item.date,
            date_gmt: item.date_gmt,
            guid: item.guid.rendered,
            title: item.title.rendered,
            slug: item.slug,
            content: item.content.rendered,
            featured_media: item.featured_media,
            link: item.link,
            tags: item.tags,
            event_date: item.acf.event_date,
            event_time_start: item.acf.event_time_start,
            event_time_end: item.acf.event_time_end,
            event_location_name: item.acf.location_name,
            event_location: item.acf.event_location,
          };
        }),
      };
      eventList = events;
    });

    return eventList;
  },

  async getEvent(slug) {
    let event = {};

    request.defaults.baseURL = this.baseUrl;
    await request.get(`/events?slug=${slug}`).then((response) => {
      const results = response.data[0];
      event = {
        id: results.id,
        date: results.date,
        date_gmt: results.date_gmt,
        guid: results.guid.rendered,
        title: results.title.rendered,
        slug: results.slug,
        content: results.content.rendered,
        featured_media: results.featured_media,
        link: results.link,
        tags: results.tags,
        event_date: results.acf.event_date,
        event_time_start: results.acf.event_time_start,
        event_time_end: results.acf.event_time_end,
        event_location_name: results.acf.location_name,
        event_location: results.acf.event_location,
        event_full_address: `${results.acf.event_location.street_number} ${results.acf.event_location.street_name}, ${results.acf.event_location.city}, ${results.acf.event_location.state}`,
        event_map_url: `https://maps.google.com/maps?q=${results.acf.event_location.street_number}%20${results.acf.event_location.street_name}%2C%20${results.acf.event_location.city}%2C%20${results.acf.event_location.state}&t=&z=15&ie=UTF&iwloc=&output=embed&key=${mapsApi.mapsApiKey}`,
        related_link: results.acf.related_link,
      };
    });

    return event;
  },

  async getHalftimeUSAEvents(page = 1, perPage = 100, order = "desc") {
    let query = `/halftimeusa?orderby=event_date&order=${order}`;
    query += `&page=${page}&per_page=${perPage}`;

    let eventList = {};

    request.defaults.baseURL = this.baseUrl;
    await request.get(query).then((response) => {
      const results = response.data;
      const events = {
        total: response.headers["xp-wp-total"],
        totalPages: response.headers["xp-wp-totalpages"],
        data: results.map((item) => {
          return {
            id: item.id,
            date: item.date,
            date_gmt: item.date_gmt,
            guid: item.guid.rendered,
            title: item.title.rendered,
            slug: item.slug,
            content: item.content.rendered,
            featured_media: item.featured_media,
            link: item.link,
            tags: item.tags,
            categories: item.categories,
            google_form_url: item.acf.google_form_url,
            form_facade_url: item.acf.form_facade_url,
            event_date: item.acf.event_date,
          };
        }),
      };
      eventList = events;
    });

    return eventList;
  },

  async getHalftimeUSAEvent(slug) {
    let event = {};

    request.defaults.baseURL = this.baseUrl;
    await request.get(`/halftimeusa?slug=${slug}`).then((response) => {
      const results = response.data[0];
      event = {
        id: results.id,
        date: results.date,
        date_gmt: results.date_gmt,
        guid: results.guid.rendered,
        title: results.title.rendered,
        slug: results.slug,
        content: results.content.rendered,
        featured_media: results.featured_media,
        link: results.link,
        tags: results.tags,
        categories: results.categories,
        google_form_url: results.acf.google_form_url,
        form_facade_url: results.acf.form_facade_url,
        event_date: results.acf.event_date,
      };
    });

    return event;
  },

  async getSignUpEvents(page = 1, perPage = 100, order = "desc") {
    let query = `/signups?orderby=signup_date&order=${order}`;
    query += `&page=${page}&perPage=${perPage}`;

    let eventList = {};

    request.defaults.baseURL = this.baseUrl;
    await request.get(query).then((response) => {
      const results = response.data;
      const events = {
        total: response.headers["xp-wp-total"],
        totalPages: response.headers["xp-wp-totalpages"],
        data: results.map((item) => {
          return {
            id: item.id,
            date: item.date,
            date_gmt: item.date_gmt,
            guid: item.guid.rendered,
            title: item.title.rendered,
            slug: item.slug,
            content: item.content.rendered,
            featured_media: item.featured_media,
            link: item.link,
            tags: item.tags,
            categories: item.categories,
            signup_link: item.acf.signup_link,
            signup_date: item.acf.signup_date,
          };
        }),
      };
      eventList = events;
    });

    return eventList;
  },

  async getSignUpEvent(slug) {
    let event = {};

    request.defaults.baseURL = this.baseUrl;
    await request.get(`/signups?slug=${slug}`).then((response) => {
      const results = response.data[0];
      event = {
        id: results.id,
        date: results.date,
        date_gmt: results.date_gmt,
        guid: results.guid.rendered,
        title: results.title.rendered,
        slug: results.slug,
        content: results.content.rendered,
        featured_media: results.featured_media,
        link: results.link,
        tags: results.tags,
        categories: results.categories,
        signup_link: results.acf.signup_link,
        signup_date: results.acf.signup_date,
      };
    });

    return event;
  },
};
