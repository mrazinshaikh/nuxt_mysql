import jwt from "jsonwebtoken";

export default defineEventHandler((event) => {
  /**
   * Regular expression to match paths that start with "/api/auth" or "/auth".
   * The `**` indicates any characters that follow the initial part of the path.
   *
   * Explanation:
   * - ^              : Start of the string
   * - (\/api\/auth.* : Match "/api/auth" followed by any characters
   * - |              : OR
   * - \/auth.*       : Match "/auth" followed by any characters
   * - $              : End of the string
   *
   * Examples of matched paths:
   * - "/api/auth"
   * - "/api/auth/login"
   * - "/auth"
   * - "/auth/login"
   */
  const regex = new RegExp("^(/api/auth.*|/auth.*)$");
  if (!regex.test(event.node.req.originalUrl)) {
    try {
      const token = parseCookies(event).token;
      if (!token) {
        throw new Error("Token not found");
      }
      const $config = useRuntimeConfig();
      const privateKey = $config.JWT_PRIVATE_KEY;
      const user = jwt.verify(token, privateKey);
      event.context.auth = user;
    } catch (e) {
      return sendRedirect(event, "/auth/logout", 401);
    }
  }
});
