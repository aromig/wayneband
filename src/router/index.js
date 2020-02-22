import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
    meta: {
      title: "",
      metaTags: [
        {
          name: "description",
          content: "description of page contents"
        },
        {
          property: "og.description",
          content: "description of page contents"
        }
      ]
    }
  },
  {
    path: "/*/*/*/:slug",
    name: "post",
    component: () => import("../views/Post.vue"),
    meta: {
      title: "Wayne High School Marching Band and Warriorettes",
      metaTags: [
        {
          name: "description",
          content: "description of page contents"
        },
        {
          property: "og.description",
          content: "description of page contents"
        }
      ]
    }
  },

  {
    path: "/photos",
    name: "photo-gallery",
    component: () => import("../views/PhotoGallery.vue"),
    meta: {
      title: "Photo Galleries",
      metaTags: [
        {
          name: "description",
          content: "description of page contents"
        },
        {
          property: "og.description",
          content: "description of page contents"
        }
      ]
    }
  },
  {
    path: "/photos/:slug",
    name: "gallery",
    component: () => import("../views/Photos.vue"),
    meta: {
      title: "Wayne High School Marching Band and Warriorettes",
      metaTags: [
        {
          name: "description",
          content: "description of page contents"
        },
        {
          property: "og.description",
          content: "description of page contents"
        }
      ]
    }
  },
  {
    path: "/videos",
    name: "videos",
    component: () => import("../views/Videos.vue"),
    meta: {
      title: "Performance Videos",
      metaTags: [
        {
          name: "description",
          content: "description of page contents"
        },
        {
          property: "og.description",
          content: "description of page contents"
        }
      ]
    }
  },
  {
    path: "/events",
    name: "event-list",
    component: () => import("../views/Events.vue"),
    meta: {
      title: "Events & Schedule",
      metaTags: [
        {
          name: "description",
          content: "description of page contents"
        },
        {
          property: "og.description",
          content: "description of page contents"
        }
      ]
    }
  },
  {
    path: "/events/:slug",
    name: "events",
    component: () => import("../views/Event.vue"),
    meta: {
      title: "Wayne High School Marching Band and Warriorettes",
      metaTags: [
        {
          name: "description",
          content: "description of page contents"
        },
        {
          property: "og.description",
          content: "description of page contents"
        }
      ]
    }
  },
  {
    path: "/drumbeat",
    name: "drumbeat",
    component: () => import("../views/Drumbeat.vue"),
    meta: {
      title: "Drumbeat Newsletter",
      metaTags: [
        {
          name: "description",
          content: "description of page contents"
        },
        {
          property: "og.description",
          content: "description of page contents"
        }
      ]
    }
  },
  {
    path: "/:slug",
    name: "page",
    component: () => import("../views/Page.vue"),
    meta: {
      title: "Wayne High School Marching Band and Warriorettes",
      metaTags: [
        {
          name: "description",
          content: "description of page contents"
        },
        {
          property: "og.description",
          content: "description of page contents"
        }
      ]
    }
  }
];

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.metaTags);
  /* const previousNearestWithMeta = from.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.metaTags); */

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(
    document.querySelectorAll("[data-vue-router-controlled]")
  ).map(el => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags
    .map(tagDef => {
      const tag = document.createElement("meta");

      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key]);
      });

      // We use this to track which meta tags we create, so we don't interfere with other ones.
      tag.setAttribute("data-vue-router-controlled", "");

      return tag;
    })
    // Add the meta tags to the document head.
    .forEach(tag => document.head.appendChild(tag));

  next();
});

export default router;
