/** Stable public routes; two harmony routes are views inside the microtonal toolbox. */
export const MICRO_TOOL_VIEWS = ['micro', 'spectralharmony', 'microtonalharmony'];
export const MICRO_HARMONY_ROUTES = MICRO_TOOL_VIEWS.slice(1);
export const POST_TOOL_VIEWS = ['posttonal','nonfunctional','polytonality','atonality'];
export const POST_HARMONY_ROUTES = POST_TOOL_VIEWS.slice(1);
export const NESTED_TOOL_ROUTES = [...MICRO_HARMONY_ROUTES, ...POST_HARMONY_ROUTES];
export const toolboxNavigationFeature = feature => MICRO_HARMONY_ROUTES.includes(feature) ? 'micro' : POST_HARMONY_ROUTES.includes(feature) ? 'posttonal' : feature;
