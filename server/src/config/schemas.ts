const USER_SCHEMA_NAME = "User";
const PROJECT_SCHEMA_NAME = "Project";
const BLOG_SCHEMA_NAME = "Blog";



export {
    USER_SCHEMA_NAME,
    PROJECT_SCHEMA_NAME,
    BLOG_SCHEMA_NAME
}


// Schema Data
const SOCIALS_NAME = ["website", "github", "youtube", "twitter", "linkedin", "reddit"] as const;
const USERS_ROLE = ["user", "admin"] as const;
const BLOG_STATUS = ["published", "draft"] as const;

export {
    SOCIALS_NAME,
    USERS_ROLE,
    BLOG_STATUS
}