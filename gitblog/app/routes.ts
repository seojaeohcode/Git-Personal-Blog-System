import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("post/:filename", "routes/post.tsx")
] satisfies RouteConfig;
