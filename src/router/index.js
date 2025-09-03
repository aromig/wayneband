import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
    props: (route) => ({
      ...route.params,
    }),
    meta: {
      title: "",
      metaTags: [
        {
          name: "description",
          content:
            "Wayne Music Club, a non-profit organization with the intent of furthering the best interests of the Wayne High School Bands.",
        },
        {
          property: "og.description",
          content:
            "Wayne Music Club, a non-profit organization with the intent of furthering the best interests of the Wayne High School Bands.",
        },
      ],
    },
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
          content:
            "Photo galleries from performances and events by the Wayne Marching Band and Warriorettes.",
        },
        {
          property: "og.description",
          content:
            "Photo galleries from performances and events by the Wayne Marching Band and Warriorettes.",
        },
      ],
    },
  },
  {
    path: "/photos/:page",
    name: "photo-gallery-page",
    component: () => import("../views/PhotoGallery.vue"),
    meta: {
      title: "Photo Galleries",
      metaTags: [
        {
          name: "description",
          content:
            "Photo galleries from performances and events by the Wayne Marching Band and Warriorettes.",
        },
        {
          property: "og.description",
          content:
            "Photo galleries from performances and events by the Wayne Marching Band and Warriorettes.",
        },
      ],
    },
  },
  {
    path: "/photos/:slug",
    name: "gallery",
    component: () => import("../views/Photos.vue"),
    props: (route) => ({
      ...route.params,
    }),
    meta: {
      title: "Wayne High School Marching Band and Warriorettes",
      metaTags: [
        {
          name: "description",
          content:
            "Photos from performances and events by the Wayne Marching Band and Warriorettes.",
        },
        {
          property: "og.description",
          content:
            "Photos from performances and events by the Wayne Marching Band and Warriorettes.",
        },
      ],
    },
  },
  {
    path: "/photos/:slug/:page",
    name: "gallery-page",
    component: () => import("../views/Photos.vue"),
    props: (route) => ({
      ...route.params,
    }),
    meta: {
      title: "Wayne High School Marching Band and Warriorettes",
      metaTags: [
        {
          name: "description",
          content:
            "Photos from performances and events by the Wayne Marching Band and Warriorettes.",
        },
        {
          property: "og.description",
          content:
            "Photos from performances and events by the Wayne Marching Band and Warriorettes.",
        },
      ],
    },
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
          content:
            "Videos from performances and events by the Wayne Marching Band and Warriorettes.",
        },
        {
          property: "og.description",
          content:
            "Videos from performances and events by the Wayne Marching Band and Warriorettes.",
        },
      ],
    },
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
          content: "Event calendar and schedule for the Wayne Music Club.",
        },
        {
          property: "og.description",
          content: "Event calendar and schedule for the Wayne Music Club.",
        },
      ],
    },
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
          content: "Event calendar and schedule for the Wayne Music Club.",
        },
        {
          property: "og.description",
          content: "Event calendar and schedule for the Wayne Music Club.",
        },
      ],
    },
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
          content:
            "The Drumbeat is the newsletter for the Wayne Music Club, providing students and parents important information on upcoming events.",
        },
        {
          property: "og.description",
          content:
            "The Drumbeat is the newsletter for the Wayne Music Club, providing students and parents important information on upcoming events.",
        },
      ],
    },
  },

  {
    path: "/handbook",
    name: "handbook",
    component: () => import("../views/Handbook.vue"),
    meta: {
      title: "Wayne Bands Handbook",
      metaTags: [
        {
          name: "description",
          content:
            "Wayne Music Club, a non-profit organization with the intent of furthering the best interests of the Wayne High School Bands.",
        },
        {
          property: "og.description",
          content:
            "Wayne Music Club, a non-profit organization with the intent of furthering the best interests of the Wayne High School Bands.",
        },
      ],
    },
  },

  {
    path: "/bluesheet",
    name: "bluesheet",
    component: () => import("../views/BlueSheet.vue"),
    meta: {
      title: "Blue Sheet",
      metaTags: [
        {
          name: "description",
          content:
            "The Warrior Marching Band Weekly is published each week during the marching season to keep parents and students informed of current events within the band.  In order for it to be beneficial, students must be sure to take it home.",
        },
        {
          property: "og.description",
          content:
            "The Warrior Marching Band Weekly is published each week during the marching season to keep parents and students informed of current events within the band.  In order for it to be beneficial, students must be sure to take it home.",
        },
      ],
    },
  },

  {
    path: "/halftime-usa/:slug",
    name: "halftimeusa",
    component: () => import("../views/HalftimeUSA.vue"),
    meta: {
      title: "Halftime USA",
      metaTags: [
        {
          name: "description",
          content:
            "Halftime USA is a marching band festival hosted by the Wayne Music Club for over 50 years.",
        },
        {
          property: "og.description",
          content:
            "Halftime USA is a marching band festival hosted by the Wayne Music Club for over 50 years.",
        },
      ],
    },
  },

  {
    path: "/volunteer",
    name: "volunteer",
    component: () => import("../views/Volunteer.vue"),
    meta: {
      title: "Volunteer",
      metaTags: [
        {
          name: "description",
          content:
            "Volunteer opportunities with the Wayne Music Club including, but not limited to, concession sign ups.",
        },
        {
          property: "og.description",
          content:
            "Volunteer opportunities with the Wayne Music Club including, but not limited to, concession sign ups.",
        },
      ],
    },
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
          content:
            "Wayne Music Club, a non-profit organization with the intent of furthering the best interests of the Wayne High School Bands.",
        },
        {
          property: "og.description",
          content:
            "Wayne Music Club, a non-profit organization with the intent of furthering the best interests of the Wayne High School Bands.",
        },
      ],
    },
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
          content:
            "Wayne Music Club, a non-profit organization with the intent of furthering the best interests of the Wayne High School Bands.",
        },
        {
          property: "og.description",
          content:
            "Wayne Music Club, a non-profit organization with the intent of furthering the best interests of the Wayne High School Bands.",
        },
      ],
    },
  },
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
  },
});

// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);
  /* const previousNearestWithMeta = from.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.metaTags); */

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(
    document.querySelectorAll("[data-vue-router-controlled]")
  ).map((el) => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags
    .map((tagDef) => {
      const tag = document.createElement("meta");

      Object.keys(tagDef).forEach((key) => {
        tag.setAttribute(key, tagDef[key]);
      });

      // We use this to track which meta tags we create, so we don't interfere with other ones.
      tag.setAttribute("data-vue-router-controlled", "");

      return tag;
    })
    // Add the meta tags to the document head.
    .forEach((tag) => document.head.appendChild(tag));

  next();
});

export default router;
